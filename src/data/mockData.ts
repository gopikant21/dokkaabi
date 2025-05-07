
import { Job, Candidate, CandidateDetail, AnalyticsData, User } from "./models";

// Current user
export const currentUser: User = {
  id: "user-001",
  name: "Alex Morgan",
  email: "alex@talent-flow.com",
  avatar: "/lovable-uploads/6e14eacf-27c0-4038-a4ba-79be58ed6051.png",
  role: "HR Manager"
};

// Mock jobs data
export const mockJobs: Job[] = [
  {
    id: "job-001",
    title: "Sr. UX Designer",
    location: "Bengaluru",
    type: "On-site",
    status: "Open",
    department: "Design",
    postedDate: "2 days ago",
    expRequired: 3,
    applications: 45,
    weeklyApplications: 26,
    color: "blue"
  },
  {
    id: "job-002",
    title: "Growth Manager",
    location: "Remote",
    type: "Remote",
    status: "Open",
    department: "Marketing",
    postedDate: "3 days ago",
    expRequired: 2.5,
    applications: 38,
    weeklyApplications: 12,
    color: "purple"
  },
  {
    id: "job-003",
    title: "Financial Analyst",
    location: "Mumbai",
    type: "Hybrid",
    status: "Open",
    department: "Finance",
    postedDate: "1 day ago",
    expRequired: 2.5,
    applications: 25,
    weeklyApplications: 25,
    color: "orange"
  },
  {
    id: "job-004",
    title: "Senior Developer",
    location: "New Delhi",
    type: "Remote",
    status: "Open",
    department: "Engineering",
    postedDate: "5 days ago",
    expRequired: 4,
    applications: 105,
    weeklyApplications: 32,
    color: "pink"
  }
];

// Mock candidates data
export const mockCandidates: Candidate[] = [
  {
    id: "cand-001",
    name: "Charlie Kristen",
    avatar: "/placeholder.svg",
    appliedRole: "Sr. UX Designer",
    currentStage: "Design Challenge",
    rating: 4.0,
    applicationDate: "12/02/23",
    attachments: 3
  },
  {
    id: "cand-002",
    name: "Malaika Brown",
    avatar: "/lovable-uploads/604487e9-4538-4a16-a2fa-2ba017602349.png",
    appliedRole: "Growth Manager",
    currentStage: "Screening",
    rating: 3.5,
    applicationDate: "18/02/23",
    attachments: 1
  },
  {
    id: "cand-003",
    name: "Simon Minter",
    avatar: "/placeholder.svg",
    appliedRole: "Financial Analyst",
    currentStage: "Design Challenge",
    rating: 2.8,
    applicationDate: "04/01/23",
    attachments: 2
  },
  {
    id: "cand-004",
    name: "Ashley Brooke",
    avatar: "/placeholder.svg",
    appliedRole: "Financial Analyst",
    currentStage: "HR Round",
    rating: 4.5,
    applicationDate: "05/03/23",
    attachments: 3
  },
  {
    id: "cand-005",
    name: "Nishant Talwar",
    avatar: "/placeholder.svg",
    appliedRole: "Sr. UX Designer",
    currentStage: "Round 2 Interview",
    rating: 5.0,
    applicationDate: "24/12/22",
    attachments: 2
  },
  {
    id: "cand-006",
    name: "Mark Jacobs",
    avatar: "/placeholder.svg",
    appliedRole: "Growth Manager",
    currentStage: "Rejected",
    rating: 2.0,
    applicationDate: "13/02/23",
    attachments: 1
  }
];

// Mock candidate details
export const mockCandidateDetails: Record<string, CandidateDetail> = {
  "cand-002": {
    id: "cand-002",
    name: "Malaika Brown",
    avatar: "/lovable-uploads/604487e9-4538-4a16-a2fa-2ba017602349.png",
    appliedRole: "Sr. UX Designer",
    currentStage: "Design Challenge",
    rating: 3.5,
    applicationDate: "18/02/23",
    attachments: 1,
    email: "malaika.br@gmail.com",
    phone: "+1 5423-6548",
    applications: [
      {
        stage: "Screening",
        date: "March 20, 2023",
        status: "Completed"
      },
      {
        stage: "Design Challenge",
        date: "March 22, 2023",
        status: "Under Review"
      },
      {
        stage: "Interview",
        date: "",
        status: "Upcoming"
      },
      {
        stage: "HR Round",
        date: "",
        status: "Upcoming"
      },
      {
        stage: "Hired",
        date: "",
        status: "Upcoming"
      }
    ],
    experiences: [
      {
        company: "Airbnb",
        role: "Product Designer",
        period: "Oct 20 - Present",
        description: "Led the redesign of the booking process for Airbnb's mobile app, resulting in a 30% increase in conversion rates and improved user satisfaction."
      }
    ]
  }
};

// Mock analytics data
export const mockAnalytics: AnalyticsData = {
  applicantsOverTime: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [45, 60, 75, 65, 85, 95]
  },
  conversionRates: [
    { stage: "Application to Screening", rate: 68 },
    { stage: "Screening to Interview", rate: 42 },
    { stage: "Interview to Offer", rate: 22 },
    { stage: "Offer to Hire", rate: 85 }
  ],
  popularRoles: [
    { role: "UX Designer", count: 78 },
    { role: "Software Developer", count: 124 },
    { role: "Product Manager", count: 64 },
    { role: "Data Analyst", count: 52 }
  ],
  sourcingChannels: [
    { channel: "LinkedIn", count: 145 },
    { channel: "Company Website", count: 98 },
    { channel: "Indeed", count: 72 },
    { channel: "Referrals", count: 58 },
    { channel: "Glassdoor", count: 35 }
  ]
};
