"""Event Service.

The Event service provides access to the database, specifically the Event and User models through the functions below.
"""

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..models import Event
from backend.models.event_details import EventDetails
from ..database import db_session
from ..entities import EventEntity
from ..entities import UserEntity
from ..models import User
from .permission import PermissionService

class EventService:

    _session: Session

    def __init__(self, session: Session = Depends(db_session)):
        '''Initilize the Event Service'''
        self._session = session
    
    def all(self) -> list[Event]:
        """Get a list of all events.
        Args:
            none
        Returns:
            List[Event]: List of all events.
        """
        query = select(EventEntity)
        entities = self._session.scalars(query).all()
        return [entity.to_model() for entity in entities]

    def get(self, id: int) -> Event:
        """Get an Event by ID.
        Args:
            id: The id of the event.
        Returns:
            Event: The Event associated with the id.
        Raises:
            Exception: If the event is not found.
        """
        query = select(EventEntity).where(EventEntity.id == id)
        event_entity: EventEntity = self._session.scalar(query)
        if event_entity is None:
            raise Exception("Event not found")
        else:
            #getting the event
            model:Event = event_entity.to_model()
            return model
    
    def create(self, subject:User, event: Event, permission:PermissionService) -> Event:
        """Create an Event.
        Args:
            subject: The User performing this action.
            event: The Event to be created.
            permission: Permission Service that allows enforcment of admin only access.
        Returns:
            Event: The Event created.
        """
        permission.enforce(subject, 'event.create', 'event/')
        entity = EventEntity.from_model(event)
        #del entity.id
        self._session.add(entity)
        self._session.commit()
        return entity.to_model()

    def update(self, subject:User, event:Event, permission:PermissionService) -> Event:
        """Update an Event.
        Args:
            subject: The User performing this action.
            event: the new Event information
            permission: Permission Service that allows enforcment of admin only access.
        Returns:
            Event that was updated with new information.
        Raises:
            Exception if Event does not exist in database.
        """
        permission.enforce(subject, 'event.update', 'event/')
        entity: EventEntity = self._session.get(EventEntity, event.id)
        if entity: 
            entity.update(event)
            self._session.commit()
            return entity.to_model()
        else:
            raise Exception("Event must be created before being updated.")

    def delete(self, subject:User, id:int, permission:PermissionService) -> Event:
        """Delete an Event.
        Args:
            subject: The User performing this action.
            id: the id of the Event to be deleted.
            permission: Permission Service that allows enforcment of admin only access.
        Returns:
            Event that was deleted.
        Raises:
            Exception if Event does not exist in database.
        """
        permission.enforce(subject, 'event.delete', 'event/')
        event = self.get(id)
        if event:
            entity = self._session.get(EventEntity,id)
            self._session.delete(entity)
            self._session.commit()
            return event
        else:
            raise Exception("Event does not exist.")

    def getEventDetails(self, id: int) -> EventDetails | None:
        """Get EventDetails.
        Args:
            id: the event id for the event we want details for
        Returns:
            EventDetails | None: the details for the given event or none if the Event does not exist.
        Raises:
            Exception if Event does not exist in database.
        """
        query = select(EventEntity).where(EventEntity.id == id)
        event_entity: EventEntity = self._session.scalar(query)
        if event_entity is None:
            return None
        else:
            # getting the event
            model:EventDetails = event_entity.to_details_model()
            return model
        
    def register(self, eventID: int, pid: int) -> bool:
        """Register for an Event.
        Args:
            eventID: The id of the event to be registered for.
            pid: the PID of the User that wants to register
        Returns:
            True: If the registration is successful.
            False: If the registration was unseccessfil
        """
        # get user entity 
        query = select(UserEntity).where(UserEntity.pid == pid)
        user_entity: UserEntity = self._session.scalar(query)
        if user_entity is None:
            return False
        
        # get event entity
        event_entity = self._session.get(EventEntity, eventID)
        if not event_entity:
            print("no event ent: " + str(eventID))
            return False
        
        #check if we are at capacity
        if event_entity.capacity <= len(event_entity.users):
                return False
        
        event_entity.users.append(user_entity)
    
        self._session.commit()
        return True
    
    def deregister(self, eventID: int, pid: int) -> bool:
        """Deregister from an Event.
        Args:
            eventID: The id of the event to be deregistered from.
            pid: the PID of the User that wants to deregister
        Returns:
            True: If the deregistration is successful.
            False: If the deregistration was unseccessfil
        """
        # get user entity 
        query = select(UserEntity).where(UserEntity.pid == pid)
        user_entity: UserEntity = self._session.scalar(query)
        if user_entity is None:
            return False
        
        # get event entity
        event_entity = self._session.get(EventEntity, eventID)
        if event_entity is None:
            return False
        
        if user_entity not in event_entity.users:
            return False

        event_entity.users.remove(user_entity)
    
        self._session.commit()
        return True

    
    # get user's registrations
    def get_registrations(self, pid: int) -> list[Event]:
        """Get a user's reistrations.
        Args:
            pid: the PID of the User that wants to deregister
        Returns:
            List of events
        """
        # get user entity 
        query = select(UserEntity).where(UserEntity.pid == pid)
        user_entity: UserEntity = self._session.scalar(query)
        if user_entity is None:
            raise Exception("User Not Found: " + str(pid))

        # get events where the user is registered
        query = select(EventEntity).join(EventEntity.users).where(UserEntity.pid == pid)
        event_entities = self._session.scalars(query).all()
        return [entity.to_model() for entity in event_entities]
    

    # get seats remaining
    def get_openings(self, event_id: int) -> int:
        """Get the number of seats remaining.
        Args:
            event_id: the id of the Event
        Returns:
            The number of seats remaining in the event
        """
        eventDetails = self.getEventDetails(event_id)
        openings = eventDetails.capacity - len(eventDetails.users)
        if openings < 0:
            openings = 0
        return openings

    # get seats filled
    def get_filled(self, event_id: int) -> int:
        """Get the number of seats filled.
        Args:
            event_id: the id of the Event
        Returns:
            The number of seats already filled in the event
        """
        eventDetails = self.getEventDetails(event_id)
        return len(eventDetails.users)
