import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job } from "@/data/models";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div
      className={cn(
        "bg-dashboard-card-bg rounded-lg p-4 relative overflow-hidden",
        `job-card-${job.color}`
      )}
    >
      {/* Circular blur effect */}
      <div
        className={cn(
          "absolute -top-14 -right-14 w-36 h-36 rounded-full blur-2xl opacity-20",
          job.color === "blue" && "bg-blue-500",
          job.color === "purple" && "bg-purple-500",
          job.color === "orange" && "bg-orange-500",
          job.color === "pink" && "bg-pink-500"
        )}
      />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-lg font-medium">{job.title}</h3>

          <div className="text-sm text-gray-500 mt-1">
            Posted {job.postedDate}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800/50 text-gray-300 text-sm">
              <MapPin size={16} strokeWidth={1.5} />
              <span>{job.location}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800/50 text-gray-300 text-sm">
              <GraduationCap size={16} strokeWidth={1.5} />
              <span>{job.expRequired} years exp.</span>
            </div>
          </div>
        </div>

        <Link
          to={`/jobs/${job.id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
            <ArrowUpRight
              size={20}
              className={cn(
                job.color === "blue" && "text-dashboard-accent-blue",
                job.color === "purple" && "text-dashboard-accent-purple",
                job.color === "orange" && "text-dashboard-accent-orange",
                job.color === "pink" && "text-dashboard-accent-pink"
              )}
            />
          </div>
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-end">
          <div className="flex items-end">
            <h1 className="text-5xl font-bold">{job.applications}</h1>
            <span className="ml-2 text-sm text-dashboard-text-secondary mb-1">
              applications
            </span>
          </div>

          <span className="text-green-500 mb-1">
            {job.weeklyApplications} in last week
          </span>
        </div>
      </div>
    </div>
  );
}
