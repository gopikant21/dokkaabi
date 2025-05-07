
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import JobCard from "@/components/jobs/JobCard";

export default function Dashboard() {
  const { jobs } = useApp();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Current Openings</h1>
          <p className="text-dashboard-text-secondary mt-1">
            Manage and track your active job postings
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mt-8">Recent Candidates</h2>
          <p className="text-dashboard-text-secondary mt-1">
            Latest candidates who applied to your jobs
          </p>
          
          <div className="mt-6 bg-dashboard-card-bg rounded-lg p-4 border border-dashboard-border">
            <div className="text-center py-8">
              <p className="text-dashboard-text-secondary">
                Visit the Candidates page to see all applicants
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
