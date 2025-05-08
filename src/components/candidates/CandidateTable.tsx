import { Candidate } from "@/data/models";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { File } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CandidateTableProps {
  candidates: Candidate[];
}

export default function CandidateTable({ candidates }: CandidateTableProps) {
  const { getCandidateDetails, setSelectedCandidate } = useApp();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Accepted", "Rejected"];

  const handleViewDetails = (candidateId: string) => {
    const details = getCandidateDetails(candidateId);
    if (details) {
      setSelectedCandidate(details);
    }
  };

  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  return (
    <div className="bg-dashboard-card-bg rounded-lg overflow-hidden border border-dashboard-border">
      <div className="border-b border-dashboard-border">
        <div className="flex">
          {filters.map((filter) => (
            <button
              key={filter}
              className={cn(
                "px-6 py-3 text-sm font-medium",
                filter === activeFilter
                  ? "text-dashboard-accent-purple border-b-2 border-dashboard-accent-purple"
                  : "text-dashboard-text-secondary"
              )}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-dashboard-dark-bg">
          <tr>
            <th className="text-left py-3 px-4 text-xs text-dashboard-text-secondary uppercase font-medium">
              Candidate Name
            </th>
            <th className="text-left py-3 px-4 text-xs text-dashboard-text-secondary uppercase font-medium">
              Rating
            </th>
            <th className="text-left py-3 px-4 text-xs text-dashboard-text-secondary uppercase font-medium">
              Stages
            </th>
            <th className="text-left py-3 px-4 text-xs text-dashboard-text-secondary uppercase font-medium">
              Applied Role
            </th>
            <th className="text-left py-3 px-4 text-xs text-dashboard-text-secondary uppercase font-medium">
              Application Date
            </th>
            <th className="text-left py-3 px-4 text-xs text-dashboard-text-secondary uppercase font-medium">
              Attachments
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr
              key={candidate.id}
              className="border-t border-dashboard-border hover:bg-gray-900/30 cursor-pointer"
              onClick={() => handleViewDetails(candidate.id)}
            >
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <Avatar className="mr-3">
                    <AvatarFallback className="text-foreground bg-secondary">
                      {getInitials(candidate.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{candidate.name}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{candidate.rating.toFixed(1)}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs",
                    candidate.currentStage === "Rejected"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-blue-500/10 text-blue-400"
                  )}
                >
                  {candidate.currentStage}
                </div>
              </td>
              <td className="py-4 px-4">{candidate.appliedRole}</td>
              <td className="py-4 px-4">{candidate.applicationDate}</td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-1">
                  <File size={14} />
                  <span>
                    {candidate.attachments}{" "}
                    {candidate.attachments === 1 ? "file" : "files"}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
