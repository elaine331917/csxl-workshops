"""Sample events."""

from backend.models.event import Event
from . import roles

__authors__ = ["Ian Washabaugh, Elaine Dong, Aubry Dreikosen, Megan Nickel"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

event1 = Event(id=1, name="Programming", description="Learn how to program", date="02/24/2022", time = '2:15pm',capacity=50, host_name = "Ian", host_email="ian@unc.edu")

event2 = Event(id=2, name="Natural Language Processing", description="Learn how to make ChatGPT", date="02/24/2022", time= "8:00am",capacity=15, host_name="Megan", host_email="megan@unxc.edu")

event3 = Event(id=3, name="Test", description="", date="02/24/2022", time = "12:00pm", capacity=20, host_name = "Aubry", host_email="aubry@unc.edu")

event4 = Event(id=4, name="Data", description="", date="02/24/2022", time = "4:00pm", capacity=50, host_name="Elaine", host_email="elaine@unc.edu")

models = [
    event1,
    event2,
    event3,
    event4
]
