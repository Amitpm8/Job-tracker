import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ onEdit }) {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/jobs");
      setJobs(res.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const counts = {
    applied: jobs.filter((job) => job.status === "applied").length,
    interview: jobs.filter((job) => job.status === "interview").length,
    offer: jobs.filter((job) => job.status === "offer").length,
    rejected: jobs.filter((job) => job.status === "rejected").length,
  };

  return (
    <div className="dashboard-wrap">
      <section className="stats-grid">
        <div className="stat-card applied">
          <p>Total Applied</p>
          <h3>{counts.applied}</h3>
        </div>

        <div className="stat-card interview">
          <p>Interviews</p>
          <h3>{counts.interview}</h3>
        </div>

        <div className="stat-card offer">
          <p>Offers</p>
          <h3>{counts.offer}</h3>
        </div>

        <div className="stat-card rejected">
          <p>Rejected</p>
          <h3>{counts.rejected}</h3>
        </div>
      </section>

      <section className="table-card">
        <div className="table-header">
          <div>
            <h3>Applications</h3>
            <p>{jobs.length} total records</p>
          </div>
        </div>

        <div className="table-scroll">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No job applications found.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.company}</td>
                    <td>{job.role}</td>
                    <td>
                      <span className={`status-pill ${job.status}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      {job.date
                        ? new Date(job.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="text-right">
                      <div className="action-group">
                        <button
                          className="table-btn edit"
                          onClick={() => onEdit(job)}
                        >
                          Edit
                        </button>

                        <button
                          className="table-btn delete"
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
