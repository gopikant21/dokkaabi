
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { AudioProvider } from "@/context/AudioContext";
import { useApp } from "@/context/AppContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Insights from "./pages/Insights";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useApp();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dashboard-dark-bg">
        <div className="text-center">
          <div className="h-10 w-10 border-2 border-t-transparent border-dashboard-accent-purple rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-dashboard-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/jobs" 
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/candidates" 
        element={
          <ProtectedRoute>
            <Candidates />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/insights" 
        element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/chatbot" 
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <AudioProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AudioProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
