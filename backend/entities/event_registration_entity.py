# '''All registered events within the application.'''


# from sqlalchemy import Date, ForeignKey, Integer, String
# from sqlalchemy.orm import Mapped, mapped_column, relationship
# from typing import Self
# #from backend.entities.event_entity import EventEntity
# from .entity_base import EntityBase
# #from backend.models.event import Event
# from backend.models.event import EventRegistration


# __authors__ = ["Aubry Dreikosen, Megan Nickel, Elaine Dong, Ian Washabaugh"]
# __copyright__ = 'Copyright 2023'
# __license__ = 'MIT'


# class EventRegistrationEntity(EntityBase):
#     __tablename__ = 'registration'

#     id: Mapped[int] = mapped_column(Integer, primary_key=True)
#     event_id: Mapped[int] = relationship(Integer, ForeignKey('event.id'))
#     user_id: Mapped[int] = relationship(Integer, ForeignKey('user.id'))
#     #event: Mapped["EventEntity"] = relationship(back_populates="event_registrations")

#     @classmethod
#     def from_model(cls, model: EventRegistration) -> Self:
#         return cls(
#             id=model.id,
#             event_id=model.event_id,
#             user_id=model.user_id
#         )

#     def to_model(self) -> EventRegistration:
#         return EventRegistration(
#             id=self.id,
#             event_id=self.event_id,
#             user_id=self.user_id
#         )

#     def update(self, model: EventRegistration) -> None:
#             self.id=model.id,
#             self.event_id=model.event_id,
#             self.user_id=model.user_id