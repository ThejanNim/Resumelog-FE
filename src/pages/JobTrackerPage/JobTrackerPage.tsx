import { useNavigate } from "react-router-dom";


export default function JobTrackerPage() {
    const navigate = useNavigate();
    const jobId = 2;
    return (
        <div>
            <h1>Job Tracker Page</h1>
            <button
            style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
  }}
                className="btn btn-primary"
                onClick={() => navigate(`/job-description/${jobId}`)}
            >
                View Job Description
            </button>
        </div>
    )
}