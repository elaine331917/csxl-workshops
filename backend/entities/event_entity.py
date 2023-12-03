'''All registered events within the application.'''


from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Self
from .entity_base import EntityBase
from backend.models.event import Event
from backend.models.event_details import EventDetails
from .user_event_entity import user_event_table


__authors__ = ["Aubry Dreikosen, Megan Nickel, Elaine Dong, Ian Washabaugh"]
__copyright__ = 'Copyright 2023'
__license__ = 'MIT'


class EventEntity(EntityBase):
    __tablename__ = 'event'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    name: Mapped[str] = mapped_column(
        String(64), nullable=False, default='')
    
    description: Mapped[str] = mapped_column(
        String(64), nullable=False, default='')
    
    date: Mapped[str] = mapped_column(String(64), nullable=False, default='')

    time: Mapped[str] = mapped_column(String(64), nullable=False, default='')

    capacity: Mapped[int] = mapped_column(Integer, nullable=False, default='')

    host_name: Mapped[str] = mapped_column(
        String(64), nullable=False, default='')
    
    host_email: Mapped[str] = mapped_column(
        String(64), nullable=False, default='')

    users: Mapped[list['UserEntity']] = relationship(secondary=user_event_table, back_populates='events')


    @classmethod
    def from_model(cls, model: Event) -> Self:
        return cls(
            id=model.id,
            name=model.name,
            description=model.description,
            date=model.date,
            time = model.time,
            capacity=model.capacity,
            host_name = model.host_name,
            host_email = model.host_email

        )

    def to_model(self) -> Event:
        return Event(
            id=self.id,
            name=self.name,
            description=self.description,
            date=self.date,
            time= self.time,
            capacity=self.capacity,
            host_name = self.host_name,
            host_email = self.host_email
        )
    
    def to_details_model(self) -> EventDetails:
         return EventDetails(
            id=self.id,
            name=self.name,
            description=self.description,
            date=self.date,
            time= self.time,
            capacity=self.capacity,
            host_name = self.host_name,
            host_email = self.host_email,
            users=[user.to_model() for user in self.users])

    def update(self, model: Event) -> None:
            #self.id=model.id
            self.name=model.name
            self.description=model.description
            self.date=model.date
            self.time = model.time,
            self.capacity=model.capacity,
            self.host_name = model.host_name,
            self.host_email = model.host_email
