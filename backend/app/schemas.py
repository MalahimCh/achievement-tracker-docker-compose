from pydantic import BaseModel
from datetime import datetime


class AchievementCreate(BaseModel):
    title: str


class AchievementResponse(BaseModel):
    id: int
    title: str
    created_at: datetime

    class Config:
        from_attributes = True
