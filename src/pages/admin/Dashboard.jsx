import React from 'react';

// icons
import { MdDashboard, MdGroup, MdCheckCircle, MdCancel, MdAdminPanelSettings, MdViewCarousel } from 'react-icons/md';

// components
import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
import StatCard from '../../components/StatCard';
import PieChart from "../../components/charts/PieChart";
import LineChart from "../../components/charts/LineChart";

// hooks
import { useCurrentUser } from '../../hooks/useAuth';
import { useDashboardStats } from '../../hooks/admin/useDashboard';

const Dashboard = () => {

  const { data, isLoading } = useCurrentUser();

  const { data: stats = {}, isLoading: isStatsLoading } = useDashboardStats();
  console.log(stats);

  const getMonthlyPercentage = (monthlyData = []) => {
    if (monthlyData.length < 2) return 0;

    const currentMonth = monthlyData[monthlyData.length - 1].users;
    const previousMonth = monthlyData[monthlyData.length - 2].users;

    if (previousMonth === 0) return currentMonth > 0 ? 100 : 0;

    return Number(
      (((currentMonth - previousMonth) / previousMonth) * 100).toFixed(1)
    );
  };

  const monthlyPercentage = getMonthlyPercentage(stats?.monthlyUserData);

  const statsCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: MdGroup,
      iconClassName: "bg-blue-100 text-blue-600",
      percentage: monthlyPercentage,
      description: "from last month",
    },
    {
      title: "Active Users",
      value: stats?.activeUsers ?? 0,
      icon: MdCheckCircle,
      iconClassName: "bg-green-100 text-green-600",
      percentage: 8.2,
      description: "from last month",
    },
    {
      title: "Inactive Users",
      value: stats?.inactiveUsers ?? 0,
      icon: MdCancel,
      iconClassName: "bg-red-100 text-red-600",
      percentage: -3.4,
      description: "from last month",
    },
    {
      title: "Total Banners",
      value: stats?.totalBanners ?? 0,
      icon: MdViewCarousel,
      iconClassName: "bg-purple-100 text-purple-600",
      percentage: 2.1,
      description: "from last month",
    },
  ];

  const userChartData = [
    { name: "Active Users", value: stats?.activeUsers ?? 0 },
    { name: "Inactive Users", value: stats?.inactiveUsers ?? 0 },
  ];


  return (
    <div className='space-y-5'>

      <PageHeader
        titleIcon={MdDashboard}
        title={` Welcome back, ${data?.name || "Admin"}! 👋`}
        description={" Here's what's happening with Authify today."}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((stat, index) => (
          <StatCard key={index} {...stat} isLoading={isStatsLoading} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Container>
          <PieChart
            title="User Distribution"
            description="Overview of users by status and role."
            data={userChartData}
          />
        </Container>

        <Container>
          <LineChart
            title="Monthly User Growth"
            description="New users registered over the last six months."
            data={stats?.monthlyUserData ?? []}
            dataKey="users"
            xAxisKey="month"
          />
        </Container>
      </div>

    </div>
  )
}

export default Dashboard