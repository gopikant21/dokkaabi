import { Job, Candidate, CandidateDetail, AnalyticsData, User } from "./models";

// Current user
export const currentUser: User = {
  id: "user-001",
  name: "Alex Morgan",
  email: "alex@talent-flow.com",
  avatar: "/lovable-uploads/6e14eacf-27c0-4038-a4ba-79be58ed6051.png",
  role: "HR Manager",
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
    color: "blue",
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
    color: "purple",
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
    color: "orange",
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
    color: "pink",
  },
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
    attachments: 3,
  },
  {
    id: "cand-002",
    name: "Malaika Brown",
    avatar: "/lovable-uploads/604487e9-4538-4a16-a2fa-2ba017602349.png",
    appliedRole: "Growth Manager",
    currentStage: "Screening",
    rating: 3.5,
    applicationDate: "18/02/23",
    attachments: 1,
  },
  {
    id: "cand-003",
    name: "Simon Minter",
    avatar: "/placeholder.svg",
    appliedRole: "Financial Analyst",
    currentStage: "Design Challenge",
    rating: 2.8,
    applicationDate: "04/01/23",
    attachments: 2,
  },
  {
    id: "cand-004",
    name: "Ashley Brooke",
    avatar: "/placeholder.svg",
    appliedRole: "Financial Analyst",
    currentStage: "HR Round",
    rating: 4.5,
    applicationDate: "05/03/23",
    attachments: 3,
  },
  {
    id: "cand-005",
    name: "Nishant Talwar",
    avatar: "/placeholder.svg",
    appliedRole: "Sr. UX Designer",
    currentStage: "Round 2 Interview",
    rating: 5.0,
    applicationDate: "24/12/22",
    attachments: 2,
  },
  {
    id: "cand-006",
    name: "Mark Jacobs",
    avatar: "/placeholder.svg",
    appliedRole: "Growth Manager",
    currentStage: "Rejected",
    rating: 2.0,
    applicationDate: "13/02/23",
    attachments: 1,
  },
];

// Mock candidate details
export const mockCandidateDetails: Record<string, CandidateDetail> = {
  "cand-001": {
    id: "cand-001",
    name: "Charlie Kristen",
    avatar: "/placeholder.svg",
    appliedRole: "Sr. UX Designer",
    currentStage: "Design Challenge",
    rating: 4.0,
    applicationDate: "12/02/23",
    attachments: 3,
    email: "charlie.k@gmail.com",
    phone: "+1 2345-6789",
    applications: [
      {
        stage: "Screening",
        date: "February 10, 2023",
        status: "Completed",
      },
      {
        stage: "Design Challenge",
        date: "February 15, 2023",
        status: "Under Review",
      },
      {
        stage: "Interview",
        date: "",
        status: "Upcoming",
      },
      {
        stage: "HR Round",
        date: "",
        status: "Upcoming",
      },
    ],
    experiences: [
      {
        company: "Google",
        role: "UI/UX Designer",
        period: "Jan 19 - Present",
        description:
          "Designed user interfaces for various Google products and collaborated with cross-functional teams to implement design solutions.",
      },
      {
        company: "Microsoft",
        role: "Junior Designer",
        period: "Mar 17 - Dec 18",
        description:
          "Assisted in designing UI components and conducted user research for product improvements.",
      },
    ],
  },
  "cand-002": {
    id: "cand-002",
    name: "Malaika Brown",
    avatar: "/lovable-uploads/604487e9-4538-4a16-a2fa-2ba017602349.png",
    appliedRole: "Growth Manager",
    currentStage: "Screening",
    rating: 3.5,
    applicationDate: "18/02/23",
    attachments: 1,
    email: "malaika.br@gmail.com",
    phone: "+1 5423-6548",
    applications: [
      {
        stage: "Screening",
        date: "March 20, 2023",
        status: "Completed",
      },
      {
        stage: "Design Challenge",
        date: "March 22, 2023",
        status: "Under Review",
      },
      {
        stage: "Interview",
        date: "",
        status: "Upcoming",
      },
      {
        stage: "HR Round",
        date: "",
        status: "Upcoming",
      },
      {
        stage: "Hired",
        date: "",
        status: "Upcoming",
      },
    ],
    experiences: [
      {
        company: "Airbnb",
        role: "Product Designer",
        period: "Oct 20 - Present",
        description:
          "Led the redesign of the booking process for Airbnb's mobile app, resulting in a 30% increase in conversion rates and improved user satisfaction.",
      },
    ],
  },
  "cand-003": {
    id: "cand-003",
    name: "Simon Minter",
    avatar: "/placeholder.svg",
    appliedRole: "Financial Analyst",
    currentStage: "Design Challenge",
    rating: 2.8,
    applicationDate: "04/01/23",
    attachments: 2,
    email: "simon.m@gmail.com",
    phone: "+1 3456-7890",
    applications: [
      {
        stage: "Screening",
        date: "January 10, 2023",
        status: "Completed",
      },
      {
        stage: "Technical Assessment",
        date: "January 15, 2023",
        status: "Completed",
      },
      {
        stage: "Interview",
        date: "January 25, 2023",
        status: "Under Review",
      },
      {
        stage: "HR Round",
        date: "",
        status: "Upcoming",
      },
    ],
    experiences: [
      {
        company: "Deloitte",
        role: "Junior Financial Analyst",
        period: "Jun 21 - Present",
        description:
          "Responsible for financial modeling, data analysis and reporting for key clients in the technology sector.",
      },
      {
        company: "EY",
        role: "Finance Intern",
        period: "Jan 21 - May 21",
        description:
          "Assisted in preparing financial reports and conducted market research for senior analysts.",
      },
    ],
  },
  "cand-004": {
    id: "cand-004",
    name: "Ashley Brooke",
    avatar: "/placeholder.svg",
    appliedRole: "Financial Analyst",
    currentStage: "HR Round",
    rating: 4.5,
    applicationDate: "05/03/23",
    attachments: 3,
    email: "ashley.b@gmail.com",
    phone: "+1 7890-1234",
    applications: [
      {
        stage: "Screening",
        date: "March 7, 2023",
        status: "Completed",
      },
      {
        stage: "Technical Assessment",
        date: "March 10, 2023",
        status: "Completed",
      },
      {
        stage: "Interview",
        date: "March 15, 2023",
        status: "Completed",
      },
      {
        stage: "HR Round",
        date: "March 20, 2023",
        status: "Under Review",
      },
    ],
    experiences: [
      {
        company: "Goldman Sachs",
        role: "Associate Analyst",
        period: "Aug 20 - Present",
        description:
          "Performed financial analysis for investment decisions and prepared client presentations for senior management.",
      },
      {
        company: "Morgan Stanley",
        role: "Financial Analyst",
        period: "Feb 18 - Jul 20",
        description:
          "Conducted financial research and analysis to support investment banking teams.",
      },
    ],
  },
  "cand-005": {
    id: "cand-005",
    name: "Nishant Talwar",
    avatar: "/placeholder.svg",
    appliedRole: "Sr. UX Designer",
    currentStage: "Round 2 Interview",
    rating: 5.0,
    applicationDate: "24/12/22",
    attachments: 2,
    email: "nishant.t@gmail.com",
    phone: "+1 5678-9012",
    applications: [
      {
        stage: "Screening",
        date: "December 26, 2022",
        status: "Completed",
      },
      {
        stage: "Design Challenge",
        date: "January 5, 2023",
        status: "Completed",
      },
      {
        stage: "Round 1 Interview",
        date: "January 12, 2023",
        status: "Completed",
      },
      {
        stage: "Round 2 Interview",
        date: "January 20, 2023",
        status: "Under Review",
      },
    ],
    experiences: [
      {
        company: "Adobe",
        role: "UX Designer",
        period: "Mar 19 - Present",
        description:
          "Led design initiatives for multiple Adobe products, focusing on user experience improvements and visual design systems.",
      },
      {
        company: "Facebook",
        role: "UI Designer",
        period: "Jun 17 - Feb 19",
        description:
          "Designed interfaces for Facebook's web and mobile applications, collaborating with product managers and engineers.",
      },
    ],
  },
  "cand-006": {
    id: "cand-006",
    name: "Mark Jacobs",
    avatar: "/placeholder.svg",
    appliedRole: "Growth Manager",
    currentStage: "Rejected",
    rating: 2.0,
    applicationDate: "13/02/23",
    attachments: 1,
    email: "mark.j@gmail.com",
    phone: "+1 9012-3456",
    applications: [
      {
        stage: "Screening",
        date: "February 15, 2023",
        status: "Completed",
      },
      {
        stage: "Assessment",
        date: "February 20, 2023",
        status: "Completed",
      },
      {
        stage: "Interview",
        date: "February 28, 2023",
        status: "Rejected",
      },
    ],
    experiences: [
      {
        company: "Twitter",
        role: "Growth Specialist",
        period: "Sep 21 - Present",
        description:
          "Developed and executed growth strategies to increase user acquisition and retention across various markets.",
      },
      {
        company: "Snapchat",
        role: "Marketing Associate",
        period: "Jan 20 - Aug 21",
        description:
          "Assisted in implementing marketing campaigns and analyzing user engagement metrics.",
      },
    ],
  },
};

// Mock analytics data
export const mockAnalytics: AnalyticsData = {
  applicantsOverTime: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [45, 60, 75, 65, 85, 95],
  },
  conversionRates: [
    { stage: "Application to Screening", rate: 68 },
    { stage: "Screening to Interview", rate: 42 },
    { stage: "Interview to Offer", rate: 22 },
    { stage: "Offer to Hire", rate: 85 },
  ],
  popularRoles: [
    { role: "UX Designer", count: 78 },
    { role: "Software Developer", count: 124 },
    { role: "Product Manager", count: 64 },
    { role: "Data Analyst", count: 52 },
  ],
  sourcingChannels: [
    { channel: "LinkedIn", count: 145 },
    { channel: "Company Website", count: 98 },
    { channel: "Indeed", count: 72 },
    { channel: "Referrals", count: 58 },
    { channel: "Glassdoor", count: 35 },
  ],
};
