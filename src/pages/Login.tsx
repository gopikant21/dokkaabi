
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useApp();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dashboard-dark-bg">
      <div className="w-full max-w-md p-8 bg-dashboard-card-bg rounded-lg shadow-lg border border-dashboard-border">
        <div className="flex justify-center mb-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-dashboard-accent-purple to-dashboard-accent-pink flex items-center justify-center text-white font-bold text-xl">
            TF
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to TalentFlow</h1>
        <p className="text-dashboard-text-secondary text-center mb-8">
          Log in to access your recruitment dashboard
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
                className="bg-dashboard-dark-bg border-dashboard-border"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-dashboard-accent-purple hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
                className="bg-dashboard-dark-bg border-dashboard-border"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full gradient-button"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-dashboard-text-secondary">Don't have an account? </span>
          <a href="#" className="text-dashboard-accent-purple hover:underline">
            Contact your administrator
          </a>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dashboard-border text-center text-xs text-dashboard-text-secondary">
          <p>For demo purposes, you can use any email and password with at least 4 characters</p>
        </div>
      </div>
    </div>
  );
}
