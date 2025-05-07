
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User, Job, Candidate, CandidateDetail } from "../data/models";
import { currentUser, mockJobs, mockCandidates, mockCandidateDetails } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  jobs: Job[];
  candidates: Candidate[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getCandidateDetails: (id: string) => CandidateDetail | null;
  selectedCandidate: CandidateDetail | null;
  setSelectedCandidate: (candidate: CandidateDetail | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDetail | null>(null);
  
  const { toast } = useToast();

  // Simulate loading data on mount
  useEffect(() => {
    // Check if the user is already logged in (using sessionStorage)
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        loadData();
      } catch (error) {
        console.error("Error parsing stored user", error);
        sessionStorage.removeItem("user");
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Simulate API loading with a small delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load jobs and candidates from mock data
      setJobs(mockJobs);
      setCandidates(mockCandidates);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation (in a real app, this would be server-side)
      if (email && password.length > 3) {
        setUser(currentUser);
        setIsAuthenticated(true);
        sessionStorage.setItem("user", JSON.stringify(currentUser));
        
        // Load data after successful login
        loadData();
        
        toast({
          title: "Welcome back",
          description: `Successfully logged in as ${currentUser.name}`,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const getCandidateDetails = (id: string): CandidateDetail | null => {
    return mockCandidateDetails[id] || null;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        jobs,
        candidates,
        login,
        logout,
        getCandidateDetails,
        selectedCandidate,
        setSelectedCandidate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
