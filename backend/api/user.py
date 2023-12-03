from fastapi import APIRouter, Depends, HTTPException
from ..services import UserService
from ..models import User
from ..models.user_details import UserDetails
from .authentication import registered_user

api = APIRouter(prefix="/api/user")


@api.get("", response_model=list[User], tags=['User'])
def search(q: str, subject: User = Depends(registered_user), user_svc: UserService = Depends()):
    return user_svc.search(subject, q)

@api.get("/details/{pid}", tags=['User'])
def get_user_details(pid: int, user_service: UserService = Depends())-> UserDetails:
    try:
        return user_service.getUserDetails(pid)
    except Exception as e:
       raise HTTPException(status_code=404, detail= str(e))
