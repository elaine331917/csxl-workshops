from . import User, Event

class EventDetails(Event):
    users: list['User'] = []