import { useState } from "react"
import axios from "axios"

export default function JobForm({ job, onDone }) {
  const [form, setForm] = useState({
    company: job?.company || "",
    role: job?.role || "",
    status: job?.status || "applied",
    applied_date: job?.applied_date || "",
    link: job?.link || "",
    notes: job?.notes || ""
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (job) {
        await axios.put(`/api/jobs/${job.id}`, form)
      } else {
        await axios.post("/api/jobs", form)
      }
      onDone()
    } catch (err) {
      alert("Failed to save. Check if API is running.")
    }
  }

  return (
    <div className="form-wrap">
      <h2>{job ? "Edit Application" : "Add Application"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Company</label>
        <input name="company" value={form.company} onChange={handleChange} required />

        <label>Role</label>
        <input name="role" value={form.role} onChange={handleChange} required />

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <label>Applied Date</label>
        <input type="date" name="applied_date" value={form.applied_date} onChange={handleChange} required />

        <label>Job Link</label>
        <input name="link" value={form.link} onChange={handleChange} />

        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} />

        <div style={{marginTop: "1rem"}}>
          <button type="submit">{job ? "Update" : "Add Job"}</button>
          <button type="button" onClick={onDone} style={{marginLeft: "12px"}}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
