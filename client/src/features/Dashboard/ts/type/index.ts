export type Tab = 'overview' | 'sessions' | 'resources' | 'mentors';
export type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
};

export type DashboardRow = {
  id: number;
  name: string;
  role: string;
  progress: string;
};

export type TabItem = {
  tab: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
};
