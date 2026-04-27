import { useState } from "react";
import Dashboard from "./Dashboard";
import JobForm from "./JobForm";
import "./app.css";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [editingJob, setEditingJob] = useState(null);

  const handleEdit = (job) => {
    setEditingJob(job);
    setView("form");
  };

  const handleDone = () => {
    setEditingJob(null);
    setView("dashboard");
  };

  const handleAddNew = () => {
    setEditingJob(null);
    setView("form");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">JT</div>
          <div>
            <h1>Job Tracker</h1>
            <p>Career Pipeline</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-btn ${view === "dashboard" ? "active" : ""}`}
            onClick={() => setView("dashboard")}
          >
            <span>📊</span>
            Dashboard
          </button>

          <button
            className={`nav-btn ${view === "form" ? "active" : ""}`}
            onClick={handleAddNew}
          >
            <span>➕</span>
            Add Job
          </button>
        </nav>

        <div className="sidebar-footer">
          <p>Track every opportunity.</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>
              {view === "dashboard"
                ? "Dashboard"
                : editingJob
                ? "Edit Application"
                : "Add New Application"}
            </h2>
            <p>Manage your applications professionally.</p>
          </div>

          {view === "dashboard" && (
            <button className="primary-btn" onClick={handleAddNew}>
              + New Job
            </button>
          )}
        </header>

        <section className="page-content">
          {view === "dashboard" ? (
            <Dashboard onEdit={handleEdit} />
          ) : (
            <JobForm job={editingJob} onDone={handleDone} />
          )}
        </section>
      </main>
    </div>
  );
}
         
