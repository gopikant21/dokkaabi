
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight, Users } from "lucide-react";
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
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{job.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-dashboard-text-secondary text-sm">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-dashboard-text-secondary text-sm">
            <span>{job.expRequired} years exp.</span>
          </div>
        </div>
        
        <Link to={`/jobs/${job.id}`} className="hover:opacity-80 transition-opacity">
          <ArrowUpRight size={20} className={cn(
            job.color === 'blue' && 'text-dashboard-accent-blue',
            job.color === 'purple' && 'text-dashboard-accent-purple',
            job.color === 'orange' && 'text-dashboard-accent-orange',
            job.color === 'pink' && 'text-dashboard-accent-pink',
          )} />
        </Link>
      </div>
      
      <div className="mt-6">
        <div className="text-3xl font-bold">{job.applications}</div>
        <div className="text-sm text-dashboard-text-secondary flex items-center">
          <Users size={14} className="mr-1" /> applications
        </div>
      </div>
      
      <div className="mt-3 text-xs">
        <span className={cn(
          "bg-opacity-10 px-2 py-1 rounded text-xs",
          job.weeklyApplications > 20 ? "bg-green-500 text-green-500" : "bg-yellow-500 text-yellow-500"
        )}>
          {job.weeklyApplications} in last week
        </span>
      </div>
    </div>
  );
}
