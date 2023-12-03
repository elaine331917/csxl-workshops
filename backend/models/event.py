"""Event is the data object for workshops that students may attend."""

from pydantic import BaseModel

__authors__ = ["Aubry Dreikosen, Megan Nickel, Elaine Dong, Ian Washabaugh"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class Event(BaseModel):
    id: int | None = None
    name: str = ""
    description: str = ""
    date: str = ""
    time: str = ""
    capacity: int = 0
    host_name:str = ""
    host_email:str = ""



Event.update_forward_refs()
