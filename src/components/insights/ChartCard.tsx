
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  type: "bar" | "line" | "pie";
  data: any[];
  xKey?: string;
  yKey?: string;
  dataKey?: string;
  colors?: string[];
  children?: ReactNode;
}

export default function ChartCard({ 
  title, 
  description, 
  type, 
  data, 
  xKey = "name", 
  yKey = "value",
  dataKey,
  colors = ["#8B5CF6", "#D946EF", "#0EA5E9", "#F97316"],
  children 
}: ChartCardProps) {
  
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
              <XAxis dataKey={xKey} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #2D2D2D" }}
                labelStyle={{ color: "#FFFFFF" }}
                itemStyle={{ color: "#FFFFFF" }}
              />
              <Bar dataKey={yKey} fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
              <XAxis dataKey={xKey} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #2D2D2D" }}
                labelStyle={{ color: "#FFFFFF" }}
                itemStyle={{ color: "#FFFFFF" }}
              />
              <Line 
                type="monotone" 
                dataKey={yKey} 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={{ fill: "#0EA5E9", stroke: "#0EA5E9", strokeWidth: 2, r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey={dataKey || yKey}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #2D2D2D" }}
                labelStyle={{ color: "#FFFFFF" }}
                itemStyle={{ color: "#FFFFFF" }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card className="bg-dashboard-card-bg border-dashboard-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {renderChart()}
        {children}
      </CardContent>
    </Card>
  );
}
