"""Event API.
This API is used to access all Events in the database and register/dergister users.
"""
from fastapi import APIRouter, Depends, HTTPException
from backend.services.event import EventService
from backend.models.event import Event
from backend.models.event_details import EventDetails
from backend.models.user import User

api = APIRouter(prefix="/api/event")

"""Get a list of all events.

Args:
    None

Returns:
    List of all events.
"""
@api.get("", tags=['event'])
def get_events(event_service: EventService = Depends())-> list[Event]:
    return event_service.all()

"""Get one event based off of the event id.

Args:
   int -> id of the event

Returns:
    Event 
"""
@api.get("/{id}", tags=['event'])
def get_event(id: int, event_service: EventService = Depends())-> Event:
    try:
        return event_service.get(id)
    except Exception as e:
        raise HTTPException(status_code=404, detail = str(e))

    
"""Get event details 

Args:
    Event -> event in question

Returns:
    EventDetials -> the details of that event
"""
@api.get("/details/{id}", tags=['event'])
def get_event_details(id: int, event_service: EventService = Depends())-> EventDetails:
    try:
        return event_service.getEventDetails(id)
    except Exception as e:
       raise HTTPException(status_code=422, detail= str(e))

"""Register for an event

Args:
    Event -> event to be registered for
    User -> user being registered

Returns:
    Bool -> whether or not the registration occurred
"""

@api.post("register/{id}/{pid}", tags=['event'])
def register_for_event(id: int, pid: int, event_service: EventService = Depends()) -> bool:
    try:
        return event_service.register(id, pid)
    except Exception as e:
       raise HTTPException(status_code=422, detail= str(e))
    
"""Deregister for an event

Args:
    Event -> event to be deregistered for
    User -> user being deregistered

Returns:
    Bool -> whether or not the deregistration occurred
"""

@api.delete("deregister/{id}/{pid}", tags=['event'])
def deregister_for_event(id: int, pid: int, event_service: EventService = Depends()) -> bool:
    try:
        return event_service.deregister(id, pid)
    except Exception as e:
       raise HTTPException(status_code=422, detail= str(e))
    
"""Get event details 

Args:
    Event -> event in question

Returns:
    EventDetails -> the details of that event
"""
@api.get("/details/{id}", tags=['event'])
def get_event_details(id: int, event_service: EventService = Depends())-> EventDetails:
    try:
        return event_service.getEventDetails(id)
    except Exception as e:
       raise HTTPException(status_code=404, detail= str(e))

"""Register for an event

Args:
    Event -> event to be registered for
    User -> user being registered

Returns:
    Bool -> whether or not the registration occurred
"""

@api.post("/register/{event_id}/{pid}", tags=['event'])
def register_for_event(event_id: int, pid: int, event_service: EventService = Depends()) -> bool:
    try:
        return event_service.register(event_id, pid)
    except Exception as e:
       raise HTTPException(status_code=404, detail= str(e))
    
"""Deregister for an event

Args:
    Event -> event to be deregistered from
    User -> user being deregistered

Returns:
    Bool -> whether or not the deregistration occurred
"""

@api.delete("/deregister/{event_id}/{pid}", tags=['event'])
def deregister_for_event(event_id: int, pid: int, event_service: EventService = Depends()) -> bool:
    try:
        return event_service.deregister(event_id, pid)
    except Exception as e:
       raise HTTPException(status_code=404, detail= str(e))
    

"""Get events that user is registered for

Args:
    User -> user in question

Returns:
    List -> list of all events that user is registered for
"""

@api.get("/registrations/{pid}", tags=['event'])
def get_registrations(pid: int, event_service: EventService = Depends()) -> list[Event]:
    try:
        return event_service.get_registrations(pid)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
"""Get number of seats left for event
Args:
    Event ID -> event in question

Returns:
    Integer -> number of seats left
"""

@api.get("/openings/{id}", tags=['event'])
def get_openings(event_id: int, event_service: EventService = Depends()) -> int:
    try:
        return event_service.get_openings(event_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


"""Get number of seats filled at event
Args:
    Event ID -> event in question

Returns:
    Integer -> number of seats filled
"""

@api.get("/filled/{id}", tags=['event'])
def get_filled(event_id: int, event_service: EventService = Depends()) -> int:
    try:
        return event_service.get_filled(event_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
