
// Data models for the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  type: "Remote" | "Hybrid" | "On-site";
  status: "Open" | "Closed" | "On Hold";
  department: string;
  postedDate: string;
  expRequired: number;
  applications: number;
  weeklyApplications: number;
  color: "blue" | "purple" | "orange" | "pink";
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  appliedRole: string;
  currentStage: string;
  rating: number;
  applicationDate: string;
  attachments: number;
  email?: string;
  phone?: string;
  status?: "New" | "In Progress" | "Rejected" | "Hired" | "Withdrawn";
}

export interface CandidateDetail extends Candidate {
  email: string;
  phone: string;
  applications: StageApplication[];
  experiences: Experience[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
}

export interface StageApplication {
  stage: string;
  date: string;
  status?: "Completed" | "Under Review" | "Upcoming" | "Failed" | "Passed";
}

export interface AnalyticsData {
  applicantsOverTime: {
    labels: string[];
    data: number[];
  };
  conversionRates: {
    stage: string;
    rate: number;
  }[];
  popularRoles: {
    role: string;
    count: number;
  }[];
  sourcingChannels: {
    channel: string;
    count: number;
  }[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  audioUrl?: string;
}
