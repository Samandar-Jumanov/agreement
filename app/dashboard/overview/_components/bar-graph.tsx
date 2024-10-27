import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { CheckCircle2, Circle, Clock, Calendar, Users, Package, AlertCircle } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
}

interface Deliverable {
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  team: TeamMember[];
  deliverables: Deliverable[];
  completion?: number;
}

interface TimelineData {
  current: TimelineEvent[];
  upcoming: TimelineEvent[];
}

type TabType = 'current' | 'upcoming';

const projectData: TimelineData = {
  current: [
    {
      id: '1',
      date: "2024-04-15",
      title: "Project Kickoff",
      status: "completed",
      description: "Initial requirements gathering and project setup",
      completion: 100,
      team: [
        { name: "John Doe", role: "Product Owner" },
        { name: "Sarah Smith", role: "Tech Lead" },
      ],
      deliverables: [
        { name: "Project Charter", status: "completed" },
        { name: "Requirements Doc", status: "completed" },
      ]
    },
    {
      id: '2',
      date: "2024-05-01",
      title: "Design Phase",
      status: "completed",
      description: "UI/UX design approval and finalization",
      completion: 100,
      team: [
        { name: "Mike Johnson", role: "UI Designer" },
        { name: "Emily Brown", role: "UX Researcher" },
      ],
      deliverables: [
        { name: "Wireframes", status: "completed" },
        { name: "Design System", status: "completed" },
      ]
    },
    {
      id: '3',
      date: "2024-05-15",
      title: "Development",
      status: "in-progress",
      description: "Frontend implementation in progress",
      completion: 65,
      team: [
        { name: "Alex Wilson", role: "Frontend Dev" },
        { name: "Chris Lee", role: "Backend Dev" },
      ],
      deliverables: [
        { name: "Sprint 1 Features", status: "in-progress" },
        { name: "API Documentation", status: "pending" },
      ]
    },
    {
      id: '4',
      date: "2024-05-30",
      title: "Testing",
      status: "upcoming",
      description: "Quality assurance and bug fixes",
      completion: 0,
      team: [
        { name: "Lisa Chen", role: "QA Lead" },
        { name: "Tom Harris", role: "Dev Team" },
      ],
      deliverables: [
        { name: "Test Cases", status: "pending" },
        { name: "Bug Reports", status: "pending" },
      ]
    },
    {
      id: '5',
      date: "2024-06-15",
      title: "Deployment",
      status: "upcoming",
      description: "Production deployment and launch",
      completion: 0,
      team: [
        { name: "David Kim", role: "DevOps" },
        { name: "Rachel Green", role: "Release Manager" },
      ],
      deliverables: [
        { name: "Release Notes", status: "pending" },
        { name: "Documentation", status: "pending" },
      ]
    }
  ],
  upcoming: [
    {
      id: '6',
      date: "2024-06-30",
      title: "Phase 2 Planning",
      status: "upcoming",
      description: "Planning meeting for next phase",
      team: [
        { name: "Full Team", role: "All Hands" },
      ],
      deliverables: [
        { name: "Phase 2 Roadmap", status: "pending" },
        { name: "Resource Plan", status: "pending" },
      ]
    },
    {
      id: '7',
      date: "2024-07-15",
      title: "Feature Enhancement",
      status: "upcoming",
      description: "Additional features implementation",
      team: [
        { name: "Development Team", role: "Engineers" },
      ],
      deliverables: [
        { name: "Enhanced Features", status: "pending" },
        { name: "Technical Specs", status: "pending" },
      ]
    },
    {
      id: '8',
      date: "2024-07-30",
      title: "Performance Optimization",
      status: "upcoming",
      description: "System optimization and scaling",
      team: [
        { name: "Backend Team", role: "Engineers" },
        { name: "DevOps", role: "Operations" },
      ],
      deliverables: [
        { name: "Performance Metrics", status: "pending" },
        { name: "Optimization Report", status: "pending" },
      ]
    }
  ]
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-md transition-all duration-300
      ${active 
        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
        : 'hover:bg-background hover:shadow-md'}
    `}
  >
    {children}
  </button>
);

const StatusIcon: React.FC<{ status: TimelineEvent['status']; className?: string }> = ({ status, className }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className={className} />;
    case 'in-progress':
      return <Clock className={className} />;
    default:
      return <Circle className={className} />;
  }
};

const DeliverableBadge: React.FC<{ deliverable: Deliverable }> = ({ deliverable }) => {
  const getStatusColor = (status: Deliverable['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <span className={`
      px-2 py-1 text-xs rounded-full border
      ${getStatusColor(deliverable.status)}
    `}>
      {deliverable.name}
    </span>
  );
};

const ProjectTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('current');
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: TimelineEvent['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-200';
    }
  };

  const getProgressColor = (completion: number): string => {
    if (completion >= 75) return 'bg-green-500';
    if (completion >= 50) return 'bg-blue-500';
    if (completion >= 25) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <Card className="w-full bg-background shadow-xl">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Project Timeline
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Track project progress and upcoming milestones
            </p>
          </div>
          <div className="flex gap-2 p-1.5 bg-muted/50 backdrop-blur-sm rounded-lg shadow-inner">
            <TabButton
              active={activeTab === 'current'}
              onClick={() => setActiveTab('current')}
            >
              Current Sprint
            </TabButton>
            <TabButton
              active={activeTab === 'upcoming'}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </TabButton>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8 overflow-x-auto">
        <div className="relative min-w-[800px]">
          <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full" />
          <div className="relative flex justify-between pb-6">
            {projectData[activeTab].map((event, index) => (
              <div
                key={event.id}
                className="flex flex-col items-center px-4 group"
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className="relative">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${getStatusColor(event.status)}
                    transition-all duration-300 ease-in-out
                    ${hoveredEvent === event.id ? 'scale-110 shadow-lg' : ''}
                  `}>
                    <StatusIcon status={event.status} className="w-6 h-6 text-white" />
                  </div>
                  {event.status === 'in-progress' && event.completion && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge variant="outline" className="text-xs">
                        {event.completion}%
                      </Badge>
                    </div>
                  )}
                </div>
                <div className={`
                  mt-6 text-center space-y-3 p-4 rounded-xl w-[220px]
                  transition-all duration-300 ease-in-out
                  ${hoveredEvent === event.id 
                    ? 'bg-muted/80 shadow-lg -translate-y-1 backdrop-blur-sm' 
                    : 'bg-transparent'}
                `}>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg leading-none">
                      {event.title}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {formatDate(event.date)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>

                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-xs font-medium mb-2">
                      <Users className="w-4 h-4" />
                      Team
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {event.team.map((member, i) => (
                        <Tooltip key={i} >
                          <Badge variant="secondary" className="text-xs cursor-help">
                            {member.name}
                          </Badge>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-xs font-medium mb-2">
                      <Package className="w-4 h-4" />
                      Deliverables
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {event.deliverables.map((deliverable, i) => (
                        <DeliverableBadge key={i} deliverable={deliverable} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTimeline;