import { useParams, useNavigate } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "ABC Corp",
    location: "New York, NY",
    workType: "Remote",
    summary: "We're looking for a passionate React developer to join our frontend team.",
    salaryRange: "$70,000 - $90,000",
    lastSaved: "2025-07-30T14:00:00Z"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "XYZ Ltd",
    location: "San Francisco, CA",
    workType: "Hybrid",
    summary: "Develop and maintain scalable APIs using Node.js and PostgreSQL.",
    salaryRange: "$85,000 - $110,000",
    lastSaved: "2025-07-29T11:15:00Z"
  },
  {
    id: 3,
    title: "Fullstack Developer",
    company: "DevHub",
    location: "Austin, TX",
    workType: "On-site",
    summary: "Build modern web apps using React, Node.js, and MongoDB.",
    salaryRange: "$80,000 - $105,000",
    lastSaved: "2025-07-28T09:45:00Z"
  }
];

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
}

export default function JobDescriptionPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = jobs.find(j => j.id === Number(jobId));

  if (!job) {
    return <p className="p-4 text-red-500">Job not found.</p>;
  }

  return (
    <div className="max-w-* mx-auto mt-8 p-6 bg-white rounded shadow space-y-4">
      {/* Back button */}
      <button
        onClick={() => navigate("/job-tracker")}
        className="text-blue-600 text-sm"
      >
       Back
      </button>

      {/* Title + Work Type */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <span className="text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded-full">
          {job.workType}
        </span>
      </div>

      {/* Company + Location */}
      <p className="text-sm text-gray-600">
        {job.company} &mdash; {job.location}
      </p>

      {/* Last Saved */}
      <p className="text-xs text-gray-400">
        Last saved on {formatTimestamp(job.lastSaved)}
      </p>

      <hr />

      {/* Summary + Salary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">Summary</h2>
          <p className="text-gray-800">{job.summary}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-1">Salary Range</h2>
          <p className="text-gray-800">{job.salaryRange}</p>
        </div>
      </div>
    </div>
  );
}
