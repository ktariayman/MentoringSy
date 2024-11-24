import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Star,
  Zap,
  Clock,
  MessageSquare,
  Calendar,
  LinkedinIcon,
  Search,
  ChevronDown,
  Ship
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export default function MentorBrowse() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCompany, setSelectedCompany] = React.useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);

  const companies = [
    { name: 'Amazon', count: 46 },
    { name: 'Microsoft', count: 44 },
    { name: 'Google', count: 35 },
    { name: 'Meta', count: 17 },
    { name: 'Freelance', count: 9 }
  ];

  const skills = [
    { name: 'Web Development', count: 527 },
    { name: 'Product Management', count: 448 },
    { name: 'Design Strategy', count: 376 },
    { name: 'UX/UI Design', count: 362 },
    { name: 'Data Engineering', count: 361 }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dan Carino',
      title: 'Senior Product Designer @ Klarna',
      location: 'Sweden',
      rating: 5.0,
      reviews: 3,
      image: '/placeholder.svg',
      skills: ['Swedish', 'E-commerce', 'Design Strategy', 'UX/UI Design'],
      price: 200,
      isQuickResponder: true,
      about: 'Senior Product Designer with expertise in E-commerce and UX/UI Design'
    },
    {
      id: 2,
      name: 'Pedro Proenca',
      title: 'Engineering Manager at Meta',
      location: 'Portugal',
      rating: 5.0,
      reviews: 12,
      image: '/placeholder.svg',
      skills: ['Engineering Management', 'Team Leadership', 'Product Strategy'],
      price: 200,
      isQuickResponder: true,
      about:
        '12 years of experiences in building high-performing teams and products from the ground up'
    }
  ];

  const mentorCategories = [
    'Engineering Mentors',
    'Design Mentors',
    'Startup Mentors',
    'Product Managers',
    'Leadership Mentors',
    'Career Coaches',
    'Top Mentors'
  ];

  const MentorCard = ({ mentor }: any) => (
    <Card className='w-full hover:shadow-md transition-shadow'>
      <CardContent className='flex gap-4 p-4'>
        <img
          src={mentor.image}
          alt={mentor.name}
          className='w-24 h-24 rounded-full object-cover'
        />
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h3 className='text-lg font-semibold'>{mentor.name}</h3>
            {mentor.isQuickResponder && (
              <Badge
                variant='secondary'
                className='gap-1'
              >
                <Zap className='w-3 h-3' /> Quick Responder
              </Badge>
            )}
          </div>
          <p className='text-sm text-muted-foreground'>{mentor.title}</p>
          <div className='flex items-center gap-1 mt-1'>
            <Star className='w-4 h-4 fill-primary text-primary' />
            <span className='text-sm font-medium'>{mentor.rating}</span>
            <span className='text-sm text-muted-foreground'>({mentor.reviews} reviews)</span>
          </div>
          <div className='flex flex-wrap gap-1 mt-2'>
            {mentor.skills.map((skill: any) => (
              <Badge
                variant='outline'
                key={skill}
              >
                {skill}
              </Badge>
            ))}
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <div>
              <p className='text-sm text-muted-foreground'>Starting from</p>
              <p className='text-lg font-bold'>${mentor.price} / month</p>
            </div>
            <Button onClick={() => navigate(`/mentors/${mentor.id}`)}>View Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MentorProfile = ({ mentor }: any) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='w-full p-0 h-auto hover:bg-transparent'
        >
          <Card className='w-full hover:shadow-md transition-shadow'>
            <CardContent className='flex gap-4 p-4'>
              <img
                src={mentor.image}
                alt={mentor.name}
                className='w-24 h-24 rounded-full object-cover'
              />
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <h3 className='text-lg font-semibold'>{mentor.name}</h3>
                  {mentor.isQuickResponder && (
                    <Badge
                      variant='secondary'
                      className='gap-1'
                    >
                      <Zap className='w-3 h-3' /> Quick Responder
                    </Badge>
                  )}
                </div>
                <p className='text-sm text-muted-foreground'>{mentor.title}</p>
                <div className='flex items-center gap-1 mt-1'>
                  <Star className='w-4 h-4 fill-primary text-primary' />
                  <span className='text-sm font-medium'>{mentor.rating}</span>
                  <span className='text-sm text-muted-foreground'>({mentor.reviews} reviews)</span>
                </div>
                <div className='flex flex-wrap gap-1 mt-2'>
                  {mentor.skills.map((skill: any) => (
                    <Badge
                      variant='outline'
                      key={skill}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className='mt-4 flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Starting from</p>
                    <p className='text-lg font-bold'>${mentor.price} / month</p>
                  </div>
                  <Button>View Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Mentor Profile</DialogTitle>
          <DialogDescription>Connect with {mentor.name}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4'>
          <div className='flex items-start gap-4'>
            <img
              src={mentor.image}
              alt={mentor.name}
              className='w-32 h-32 rounded-full object-cover'
            />
            <div>
              <div className='flex items-center gap-2'>
                <h2 className='text-2xl font-bold'>{mentor.name}</h2>
                <LinkedinIcon className='w-5 h-5 text-[#0077b5]' />
              </div>
              <p className='text-muted-foreground'>{mentor.title}</p>
              <div className='flex items-center gap-2 mt-2'>
                <Badge
                  variant='secondary'
                  className='gap-1'
                >
                  <Clock className='w-3 h-3' /> Active yesterday
                </Badge>
                {mentor.isQuickResponder && (
                  <Badge
                    variant='secondary'
                    className='gap-1'
                  >
                    <Zap className='w-3 h-3' /> Quick Responder
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue='plans'>
            <TabsList>
              <TabsTrigger value='plans'>Mentorship plans</TabsTrigger>
              <TabsTrigger value='sessions'>Sessions</TabsTrigger>
            </TabsList>
            <TabsContent value='plans'>
              <Card>
                <CardHeader>
                  <CardTitle>Standard Plan</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='text-3xl font-bold'>${mentor.price} / month</div>
                  <p>
                    For those who want coaching in how to achieve specific career goals or how to
                    reach their potential
                  </p>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4' />
                      <span>2 calls per month (45min/call)</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <MessageSquare className='w-4 h-4' />
                      <span>Unlimited Q&A via chat</span>
                    </div>
                  </div>
                  <Button className='w-full'>Apply now</Button>
                  <p className='text-sm text-center text-muted-foreground'>Only 2 spots left!</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );

  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center gap-2'>
              <Ship className='h-8 w-8 text-primary' />
              <span className='text-xl font-bold'>MentoringSy</span>
            </div>

            <div className='flex-1 max-w-xl mx-4'>
              <div className='relative'>
                <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search...'
                  className='pl-8'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='gap-1'
                  >
                    For Businesses <ChevronDown className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Enterprise Solutions</DropdownMenuItem>
                  <DropdownMenuItem>Team Training</DropdownMenuItem>
                  <DropdownMenuItem>Corporate Programs</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>Browse all mentors</Button>
              <Button
                variant='ghost'
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                Dashboard
              </Button>
            </div>
          </div>

          <nav className='flex items-center gap-6 h-12 overflow-x-auto no-scrollbar'>
            {mentorCategories.map((category) => (
              <Button
                key={category}
                variant='ghost'
                className='text-sm font-medium hover:text-primary'
              >
                {category}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className='container mx-auto px-4 py-6'>
        <div className='flex gap-6'>
          <aside className='w-64 shrink-0'>
            <div className='sticky top-6 space-y-6'>
              <div>
                <h2 className='font-semibold mb-4'>Companies</h2>
                <div className='space-y-2'>
                  {companies.map((company) => (
                    <div
                      key={company.name}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox
                        id={company.name}
                        checked={selectedCompany.includes(company.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCompany([...selectedCompany, company.name]);
                          } else {
                            setSelectedCompany(selectedCompany.filter((c) => c !== company.name));
                          }
                        }}
                      />
                      <label
                        htmlFor={company.name}
                        className='flex flex-1 items-center justify-between text-sm'
                      >
                        {company.name}
                        <span className='text-muted-foreground'>{company.count}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className='font-semibold mb-4'>Skills</h2>
                <div className='space-y-2'>
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox
                        id={skill.name}
                        checked={selectedSkills.includes(skill.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSkills([...selectedSkills, skill.name]);
                          } else {
                            setSelectedSkills(selectedSkills.filter((s) => s !== skill.name));
                          }
                        }}
                      />
                      <label
                        htmlFor={skill.name}
                        className='flex flex-1 items-center justify-between text-sm'
                      >
                        {skill.name}
                        <span className='text-muted-foreground'>{skill.count}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* <div className='flex-1 max-w-3xl'>
            <div className='space-y-4'>
              {mentors.map((mentor) => (
                <MentorProfile
                  key={mentor.id}
                  mentor={mentor}
                />
              ))}
            </div>
          </div> */}
          <div className='flex-1 max-w-3xl'>
            <div className='space-y-4'>
              {mentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
