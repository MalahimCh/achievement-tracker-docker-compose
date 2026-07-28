from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import Achievement
from .schemas import AchievementCreate, AchievementResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Achievement Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "API Running"}


@app.post("/achievements", response_model=AchievementResponse)
def create_achievement(
    item: AchievementCreate,
    db: Session = Depends(get_db)
):
    achievement = Achievement(title=item.title)

    db.add(achievement)
    db.commit()
    db.refresh(achievement)

    return achievement


@app.get("/achievements", response_model=list[AchievementResponse])
def get_achievements(
    db: Session = Depends(get_db)
):
    return db.query(Achievement).order_by(
        Achievement.created_at.desc()
    ).all()
