import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  MessageSquare,
  Users,
  BookOpen,
  LogOut,
  Settings,
  User,
  Menu
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Edit, Trash, ChevronUp, ChevronDown } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

type OverviewCardProps = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  description: string;
};

const OverviewCard = ({ title, icon: Icon, value, description }: OverviewCardProps) => (
  <Card className='min-w-0'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>{title}</CardTitle>
      <Icon className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>{value}</div>
      <p className='text-xs text-muted-foreground'>{description}</p>
    </CardContent>
  </Card>
);

type ProfileCardProps = {
  type: 'Mentor' | 'Mentee';
  name: string;
  role: string;
  badges: string[];
  progress?: { title: string; value: number }[];
};

const ProfileCard = ({ type, name, role, badges, progress = [] }: ProfileCardProps) => (
  <Card className='min-w-0'>
    <CardHeader>
      <CardTitle>{type} Profile</CardTitle>
      <CardDescription>
        {type === 'Mentor' ? 'Your mentorship information' : 'Your learning progress'}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className='flex flex-col sm:flex-row items-center sm:space-x-4'>
        <Avatar className='h-20 w-20 mb-4 sm:mb-0'>
          <AvatarImage
            src='/placeholder.jpg'
            alt={`${type}`}
          />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='text-center sm:text-left'>
          <h3 className='text-lg font-semibold'>{name}</h3>
          <p className='text-sm text-muted-foreground'>{role}</p>
          <div className='flex flex-wrap justify-center sm:justify-start space-x-2 mt-2 gap-1'>
            {badges.map((badge: string, index: number) => (
              <Badge key={index}>{badge}</Badge>
            ))}
          </div>
        </div>
      </div>
      {progress.length > 0 && (
        <div className='mt-4'>
          <h4 className='font-semibold mb-2'>Learning Progress</h4>
          {progress.map((item, index) => (
            <div key={index}>
              <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium'>{item.title}</span>
                <span className='text-sm font-medium'>{item.value}%</span>
              </div>
              <Progress
                value={item.value}
                className='w-full'
              />
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
};

type DashboardTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  className?: string;
  rowsPerPage?: number;
};

const DashboardTable = <T extends Record<string, any>>({
  columns,
  data,
  onEdit,
  onDelete,
  className,
  rowsPerPage = 5
}: DashboardTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(
    null
  );
  const [tableData, setTableData] = useState(data); // Maintain table data locally
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return tableData;

    return [...tableData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tableData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (accessor: keyof T) => {
    setSortConfig((prev) =>
      prev?.key === accessor
        ? { key: accessor, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key: accessor, direction: 'asc' }
    );
  };

  const handleDelete = () => {
    if (rowToDelete) {
      const updatedData = tableData.filter((row) => row !== rowToDelete);
      setTableData(updatedData);
      onDelete?.(rowToDelete);
    }
    setRowToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (row: T) => {
    setRowToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<T | null>(null);

  const closeModal = () => {
    setEditingRow(null);
    setIsModalOpen(false);
  };

  const handleEdit = (row: T) => {
    setIsModalOpen(true);
    setEditingRow(row);
  };

  const [selectedRows, setSelectedRows] = useState<Set<T>>(new Set());
  const toggleRowSelection = (row: T) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(row)) {
        newSelection.delete(row);
      } else {
        newSelection.add(row);
      }
      return newSelection;
    });
  };

  const toggleSelectAll = (isSelected: boolean) => {
    setSelectedRows(isSelected ? new Set(paginatedData) : new Set());
  };

  const isAllSelected = selectedRows.size === paginatedData.length && paginatedData.length > 0;

  return (
    <>
      {isModalOpen && editingRow && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className='text-lg font-bold'>Edit Row</h3>
          <div className='mt-4'>
            <p>ID: {editingRow.id}</p>
            <p>Name: {editingRow.name}</p>
            <p>Role: {editingRow.role}</p>
          </div>
          <div className='mt-6 flex justify-end'>
            <Button
              variant='secondary'
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              className='ml-4'
              onClick={() => {
                closeModal();
              }}
            >
              Save
            </Button>
          </div>
        </Modal>
      )}
      {isDeleteModalOpen && rowToDelete && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <h3 className='text-lg font-bold'>Confirm Deletion</h3>
          <p className='mt-4'>
            Are you sure you want to delete <strong>{rowToDelete.name}</strong>?
          </p>
          <div className='mt-6 flex justify-end'>
            <Button
              variant='secondary'
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className='ml-4 text-red-500'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}

      <div className={`overflow-x-auto ${className}`}>
        <ShadTable>
          <TableHeader>
            <TableHead>
              <input
                type='checkbox'
                checked={isAllSelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className='cursor-pointer'
                  onClick={() => col.sortable && handleSort(col.accessor)}
                >
                  <div className='flex items-center'>
                    {col.header}
                    {col.sortable && sortConfig?.key === col.accessor && (
                      <span className='ml-2'>
                        {sortConfig.direction === 'asc' ? (
                          <ChevronUp className='h-4 w-4' />
                        ) : (
                          <ChevronDown className='h-4 w-4' />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <input
                    type='checkbox'
                    checked={selectedRows.has(row)}
                    onChange={() => toggleRowSelection(row)}
                  />
                </TableCell>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </TableCell>
                ))}
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleEdit(row)}
                    >
                      <Edit className='h-4 w-4 text-blue-500' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => openDeleteModal(row)}
                    >
                      <Trash className='h-4 w-4 text-red-500' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadTable>
        <div className='flex justify-between items-center mt-4'>
          <span className='text-sm text-gray-600'>
            Page {currentPage} of {totalPages}
          </span>
          <div className='flex space-x-2'>
            <Button
              variant='ghost'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <Button
              variant='ghost'
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

type DashboardRow = {
  id: number;
  name: string;
  role: string;
  progress: string;
};

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='p-6 rounded shadow-lg w-1/3 bg-muted'>
      {children}
      <button
        className='absolute top-2 right-2 text-gray-500'
        onClick={onClose}
      >
        ×
      </button>
    </div>
  </div>
);

type Tab = 'overview' | 'sessions' | 'resources' | 'messages';

export default function MentorshipDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const newWidth = e.clientX;
    if (newWidth >= 200 && newWidth <= 400) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const columns: TableColumn<DashboardRow>[] = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Role', accessor: 'role' },
    {
      header: 'Progress',
      accessor: 'progress',
      sortable: true,
      render: (value: string | number) =>
        typeof value === 'string' ? (
          <span className='font-medium text-blue-500'>{value}</span>
        ) : (
          <span className='font-medium text-red-500'>{value}</span>
        )
    }
  ];

  const data: DashboardRow[] = [
    { id: 1, name: 'John Doe', role: 'Mentee', progress: '60%' },
    { id: 2, name: 'Jane Smith', role: 'Mentor', progress: '80%' },
    { id: 3, name: 'Alex Johnson', role: 'Mentee', progress: '45%' },
    { id: 4, name: 'Emma Watson', role: 'Mentor', progress: '95%' },
    { id: 5, name: 'Michael Brown', role: 'Mentee', progress: '30%' },
    { id: 6, name: 'Sophia Davis', role: 'Mentor', progress: '70%' }
  ];

  return (
    <div className='flex h-screen bg-background text-foreground'>
      <aside
        style={{
          background: 'var(--background)',
          width: isSidebarCollapsed ? '64px' : `${sidebarWidth}px`
        }}
        className={` transition-all duration-300 bg-white shadow-lg flex flex-col  border-r border-r-grey-500`}
      >
        <div className='flex items-center justify-between px-4 py-3 border-b'>
          <Button
            variant='ghost'
            size='icon'
            className='block'
            style={{ display: 'flex' }}
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          >
            <Menu className='h-5 w-5' />
          </Button>
        </div>
        <nav className='mt-4 flex-grow space-y-2 pr-2'>
          {[
            { tab: 'overview', label: 'Overview', icon: Users },
            { tab: 'sessions', label: 'Sessions', icon: Calendar },
            { tab: 'resources', label: 'Resources', icon: BookOpen },
            { tab: 'messages', label: 'Messages', icon: MessageSquare }
          ].map(({ tab, label, icon: Icon }) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'secondary' : 'ghost'}
              className={`w-full justify-start rounded-lg ${
                activeTab === tab ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab as Tab)}
            >
              <Icon
                className={`h-5 w-5 ${activeTab === tab ? 'text-blue-500' : 'text-gray-500'}`}
              />
              {!isSidebarCollapsed && <span className='ml-2'>{label}</span>}
            </Button>
          ))}
          <Button
            variant='ghost'
            className='w-full justify-start mt-4 hover:bg-gray-100 rounded-lg'
            onClick={() => navigate('/')}
          >
            <LogOut className='h-5 w-5 text-gray-500' />
            {!isSidebarCollapsed && <span className='ml-2'>Log Out</span>}
          </Button>
        </nav>
        {/* Resizable Handle */}
        {!isSidebarCollapsed && (
          <div
            className='w-1 bg-gray-300 cursor-ew-resize hover:bg-gray-500'
            onMouseDown={handleMouseDown}
          />
        )}
      </aside>

      <main className='flex-1 overflow-y-auto'>
        <header className='flex justify-end border-b'>
          <div className='flex items-center justify-between px-4 py-3'>
            <div className='flex items-center space-x-4'>
              <Button
                variant='ghost'
                className='sm:hidden'
                onClick={(prev) => setIsSidebarCollapsed(!prev)}
              >
                <Users className='h-5 w-5' />
              </Button>
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='relative h-8 w-8 rounded-full'
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src='/placeholder-user.jpg'
                        alt='User'
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-56'
                  align='end'
                  forceMount
                >
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>Dr. Jane Doe</p>
                      <p className='text-xs leading-none text-muted-foreground'>
                        jane.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className='mr-2 h-4 w-4' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className='mr-2 h-4 w-4' />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    <LogOut className='mr-2 h-4 w-4' />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className='p-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <ProfileCard
              type='Mentor'
              name='Dr. Jane Doe'
              role='Senior Data Scientist'
              badges={['Machine Learning', 'Python', 'Data Analysis']}
            />
            <ProfileCard
              type='Mentee'
              name='Alex Smith'
              role='Aspiring Data Scientist'
              badges={['Python', 'Statistics']}
              progress={[
                { title: 'Machine Learning Basics', value: 60 },
                { title: 'Data Visualization', value: 75 }
              ]}
            />
          </div>

          {activeTab === 'overview' && (
            <div className='mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <OverviewCard
                title='Total Mentees'
                icon={Users}
                value='12'
                description='+2 from last month'
              />
              <OverviewCard
                title='Upcoming Sessions'
                icon={Calendar}
                value='4'
                description='Next session in 2 days'
              />
              <OverviewCard
                title='Resources Shared'
                icon={BookOpen}
                value='25'
                description='+5 new this week'
              />
              <OverviewCard
                title='Unread Messages'
                icon={MessageSquare}
                value='9'
                description='3 urgent messages'
              />
            </div>
          )}
          {activeTab === 'sessions' && <Card className='mt-6'>Sessions content...</Card>}
          {activeTab === 'resources' && <Card className='mt-6'>Resources content...</Card>}
          {activeTab === 'messages' && <Card className='mt-6'>Messages content...</Card>}
        </div>

        <DashboardTable
          columns={columns}
          data={data}
          onEdit={(row) => console.log('save on db', row)}
          onDelete={(rows) => console.log('Delete:', rows)}
        />
      </main>
    </div>
  );
}
