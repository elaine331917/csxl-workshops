"""Admin Event API.

This API is used to create, update, and delete Events.
"""
from fastapi import APIRouter, Depends, HTTPException
from backend.services.event import EventService
from backend.services.permission import PermissionService, UserPermissionError
from ...models import User, Event
from ..authentication import registered_user


__authors__ = ["Aubry Dreikosen, Ian Washabaugh, Elaine Dong, Megan Nickel"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

openapi_tags = {"name": "Event Admin API", "description": ""}

api = APIRouter(prefix="/api/admin/events")


"""Create an event

only an admin may perform this action

Args:
    Event -> event to be created
    subject -> user that is creating the event
    event_service

Returns:
    Event -> event that was created
"""
@api.post("", tags=['Event Edit'])
def new_event(
    event: Event,
    subject: User = Depends(registered_user),
    event_service: EventService = Depends(),
    permission: PermissionService = Depends()
    )-> Event:
    try:
        return event_service.create(subject,event, permission)
    except Exception as e:
       raise HTTPException(status_code=422, detail= str(e))

"""Update an event
only an admin can perform this action
Args:
    Event -> new event information
    subject -> user that is updating the event
    event_service
Returns:
    Event -> event that was updated
"""
@api.put("", tags=['Event Edit'])
def update_event(
    event: Event,
    subject: User = Depends(registered_user),
    event_service: EventService = Depends(),
    permission: PermissionService = Depends())-> Event:
    try:
        return event_service.update(subject,event, permission)
    except Exception as e:
       raise HTTPException(status_code=404, detail= str(e))

"""Delete an event
only an admin can perform this action
Args:
    Event id -> id of event to be deleted
    subject -> user that is deleting the event
    event_service
Returns:
    Event -> event that was updated
"""
@api.delete("/{id}", tags=['Event Edit'])
def delete_event(
    id: int,
    subject: User = Depends(registered_user),
    event_service: EventService = Depends(),
    permission: PermissionService = Depends())-> Event:
    try:
        return event_service.delete(subject,id, permission)
    except Exception as e:
       raise HTTPException(status_code=404, detail= str(e))
