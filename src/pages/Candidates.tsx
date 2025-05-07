
import MainLayout from "@/components/layout/MainLayout";
import CandidateTable from "@/components/candidates/CandidateTable";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

export default function Candidates() {
  const { candidates } = useApp();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Candidates</h1>
            <p className="text-dashboard-text-secondary mt-1">
              View and manage candidates in your talent pipeline
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" /> Filter
            </Button>
            <Button size="sm" className="gradient-button">
              <Plus size={16} className="mr-2" /> Add Candidate
            </Button>
          </div>
        </div>
        
        <CandidateTable candidates={candidates} />
      </div>
    </MainLayout>
  );
}
