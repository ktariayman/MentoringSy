import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Calendar,
  MessageSquare,
  Users,
  BookOpen,
  LogOut,
  Menu,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { useAuthHandler } from '@/features/Auth/hooks/useAuth';
import DashboardTable from './components/DashboardTable';
import OverviewCard from './components/OverviewCard';
import { data } from './constants';
import { DashboardRow, Tab, TabItem, TableColumn } from './ts/type';
import { useNavigate } from 'react-router-dom';
import { useSidebarResize } from './hooks/useSidebarResize';

export default function MentorshipDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const {
    sidebarWidth,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    handleMouseDown,
  } = useSidebarResize();
  const { onLogout } = useAuthHandler();

  const navigate = useNavigate();
  const DASHBOARD_TABS = useMemo<TabItem[]>(() => {
    return [
      { tab: 'overview', label: 'Overview', icon: Users },
      { tab: 'sessions', label: 'Sessions', icon: Calendar },
      { tab: 'resources', label: 'Resources', icon: BookOpen },
      {
        tab: 'mentors',
        label: 'Mentors',
        icon: Users,
        onClick: () => navigate('/browse/mentors'),
      },
    ];
  }, []);
  const columns = useMemo<TableColumn<DashboardRow>[]>(() => {
    return [
      { header: 'ID', accessor: 'id', sortable: true },
      { header: 'Name', accessor: 'name', sortable: true },
      { header: 'Role', accessor: 'role' },
      {
        header: 'Progress',
        accessor: 'progress',
        sortable: true,
        render: (value: string | number) =>
          typeof value === 'string' ? (
            <span className="font-medium text-blue-500">{value}</span>
          ) : (
            <span className="font-medium text-red-500">{value}</span>
          ),
      },
    ];
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside
        style={{
          background: 'var(--background)',
          width: isSidebarCollapsed ? '64px' : `${sidebarWidth}px`,
        }}
        className={` transition-all duration-300 bg-white shadow-lg flex flex-col  border-r border-r-grey-500`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="block"
            style={{ display: 'flex' }}
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-4 flex-grow space-y-2 pr-2">
          {DASHBOARD_TABS.map(({ tab, label, icon: Icon, onClick }) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'secondary' : 'ghost'}
              className={`w-full justify-start rounded-lg ${
                activeTab === tab
                  ? 'bg-blue-100 text-blue-500'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab(tab as Tab);
                if (onClick) onClick();
              }}
            >
              <Icon
                className={`h-5 w-5 ${activeTab === tab ? 'text-blue-500' : 'text-gray-500'}`}
              />
              {!isSidebarCollapsed && <span className="ml-2">{label}</span>}
            </Button>
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start mt-4 hover:bg-gray-100 rounded-lg"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5 text-gray-500" />
            {!isSidebarCollapsed && <span className="ml-2">Log Out</span>}
          </Button>
        </nav>
        {!isSidebarCollapsed && (
          <div
            className="w-1 bg-gray-300 cursor-ew-resize hover:bg-gray-500"
            onMouseDown={handleMouseDown}
          />
        )}
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Header isLoggedIn onLogout={onLogout} title="Dashboard" />
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <OverviewCard
                title="Total Mentees"
                icon={Users}
                value="12"
                description="+2 from last month"
              />
              <OverviewCard
                title="Upcoming Sessions"
                icon={Calendar}
                value="4"
                description="Next session in 2 days"
              />
              <OverviewCard
                title="Resources Shared"
                icon={BookOpen}
                value="25"
                description="+5 new this week"
              />
              <OverviewCard
                title="Unread Messages"
                icon={MessageSquare}
                value="9"
                description="3 urgent messages"
              />
            </div>
          )}
          {activeTab === 'sessions' && (
            <Card className="mt-6">Sessions content...</Card>
          )}
          {activeTab === 'resources' && (
            <Card className="mt-6">Resources content...</Card>
          )}
        </div>

        {activeTab !== 'mentors' && (
          <DashboardTable
            columns={columns}
            data={data}
            onEdit={(row) => console.log('save on db', row)}
            onDelete={(rows) => console.log('Delete:', rows)}
          />
        )}
      </main>
    </div>
  );
}
