import { useEffect, useState } from "react"
import axios from "axios"

export default function Dashboard({ onEdit }) {
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = async () => {
    try {
      setLoading(true)
      setError(null)
      const jobsRes = await axios.get("/api/jobs")
      const statsRes = await axios.get("/api/stats")
      setJobs(Array.isArray(jobsRes.data) ? jobsRes.data : [])
      setStats(statsRes.data)
    } catch (err) {
      setError("Failed to load. Is the API running?")
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return
    try {
      await axios.delete(`/api/jobs/${id}`)
      setJobs(prev => prev.filter(j => j.id !== id))
    } catch {
      alert("Delete failed.")
    }
  }

  const statusColors = {
    applied: "#3b82f6",
    interview: "#f59e0b",
    offer: "#10b981",
    rejected: "#ef4444"
  }

  return (
    <div className="dashboard">
      <h2>Overview</h2>
      <div className="stats-grid">
        <div className="stat-card"><span>{stats.total ?? 0}</span><label>Total</label></div>
        <div className="stat-card"><span>{stats.applied ?? 0}</span><label>Applied</label></div>
        <div className="stat-card"><span>{stats.interview ?? 0}</span><label>Interview</label></div>
        <div className="stat-card"><span>{stats.offer ?? 0}</span><label>Offers</label></div>
      </div>

      <h2 style={{marginTop: "2rem"}}>Applications ({jobs.length})</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}
      {!loading && !error && jobs.length === 0 && <p>No applications yet. Add your first job!</p>}

      {!loading && !error && jobs.length > 0 && (
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Company</th><th>Role</th><th>Status</th>
              <th>Date</th><th>Notes</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.link ? <a href={job.link} target="_blank" rel="noreferrer">{job.company}</a> : job.company}</td>
                <td>{job.role}</td>
                <td><span style={{background: statusColors[job.status], color: "#fff", padding: "2px 10px", borderRadius: "12px", fontSize: "12px"}}>{job.status}</span></td>
                <td>{job.applied_date}</td>
                <td>{job.notes || "—"}</td>
                <td>
                  <button onClick={() => onEdit(job)}>Edit</button>
                  <button onClick={() => handleDelete(job.id)} style={{marginLeft: "8px", color: "red"}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
