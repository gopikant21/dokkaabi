
import { X, Phone, Mail, Check, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CandidateDetail } from "@/data/models";
import { cn } from "@/lib/utils";

interface CandidateDetailsProps {
  candidate: CandidateDetail;
  onClose: () => void;
}

export default function CandidateDetails({ candidate, onClose }: CandidateDetailsProps) {
  const getStageIcon = (status?: string) => {
    if (!status || status === "Upcoming") return <span className="w-5 h-5" />;
    if (status === "Completed") return <Check className="w-5 h-5 text-green-500" />;
    if (status === "Under Review") return <Clock className="w-5 h-5 text-yellow-500" />;
    return <span className="w-5 h-5" />;
  };
  
  const getStageBackground = (status?: string) => {
    if (!status || status === "Upcoming") return "bg-gray-700";
    if (status === "Completed") return "bg-green-500";
    if (status === "Under Review") return "bg-yellow-500";
    return "bg-gray-700";
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-dashboard-card-bg border-l border-dashboard-border z-50 overflow-y-auto animate-fade-in shadow-xl">
      <div className="flex justify-between items-center p-4 border-b border-dashboard-border">
        <h2 className="font-semibold text-lg">Candidate Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      
      <div className="p-6 text-center border-b border-dashboard-border">
        <Avatar className="w-20 h-20 mx-auto">
          <AvatarImage src={candidate.avatar} />
          <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
        </Avatar>
        <h2 className="mt-3 text-xl font-medium">{candidate.name}</h2>
        <p className="text-dashboard-text-secondary">{candidate.appliedRole}</p>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-left">
            <p className="text-xs text-dashboard-text-secondary uppercase">Email</p>
            <div className="flex items-center mt-1">
              <Mail size={14} className="mr-1 text-dashboard-text-secondary" />
              <a href={`mailto:${candidate.email}`} className="text-sm truncate">
                {candidate.email}
              </a>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xs text-dashboard-text-secondary uppercase">Phone number</p>
            <div className="flex items-center mt-1">
              <Phone size={14} className="mr-1 text-dashboard-text-secondary" />
              <a href={`tel:${candidate.phone}`} className="text-sm">
                {candidate.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-b border-dashboard-border">
        <h3 className="font-medium mb-4">Application Details</h3>
        
        <div className="relative">
          {candidate.applications.map((app, index) => (
            <div key={index} className="flex mb-8 last:mb-0">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
                getStageBackground(app.status)
              )}>
                {index + 1}
              </div>
              
              <div className="ml-4">
                <div className="flex items-center">
                  <h4 className="font-medium">{app.stage}</h4>
                  {app.status === "Under Review" && (
                    <span className="ml-3 text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">
                      Under Review
                    </span>
                  )}
                </div>
                {app.date && <p className="text-sm text-dashboard-text-secondary mt-1">{app.date}</p>}
              </div>
              
              <div className="ml-auto flex items-center">
                {getStageIcon(app.status)}
              </div>
              
              {/* Vertical line connecting stages */}
              {index < candidate.applications.length - 1 && (
                <div className="absolute left-4 w-0.5 bg-gray-700" style={{ top: `${index * 32 + 32}px`, height: '40px' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 border-b border-dashboard-border">
        <h3 className="font-medium mb-4">Experience</h3>
        
        {candidate.experiences.map((exp, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 mr-3">
                {exp.logo ? (
                  <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                ) : (
                  exp.company.charAt(0)
                )}
              </div>
              <div>
                <h4 className="font-medium">{exp.company}</h4>
                <p className="text-xs text-dashboard-text-secondary">{exp.period}</p>
              </div>
            </div>
            <p className="text-sm text-dashboard-text-secondary ml-11">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="p-6">
        <Button className="w-full gradient-button">
          Move to Next Step <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
