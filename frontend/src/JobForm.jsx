import { useEffect, useState } from "react";
import axios from "axios";

export default function JobForm({ job, onDone }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "applied",
    date: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || "",
        role: job.role || "",
        status: job.status || "applied",
        date: job.date ? job.date.slice(0, 10) : "",
      });
    } else {
      setFormData({
        company: "",
        role: "",
        status: "applied",
        date: "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (job?._id) {
        await axios.put(`/api/jobs/${job._id}`, formData);
      } else {
        await axios.post("/api/jobs", formData);
      }

      onDone();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <div className="form-shell">
      <div className="form-card">
        <div className="form-head">
          <h3>{job ? "Edit Application" : "Add New Application"}</h3>
          <p>
            {job
              ? "Update your existing job application details."
              : "Create a new job application entry."}
          </p>
        </div>

        <form className="job-form" onSubmit={handleSubmit}>
          <div className="input-grid">
            <div className="field-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Google, Amazon, Microsoft..."
                required
              />
            </div>

            <div className="field-group">
              <label>Job Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Frontend Developer"
                required
              />
            </div>

            <div className="field-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="field-group">
              <label>Applied Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={onDone}
            >
              Cancel
            </button>

            <button type="submit" className="primary-btn">
              {job ? "Update Job" : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
