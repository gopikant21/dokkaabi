import MainLayout from "@/components/layout/MainLayout";
import JobCard from "@/components/jobs/JobCard";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

export default function Jobs() {
  const { jobs } = useApp();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Jobs</h1>
            <p className="text-dashboard-text-secondary mt-1">
              Manage and track all your job postings
            </p>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" /> Filter
            </Button>
            <Button size="sm" className="gradient-button">
              <Plus size={16} className="mr-2" /> Create Job
            </Button>
          </div>
        </div>

        <div className="relative w-full h-[220px]">
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
      </div>
    </MainLayout>
  );
}
