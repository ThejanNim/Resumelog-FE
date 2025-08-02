import { Navigate, Route, Routes } from "react-router";
import AppTemplate from "./components/templates/AppTemplate";
import JobTrackerPage from "./pages/JobTrackerPage/JobTrackerPage";
import JobDescriptionPage from "./pages/JobDescriptionPage/JobDescription"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/job-tracker" />} />
      <Route element={<AppTemplate />}>
        <Route path="/job-tracker" element={<JobTrackerPage />} />
        <Route path="/job-description/:jobId" element={<JobDescriptionPage />} />
        <Route path="/people" element="" />
        <Route path="/companies" element="" />
      </Route>
    </Routes>
  );
}
