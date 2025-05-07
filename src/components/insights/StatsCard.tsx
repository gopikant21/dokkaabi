
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <Card className="bg-dashboard-card-bg border-dashboard-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-dashboard-text-secondary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {trend && (
          <div className="flex items-center mt-1">
            <span className={trend.positive ? "text-green-500" : "text-red-500"}>
              {trend.positive ? "↑" : "↓"} {trend.value}%
            </span>
            <span className="text-dashboard-text-secondary text-sm ml-1">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
