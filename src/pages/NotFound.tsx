
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dashboard-dark-bg">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-dashboard-accent-purple">404</h1>
        <p className="text-xl text-dashboard-text-secondary mb-8">Oops! Page not found</p>
        <Button className="gradient-button" onClick={() => navigate("/")}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
