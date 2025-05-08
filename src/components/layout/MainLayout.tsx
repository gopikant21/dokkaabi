import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { useApp } from "@/context/AppContext";
import CandidateDetails from "../candidates/CandidateDetails";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { selectedCandidate, setSelectedCandidate } = useApp();

  return (
    <div className="min-h-screen flex bg-dashboard-dark-bg text-dashboard-text-primary">
      <Sidebar collapsed={sidebarCollapsed} />

      <div
        className={`flex-1 flex flex-col h-screen ${
          selectedCandidate ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <TopNav
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {selectedCandidate && (
        <CandidateDetails
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}
