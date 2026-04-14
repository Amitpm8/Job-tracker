import { useState } from "react"
import Dashboard from "./Dashboard"
import JobForm from "./JobForm"
import "./app.css"

export default function App() {
  const [view, setView] = useState("dashboard")
  const [editingJob, setEditingJob] = useState(null)

  const goToForm = (job = null) => {
    setEditingJob(job)
    setView("form")
  }

  const goToDashboard = () => {
    setEditingJob(null)
    setView("dashboard")
  }

  return (
    <div className="app">
      <header className="navbar">
        <span className="brand">JobTracker</span>
        <nav>
          <button onClick={goToDashboard} className={view === "dashboard" ? "active" : ""}>Dashboard</button>
          <button onClick={() => goToForm()} className={view === "form" ? "active" : ""}>Add Job</button>
        </nav>
      </header>
      <main className="main-content">
        {view === "dashboard"
          ? <Dashboard onEdit={goToForm} />
          : <JobForm job={editingJob} onDone={goToDashboard} />}
      </main>
    </div>
  )
}
         
