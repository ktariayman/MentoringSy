import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default OverviewCard;
