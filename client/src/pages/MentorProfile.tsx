import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Home,
  ChevronRight,
  Zap,
  Star,
  Clock,
  LinkedinIcon,
  MessageSquare,
  Calendar,
  PlayCircle,
  Heart,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';

export default function MentorProfile() {
  return (
    <div className='min-h-screen bg-background'>
      <Header
        isLoggedIn
        title=''
        children={
          <div className=''>
            <div className='container mx-auto px-4'>
              <div className='flex items-center gap-2 h-14 text-sm'>
                <Link
                  to='/'
                  className='hover:opacity-80'
                >
                  <Home className='h-4 w-4' />
                </Link>
                <ChevronRight className='h-4 w-4' />
                <Link
                  to='/mentors'
                  className='hover:opacity-80'
                >
                  Find a Mentor
                </Link>
                <ChevronRight className='h-4 w-4' />
                <span>Dan Carino</span>
              </div>
            </div>
          </div>
        }
      />
      <main className='container mx-auto px-4 py-8'>
        <div className='grid gap-8 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Profile Header */}
            <div className='flex flex-col md:flex-row gap-6 items-start'>
              <div className='relative'>
                <img
                  src='/placeholder.svg'
                  alt='Dan Carino'
                  className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover'
                />
                <Badge
                  variant='secondary'
                  className='absolute -top-2 -right-2 gap-1'
                >
                  <Zap className='w-3 h-3' /> Quick Responder
                </Badge>
              </div>

              <div className='flex-1'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h1 className='text-3xl font-bold'>Dan Carino</h1>
                    <p className='text-lg text-muted-foreground'>
                      Senior Product Designer @ Klarna
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    size='icon'
                  >
                    <LinkedinIcon className='w-5 h-5 text-[#0077b5]' />
                  </Button>
                </div>

                <div className='flex flex-wrap gap-4 mt-4'>
                  <div className='flex items-center gap-1'>
                    <MapPin className='w-4 h-4 text-muted-foreground' />
                    <span>Sweden</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 fill-primary text-primary' />
                    <span className='font-medium'>5.0</span>
                    <Link
                      to='#reviews'
                      className='text-primary hover:underline'
                    >
                      (3 reviews)
                    </Link>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='w-4 h-4 text-muted-foreground' />
                    <span>Usually responds in a few hours</span>
                  </div>
                </div>

                <p className='mt-4'>Let's level up!</p>
              </div>
            </div>

            {/* Skills Section */}
            <div className='mt-8'>
              <h2 className='text-xl font-semibold mb-4'>Skills</h2>
              <div className='flex flex-wrap gap-2'>
                <Badge variant='secondary'>Swedish</Badge>
                <Badge variant='secondary'>E-commerce</Badge>
                <Badge variant='secondary'>Design Strategy</Badge>
                <Badge variant='secondary'>User Experience Design</Badge>
                <Badge variant='secondary'>UX/UI Design</Badge>
                <Button
                  variant='link'
                  className='text-sm h-6'
                >
                  + 7 more
                </Button>
              </div>
            </div>

            {/* About Section */}
            <div className='mt-8'>
              <h2 className='text-xl font-semibold mb-4'>About</h2>
              <div className='prose prose-gray dark:prose-invert'>
                <p>
                  Senior Product Designer with extensive experience in E-commerce and UX/UI Design.
                  I help aspiring designers level up their skills and break into the industry. My
                  mentees have gone on to work at companies like Spotify, Google, and Amazon.
                </p>
                <p>Areas I can help you with:</p>
                <ul>
                  <li>UX/UI Design fundamentals and best practices</li>
                  <li>Portfolio reviews and career guidance</li>
                  <li>Design systems and component libraries</li>
                  <li>User research and testing methodologies</li>
                  <li>Design leadership and team management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-4'>
              <Card>
                <CardHeader>
                  <Tabs
                    defaultValue='plans'
                    className='w-full'
                  >
                    <TabsList className='grid w-full grid-cols-2'>
                      <TabsTrigger value='plans'>Mentorship plans</TabsTrigger>
                      <TabsTrigger value='sessions'>Sessions</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    <div>
                      <div className='flex justify-between items-baseline'>
                        <div className='text-3xl font-bold'>$200</div>
                        <div className='text-muted-foreground'>/ month</div>
                      </div>
                      <p className='mt-2 text-muted-foreground'>
                        For those who want coaching in how to achieve specific career goals or how
                        to reach their potential
                      </p>
                    </div>

                    <div className='space-y-4'>
                      <div className='flex gap-3'>
                        <Calendar className='w-5 h-5 text-primary shrink-0' />
                        <span>2 calls per month (45min/call)</span>
                      </div>
                      <div className='flex gap-3'>
                        <MessageSquare className='w-5 h-5 text-primary shrink-0' />
                        <span>Unlimited Q&A via chat</span>
                      </div>
                      <div className='flex gap-3'>
                        <Clock className='w-5 h-5 text-primary shrink-0' />
                        <span>Expect responses in 24 hours or less</span>
                      </div>
                      <div className='flex gap-3'>
                        <Star className='w-5 h-5 text-primary shrink-0' />
                        <span>Hands-on support</span>
                      </div>
                    </div>

                    <Button
                      className='w-full'
                      size='lg'
                    >
                      Apply now
                    </Button>

                    <p className='text-sm text-center text-muted-foreground'>Only 2 spots left!</p>

                    <div className='flex gap-2 justify-center'>
                      <Button
                        variant='outline'
                        size='sm'
                      >
                        <PlayCircle className='w-4 h-4 mr-2' />
                        Play intro
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                      >
                        <Heart className='w-4 h-4 mr-2' />
                        Save
                      </Button>
                    </div>

                    <div className='text-center'>
                      <Badge
                        variant='secondary'
                        className='bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200'
                      >
                        7-day free trial
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
