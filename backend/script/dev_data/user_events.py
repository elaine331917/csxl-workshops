"""Sample event registrations."""

from . import users
from . import events

__authors__ = ["Ian Washabaugh, Elaine Dong, Aubry Dreikosen, Megan Nickel"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

pairs = [
    (users.root, events.event1),
    (users.sol_student, events.event2),
    (users.sol_student, events.event3),
    (users.arden_ambassador, events.event4),
    (users.arden_ambassador, events.event1),
]