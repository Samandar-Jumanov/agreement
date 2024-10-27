"use client"

// overview-page.tsx
import React, { useMemo } from 'react';
import { AreaGraph } from './area-graph';
import ProjectTimeline  from './bar-graph';
import { PieGraph } from './pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { RecentClients } from './recent-clients';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Users, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { MetricCardProps } from './types';

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export interface Agreement {
  id: string;
  clientName: string;
  type: string;
  startDate: Date;
  endDate: Date;
  value: number;
  status: 'draft' | 'active' | 'expired' | 'terminated';
}

export interface AgreementFormData {
  clientName: string;
  type: string;
  startDate: Date;
  endDate: Date;
  value: number;
  terms: string;
  notes?: string;
}

const OVERVIEW_CARDS: MetricCardProps[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    Icon: DollarSign,
  },
  {
    title: 'Clients',
    value: '+2350',
    change: '+180.1% from last month',
    Icon: Users,
  },
  {
    title: 'Agreements',
    value: '+573',
    change: '+201 since last check',
    Icon: FileText,
  },
  {
    title: 'We owe you ',
    value: '$45,231.89',
    change: '299$ last withdraw from last month',
    Icon: FileText,
  },
];

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

const OverviewPage: React.FC = () => {
  const router = useRouter();

  const metricCards = useMemo(() => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {OVERVIEW_CARDS.map((card, index) => (
        <MetricCard key={index} {...card} />
      ))}
    </div>
  ), []);

  const graphsSection = useMemo(() => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-4">
        <ProjectTimeline />
      </div>
      <Card className="col-span-4 md:col-span-3">
        <CardHeader>
          <CardTitle>Recent clients </CardTitle>
          <CardDescription>The last clients you worked with</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentClients />
        </CardContent>
      </Card>
      <div className="col-span-4">
        <AreaGraph />
      </div>
      <div className="col-span-4 md:col-span-3">
        <PieGraph />
      </div>
    </div>
  ), []);

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button onClick={() => router.push('/agreements/new')}>
              Add new agreement
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
        
          <TabsContent value="overview" className="space-y-4">
            {metricCards}
            {graphsSection}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default OverviewPage;