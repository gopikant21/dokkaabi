import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Sector } from "recharts";
import { ReactNode, useState } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  type: "bar" | "line" | "pie";
  data: any[];
  xKey?: string;
  yKey?: string;
  dataKey?: string;
  colors?: string[];
  nameKey?: string;
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
  nameKey = "name",
  colors = ["#8B5CF6", "#D946EF", "#0EA5E9", "#F97316"],
  children 
}: ChartCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Custom renderer for active sector in pie chart
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 16}
          fill={fill}
        />
      </g>
    );
  };

  // Custom pie chart label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Only show labels for segments with significant percentage
    if (percent < 0.05) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
          <div className="relative flex flex-col items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey={dataKey || yKey}
                  nameKey={nameKey}
                  label={renderCustomizedLabel}
                  onMouseEnter={onPieEnter}
                  strokeWidth={2}
                  stroke="#111111"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} (${((value / data.reduce((acc, curr) => acc + curr[dataKey || yKey], 0)) * 100).toFixed(1)}%)`, name]}
                  contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #2D2D2D", borderRadius: "4px" }}
                  labelStyle={{ color: "#FFFFFF" }}
                  itemStyle={{ color: "#FFFFFF" }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value, entry) => (
                    <span style={{ color: "#FFFFFF", fontSize: "12px" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
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