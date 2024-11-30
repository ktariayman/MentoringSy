import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, ChevronRight, Zap, Star, Clock, LinkedinIcon, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { mentees, mentors } from '@/constants/index.constants';
import { Mentee, Mentor } from '@/ts/indes.types';

export default function MentorProfile() {
  const { id } = useParams<{ id: string }>();

  const type = window.location.pathname.includes('mentor') ? 'mentor' : 'mentee';
  const user =
    type === 'mentor'
      ? mentors.find((mentor) => mentor.id === Number(id))
      : mentees.find((mentee) => mentee.id === Number(id));

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-lg text-muted-foreground'>User not found. Please try again.</p>
      </div>
    );
  }

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
                  to={`/${type}s`}
                  className='hover:opacity-80'
                >
                  Find a {type === 'mentor' ? 'Mentor' : 'Mentee'}
                </Link>
                <ChevronRight className='h-4 w-4' />
                <span>{user.name}</span>
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
                  src={user.image}
                  alt={user.name}
                  className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover'
                />
                {type === 'mentor' && (user as Mentor).isQuickResponder && (
                  <Badge
                    variant='secondary'
                    className='absolute -top-2 -right-2 gap-1'
                  >
                    <Zap className='w-3 h-3' /> Quick Responder
                  </Badge>
                )}
              </div>

              <div className='flex-1'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h1 className='text-3xl font-bold'>{user.name}</h1>
                    <p className='text-lg text-muted-foreground'>{user.title}</p>
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
                    <span>{user.location}</span>
                  </div>
                  {type === 'mentor' && (
                    <>
                      <div className='flex items-center gap-1'>
                        <Star className='w-4 h-4 fill-primary text-primary' />
                        <span className='font-medium'>{(user as Mentor).rating}</span>
                        <Link
                          to='#reviews'
                          className='text-primary hover:underline'
                        >
                          ({(user as Mentor).reviews} reviews)
                        </Link>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4 text-muted-foreground' />
                        <span>Usually responds in a few hours</span>
                      </div>
                    </>
                  )}
                </div>

                <p className='mt-4'>{user.about}</p>
              </div>
            </div>

            {/* Additional Info */}
            {type === 'mentor' ? (
              <div className='mt-8'>
                <h2 className='text-xl font-semibold mb-4'>Skills</h2>
                <div className='flex flex-wrap gap-2'>
                  {(user as Mentor).skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant='secondary'
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className='mt-8'>
                <h2 className='text-xl font-semibold mb-4'>Goals</h2>
                <ul className='list-disc pl-4'>
                  {(user as Mentee).goals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>

                <h2 className='text-xl font-semibold mt-8 mb-4'>Mentorship History</h2>
                <ul className='list-disc pl-4'>
                  {(user as Mentee).mentorshipHistory.map((history) => (
                    <li key={history}>{history}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          {type === 'mentor' && (
            <div className='lg:col-span-1'>
              <Card>
                <CardHeader>
                  <h2 className='text-lg font-semibold'>Mentorship Plan</h2>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='text-3xl font-bold'>${(user as Mentor).price} / month</div>
                    <p>Coaching to achieve specific career goals or reach potential.</p>
                    <Button className='w-full'>Apply now</Button>
                    <p className='text-sm text-muted-foreground'>Only 2 spots left!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
