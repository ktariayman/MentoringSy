'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, MessageSquare, Search, BookOpen, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/mode-toggle';

export default function MenteeDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const MenteeProfile = () => (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Your learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-4'>
          <Avatar className='h-20 w-20'>
            <AvatarImage
              src='/placeholder-mentee.jpg'
              alt='Alex Smith'
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='text-lg font-semibold'>Alex Smith</h3>
            <p className='text-sm text-muted-foreground'>Aspiring Data Scientist</p>
            <div className='flex space-x-2 mt-2'>
              <Badge variant='outline'>Python</Badge>
              <Badge variant='outline'>Statistics</Badge>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <h4 className='font-semibold mb-2'>Learning Progress</h4>
          <div className='space-y-2'>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium'>Machine Learning Basics</span>
                <span className='text-sm font-medium'>60%</span>
              </div>
              <Progress
                value={60}
                className='w-full'
              />
            </div>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium'>Data Visualization</span>
                <span className='text-sm font-medium'>75%</span>
              </div>
              <Progress
                value={75}
                className='w-full'
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MentorCard = ({ name, title, skills, availability }: any) => (
    <Card className='mb-4'>
      <CardContent className='flex items-center space-x-4 pt-6'>
        <Avatar className='h-16 w-16'>
          <AvatarImage
            src={`/placeholder-${name.toLowerCase().replace(' ', '-')}.jpg`}
            alt={name}
          />
          <AvatarFallback>
            {name
              .split(' ')
              .map((n: any) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold'>{name}</h3>
          <p className='text-sm text-muted-foreground'>{title}</p>
          <div className='flex flex-wrap gap-2 mt-2'>
            {skills.map((skill: any) => (
              <Badge
                key={skill}
                variant='secondary'
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className='text-right'>
          <p className='text-sm font-medium'>Availability</p>
          <p className='text-sm text-muted-foreground'>{availability}</p>
          <Button
            className='mt-2'
            size='sm'
          >
            Request Mentorship
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const mentors = [
    {
      name: 'Dr. Jane Doe',
      title: 'Senior Data Scientist',
      skills: ['Machine Learning', 'Python', 'Data Analysis'],
      availability: '2 slots/week'
    },
    {
      name: 'John Smith',
      title: 'AI Research Engineer',
      skills: ['Deep Learning', 'TensorFlow', 'Computer Vision'],
      availability: '3 slots/week'
    },
    {
      name: 'Emily Chen',
      title: 'Data Engineering Manager',
      skills: ['Big Data', 'SQL', 'Apache Spark'],
      availability: '1 slot/week'
    },
    {
      name: 'Michael Johnson',
      title: 'Full Stack Developer',
      skills: ['JavaScript', 'React', 'Node.js'],
      availability: '4 slots/week'
    },
    {
      name: 'Sarah Brown',
      title: 'UX Research Lead',
      skills: ['User Research', 'Prototyping', 'Data Visualization'],
      availability: '2 slots/week'
    }
  ];

  return (
    <div className='flex h-screen bg-background text-foreground'>
      {/* Sidebar */}
      <aside className='w-64 border-r'>
        <div className='p-4'>
          <h1 className='text-2xl font-bold'>MentorMatch</h1>
        </div>
        <nav className='mt-6'>
          <Button
            variant='ghost'
            className='w-full justify-start'
          >
            <User className='mr-2 h-4 w-4' />
            My Profile
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start'
          >
            <Calendar className='mr-2 h-4 w-4' />
            Sessions
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start'
          >
            <BookOpen className='mr-2 h-4 w-4' />
            Resources
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start'
          >
            <MessageSquare className='mr-2 h-4 w-4' />
            Messages
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <main className='flex-1 overflow-y-auto'>
        <header className='border-b sticky top-0 bg-background z-10'>
          <div className='flex items-center justify-between px-4 py-3'>
            <div className='flex-1 max-w-md'>
              <div className='relative'>
                <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search for mentors...'
                  className='pl-8'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='relative h-8 w-8 rounded-full'
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src='/placeholder-mentee.jpg'
                        alt='Alex Smith'
                      />
                      <AvatarFallback>AS</AvatarFallback>
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
                      <p className='text-sm font-medium leading-none'>Alex Smith</p>
                      <p className='text-xs leading-none text-muted-foreground'>
                        alex.smith@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className='mr-2 h-4 w-4' />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className='p-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <MenteeProfile />
            <Card>
              <CardHeader>
                <CardTitle>Your Mentorship Journey</CardTitle>
                <CardDescription>Track your progress and upcoming sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue='upcoming'
                  className='w-full'
                >
                  <TabsList>
                    <TabsTrigger value='upcoming'>Upcoming Sessions</TabsTrigger>
                    <TabsTrigger value='past'>Past Sessions</TabsTrigger>
                  </TabsList>
                  <TabsContent value='upcoming'>
                    <p>You have 2 upcoming sessions this week.</p>
                  </TabsContent>
                  <TabsContent value='past'>
                    <p>You've completed 5 sessions this month.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <h2 className='text-2xl font-bold mt-8 mb-4'>Available Mentors</h2>
          <ScrollArea className='h-[calc(100vh-400px)]'>
            {mentors
              .filter(
                (mentor) =>
                  mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  mentor.skills.some((skill) =>
                    skill.toLowerCase().includes(searchQuery.toLowerCase())
                  )
              )
              .map((mentor) => (
                <MentorCard
                  key={mentor.name}
                  {...mentor}
                />
              ))}
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
