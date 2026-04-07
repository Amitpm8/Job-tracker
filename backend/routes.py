from flask import Blueprint, jsonify, request
from models import db, Job, JobStatus
from datetime import date

jobs_bp = Blueprint("jobs", __name__, url_prefix="/api")

@jobs_bp.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.order_by(Job.created_at.desc()).all()
    return jsonify([j.to_dict() for j in jobs])

@jobs_bp.route("/jobs", methods=["POST"])
def create_job():
    data = request.get_json()
    job = Job(
        company=data["company"],
        role=data["role"],
        status=JobStatus[data.get("status", "applied")],
        applied_date=date.fromisoformat(data["applied_date"]),
        link=data.get("link"),
        notes=data.get("notes")
    )
    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict()), 201

@jobs_bp.route("/jobs/<int:job_id>", methods=["PUT"])
def update_job(job_id):
    job = Job.query.get_or_404(job_id)
    data = request.get_json()
    job.company      = data.get("company", job.company)
    job.role         = data.get("role", job.role)
    job.status       = JobStatus[data.get("status", job.status.name)]
    job.link         = data.get("link", job.link)
    job.notes        = data.get("notes", job.notes)
    db.session.commit()
    return jsonify(job.to_dict())

@jobs_bp.route("/jobs/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "deleted"}), 200

@jobs_bp.route("/stats", methods=["GET"])
def get_stats():
    total     = Job.query.count()
    applied   = Job.query.filter_by(status=JobStatus.applied).count()
    interview = Job.query.filter_by(status=JobStatus.interview).count()
    offer     = Job.query.filter_by(status=JobStatus.offer).count()
    rejected  = Job.query.filter_by(status=JobStatus.rejected).count()
    return jsonify({
        "total": total,
        "applied": applied,
        "interview": interview,
        "offer": offer,
        "rejected": rejected
    })
