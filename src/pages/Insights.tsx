import MainLayout from "@/components/layout/MainLayout";
import ChartCard from "@/components/insights/ChartCard";
import StatsCard from "@/components/insights/StatsCard";
import { useApp } from "@/context/AppContext";
import { mockAnalytics } from "@/data/mockData";
import { Users, Briefcase, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Insights() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Insights</h1>
          <p className="text-dashboard-text-secondary mt-1">
            Analytics and metrics about your recruitment process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Candidates"
            value={213}
            icon={<Users size={18} />}
            trend={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Active Jobs"
            value={24}
            icon={<Briefcase size={18} />}
            trend={{ value: 5, positive: true }}
          />
          <StatsCard
            title="Interviews This Week"
            value={18}
            icon={<Calendar size={18} />}
            trend={{ value: 8, positive: true }}
          />
          <StatsCard
            title="Avg. Time to Hire"
            value="24 days"
            icon={<TrendingUp size={18} />}
            trend={{ value: 3, positive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Applicants Over Time"
            type="line"
            data={mockAnalytics.applicantsOverTime.labels.map(
              (label, index) => ({
                month: label,
                applicants: mockAnalytics.applicantsOverTime.data[index],
              })
            )}
            xKey="month"
            yKey="applicants"
          />

          <ChartCard
            title="Sourcing Channels"
            type="pie"
            data={mockAnalytics.sourcingChannels.map((item) => ({
              name: item.channel,
              value: item.count,
            }))}
            dataKey="value"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Conversion Rates"
            description="Percentage of candidates moving between stages"
            type="bar"
            data={mockAnalytics.conversionRates}
            xKey="stage"
            yKey="rate"
          >
            <div className="mt-4 space-y-4 px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockAnalytics.conversionRates.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-2 bg-dashboard-card-hover rounded-lg p-3 transition-colors hover:bg-dashboard-card-hover/80"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.stage}</span>
                      <span className="font-bold text-primary">
                        {item.rate}%
                      </span>
                    </div>
                    <Progress
                      value={item.rate}
                      className="h-2.5 rounded-full"
                      indicatorClassName="bg-gradient-to-r from-primary to-primary-light rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Popular Roles"
            description="Most applied-to positions"
            type="bar"
            data={mockAnalytics.popularRoles}
            xKey="role"
            yKey="count"
          >
            <div className="mt-4 space-y-4 px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockAnalytics.popularRoles.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-2 bg-dashboard-card-hover rounded-lg p-3 transition-colors hover:bg-dashboard-card-hover/80"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.role}</span>
                      <span className="font-bold text-primary">
                        {item.count}
                      </span>
                    </div>
                    <Progress
                      value={
                        (item.count /
                          Math.max(
                            ...mockAnalytics.popularRoles.map((r) => r.count)
                          )) *
                        100
                      }
                      className="h-2.5 rounded-full"
                      indicatorClassName="bg-gradient-to-r from-primary to-primary-light rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </MainLayout>
  );
}
