from . import User, Event, NewUser

class UserDetails(User, NewUser):
    events: list['Event'] = []