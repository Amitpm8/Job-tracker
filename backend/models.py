from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import enum

db = SQLAlchemy()

class JobStatus(enum.Enum):
    applied = "applied"
    interview = "interview"
    offer = "offer"
    rejected = "rejected"

class Job(db.Model):
    __tablename__ = "jobs"

    id            = db.Column(db.Integer, primary_key=True)
    company       = db.Column(db.String(100), nullable=False)
    role          = db.Column(db.String(100), nullable=False)
    status        = db.Column(db.Enum(JobStatus), default=JobStatus.applied, nullable=False)
    applied_date  = db.Column(db.Date, nullable=False)
    link          = db.Column(db.String(300))
    notes         = db.Column(db.Text)
    created_at    = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id":           self.id,
            "company":      self.company,
            "role":         self.role,
            "status":       self.status.value,
            "applied_date": str(self.applied_date),
            "link":         self.link,
            "notes":        self.notes,
            "created_at":   str(self.created_at)
        }
