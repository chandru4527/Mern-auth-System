import React from 'react';

// icons
import { MdDashboard, MdGroup, MdCheckCircle, MdCancel, MdAdminPanelSettings } from 'react-icons/md';

// components
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';

// hooks
import { useCurrentUser } from '../../hooks/useAuth';
import { useDashboardStats } from '../../hooks/admin/useDashboard';

const Dashboard = () => {


  const { data, isLoading } = useCurrentUser();
  console.log(data);

  const { data: stats = [] } = useDashboardStats();
  console.log('stats', stats);

  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: MdGroup,
      iconClassName: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: MdCheckCircle,
      iconClassName: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive Users",
      value: stats.inactiveUsers,
      icon: MdCancel,
      iconClassName: "bg-red-100 text-red-600",
    },
    {
      title: "Administrators",
      value: stats.admins,
      icon: MdAdminPanelSettings,
      iconClassName: "bg-purple-100 text-purple-600",
    },
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
          <Card
            key={index}
            variant="stat"
            title={stat.title}
            value={isLoading ? "..." : stat.value}
            icon={stat.icon}
            iconClassName={stat.iconClassName}
          />
        ))}
      </div>

    </div>
  )
}

export default Dashboard