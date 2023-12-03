"""User model serves as the data object for representing registered users across application layers."""

from pydantic import BaseModel

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class User(BaseModel):
    id: int | None = None
    pid: int
    onyen: str = ""
    first_name: str = ""
    last_name: str = ""
    email: str = ""
    pronouns: str = ""
    permissions: list['Permission'] = []
    # events: list['Event'] = []


class NewUser(BaseModel):
    pid: int
    onyen: str
    first_name: str = ''
    last_name: str = ''
    email: str = ''
    pronouns: str = ''
    permissions: list['Permission'] = []
    # events: list['Event'] = []


class ProfileForm(BaseModel):
    first_name: str
    last_name: str
    email: str
    pronouns: str
    # line below breaks docs
   # events: list['Event']


# Python... :sob:... necessary due to circularity (TODO: refactor to remove circularity)
from .permission import Permission
# from .event import Event
# from .event import EventDetails
User.update_forward_refs()
NewUser.update_forward_refs()
# UserDetails.update_forward_refs()
