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

        <div
          className="relative w-full"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className="absolute inset-0 overflow-x-scroll overflow-y-hidden no-scrollbar">
            <div className="inline-flex gap-6 pb-6 h-full">
              {jobs.map((job) => (
                <div key={job.id} className="w-[370px] flex-shrink-0">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </div>
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
