""" EventService test file.

This file provides unit tests for the EventService class.
"""
import pytest
from sqlalchemy.orm import Session
from backend.entities.permission_entity import PermissionEntity
from backend.entities.role_entity import RoleEntity
from backend.models import User
from backend.models.event_details import EventDetails
from backend.models.event import Event
from backend.services.permission import PermissionService, UserPermissionError
from ...entities import UserEntity, EventEntity
from backend.services.event import EventService
from ...models import Role

# Mock Users for Testing
user1 = User(id=0, pid=111111111, onyen='boba', email='boba@unc.edu')
user2= User(id = 1, pid =222222222, onyen='churro', email='churro@unc.edu')
user3 = User(id=2, pid=333333333, onyen='charlie', email = 'charlie@unc.edu')
user4 = User(id=3, pid=444444444, onyen='gracie', email='gracie@unc.edu')

user_root = User(id=4, pid=999999999, onyen='root', email='root@unc.edu')
root_role = Role(id=1, name='root')

#Mock Events for Testing
event1 = Event(name='intro to code', description='an introductory course', date='August 30', time = "12:00pm" ,capacity=150, users=[], host_name="aubry", host_email="aubry@unc.edu")

event2 = Event(name='advanced code', description='an advanced course', date='October 30', time= "4:00pm",capacity=15, users=[], host_name="Ian", host_email="ian@unc.edu")

event3 = Event( name='super advanced code', description='a really advanced course', date='October 31', time = "3:00pm",capacity=1, users=[], host_name = "megan", host_email="megan@unc.edu")

@pytest.fixture(autouse=True)
def setup_for_tests(test_session: Session):
    # Set up a root user for special event functions that need root access
    root_user_entity = UserEntity.from_model(user_root)
    test_session.add(root_user_entity)
    root_role_entity = RoleEntity.from_model(root_role)
    root_role_entity.users.append(root_user_entity)
    test_session.add(root_role_entity)
    root_permission_entity = PermissionEntity(
        action='*', resource='*', role=root_role_entity)
    test_session.add(root_permission_entity)

    #add all users and events to session
    user1_entity = UserEntity.from_model(user1)
    user2_entity = UserEntity.from_model(user2)
    user3_entity = UserEntity.from_model(user3)
    user4_entity = UserEntity.from_model(user4)
    test_session.add(user1_entity)
    test_session.add(user2_entity)
    test_session.add(user3_entity)
    test_session.add(user4_entity)
    event1_entity = EventEntity.from_model(event1)
    event2_entity = EventEntity.from_model(event2)
    event3_entity = EventEntity.from_model(event3)
    test_session.add(event1_entity)
    test_session.add(event2_entity)
    test_session.add(event3_entity)
    test_session.commit()

@pytest.fixture()
def eventService(test_session: Session):
    return EventService(test_session)
@pytest.fixture()
def permission(test_session: Session):
    return PermissionService(test_session)

def test_get_one_event(eventService: EventService):
   assert(eventService.get(1).capacity == 150)
   assert(eventService.get(1).name.__eq__('intro to code'))

def test_get_nonexistent_event(eventService: EventService):
    with pytest.raises(Exception):  
        eventService.get(100)

def test_get_all_events(eventService: EventService):
    event_list = eventService.all()
    assert(len(event_list) == 3)
    assert(event_list[0].name.__eq__('intro to code'))

def test_event_admin_permission(permission: PermissionService):
    assert permission.check(user_root, 'event.create', 'event')
    assert permission.check(user_root, 'event.delete', 'event')
    assert permission.check(user_root, 'event.update', 'event')

def test_create_one_event(eventService: EventService, permission:PermissionService):
    event4 = Event(id=4,name='intermediate code', description='an intermediate course', date='Sep 30', time= "2:30pm",capacity=25, host_name="elaine", host_email="elaine@unc.edu")
    eventService.create(user_root, event4,permission)
    assert(eventService.get(4).__eq__(event4))

def test_delete_event_exist(eventService: EventService, permission:PermissionService):
    assert(len(eventService.all()) == 3)
    eventService.delete(user_root, 2, permission)
    assert(len(eventService.all())== 2)
    with pytest.raises(Exception):
        eventService.get(2)

def test_delete_event_nonexist(eventService: EventService, permission: PermissionService):
    with pytest.raises(Exception):
        eventService.delete(user_root,34,permission)


def test_update_event_exist(eventService: EventService, permission:PermissionService):
    event3_new = Event(id=3, name='super code', description='a new awesome description', date='October 32', time = "4:00pm", capacity = 5, host_name="aubry", host_email="aubry@unc.edu")
    eventService.update(user_root, event3_new, permission)
    updated_event = eventService.get(3)
    assert(updated_event.name.__eq__(event3_new.name))
    assert(updated_event.description.__eq__(event3_new.description))
    assert(updated_event.date.__eq__(event3_new.date))
    assert(updated_event.capacity.__eq__(event3_new.capacity))

def test_update_event_nonexist(eventService: EventService, permission: PermissionService):
    nonexistent_event = Event(id = 34, name = 'a', description='b', date='c', time="e",capacity = 4, host_name="f", host_email="g")
    with pytest.raises(Exception):
        eventService.update(user_root,nonexistent_event,permission)
    
def test_that_user_gets_error_if_no_permission(eventService: EventService, permission:PermissionService):
    event4 = Event(id=4,name='intermediate code', description='an intermediate course', date='Sep 30', time= "2:30pm",capacity=25, host_name="elaine", host_email="elaine@unc.edu")
    event3_new = Event(id=3, name='super code', description='a new awesome description', date='October 32', time = "4:00pm", capacity = 5, host_name="aubry", host_email="aubry@unc.edu")
    with pytest.raises(UserPermissionError):
        eventService.create(user1, event4, permission)
    with pytest.raises(UserPermissionError):
        eventService.update(user1, event3_new, permission)
    with pytest.raises(UserPermissionError):
        eventService.delete(user1, 3 , permission)



def test_register_for_event_success(eventService: EventService):
    eventService.register(1, 111111111)
    eventDetails0 = eventService.getEventDetails(1)
    assert(len(eventDetails0.users) == 1 )
    assert(eventDetails0.users[0].pid == 111111111)

def test_register_for_event_fail_no_event(eventService: EventService):
    assert(eventService.register(90, 111111111) == False)

def test_register_for_event_fail_no_person(eventService: EventService):
    assert(eventService.register(1, 555555555) == False)

def test_register_for_event_fail_at_capacity(eventService: EventService):
    eventService.register(3, 111111111)
    eventDetails2 = eventService.getEventDetails(3)
    assert(len(eventDetails2.users) == eventDetails2.capacity)
    assert(eventService.register(3, 222222222) == False)

def test_deregister_for_event_success(eventService: EventService):
    eventService.register(1, 111111111)
    eventDetails0 = eventService.getEventDetails(1)
    assert(len(eventDetails0.users) == 1 )
    eventService.deregister(1, 111111111)
    eventDetails0 = eventService.getEventDetails(1)
    assert(len(eventDetails0.users) == 0)

def test_deregister_for_event_fail_no_event(eventService: EventService):
    assert(eventService.deregister(90, 111111111) == False)

def test_deregister_for_event_fail_no_person(eventService: EventService):
    assert(eventService.deregister(1, 111111111) == False)

def test_deregister_for_event_fail_no_person_exists(eventService: EventService):
    assert(eventService.deregister(1, 555555555) == False)

def test_deregister_for_event_fail_no_person_registered(eventService: EventService):
    eventService.register(1, 111111111)
    eventDetails0 = eventService.getEventDetails(1)
    assert(len(eventDetails0.users) == 1 )
    assert(eventService.deregister(1, 222222222) == False)

def test_get_registrations_none(eventService: EventService):
    registrations = eventService.get_registrations(111111111)
    assert(len(registrations) == 0 )

def test_get_registrations_registered(eventService: EventService):
    eventService.register(1, 111111111)
    eventService.register(2, 111111111)
    registrations = eventService.get_registrations(111111111)
    assert(len(registrations) == 2 )

def test_get_registrations_deregistered(eventService: EventService):
    eventService.register(1, 111111111)
    eventService.register(2, 111111111)
    eventService.deregister(1, 111111111)
    registrations = eventService.get_registrations(111111111)
    assert(len(registrations) == 1 )

def test_get_seats_left_no_registered(eventService: EventService):
    assert eventService.get_openings(1) == 150

def test_get_seats_left_one_registered(eventService: EventService):
    eventService.register(1, 111111111)
    assert eventService.get_openings(1) == 149

def test_get_registered_number_none(eventService: EventService):
    assert eventService.get_filled(1) == 0

def test_get_registered_number_one(eventService: EventService):
    eventService.register(1, 111111111)
    assert eventService.get_filled(1) == 1
