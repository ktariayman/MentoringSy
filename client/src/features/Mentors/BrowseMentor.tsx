import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Zap, Search, ChevronDown, Ship } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { mentors } from '@/constants';
import MentorCard from './components/MentorCard';

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

  // const mentors = [
  //   {
  //     id: 1,
  //     name: 'Dan Carino',
  //     title: 'Senior Product Designer @ Klarna',
  //     location: 'Sweden',
  //     rating: 5.0,
  //     reviews: 3,
  //     image: '/placeholder.svg',
  //     skills: ['Swedish', 'E-commerce', 'Design Strategy', 'UX/UI Design'],
  //     price: 200,
  //     isQuickResponder: true,
  //     about: 'Senior Product Designer with expertise in E-commerce and UX/UI Design'
  //   },
  //   {
  //     id: 2,
  //     name: 'Pedro Proenca',
  //     title: 'Engineering Manager at Meta',
  //     location: 'Portugal',
  //     rating: 5.0,
  //     reviews: 12,
  //     image: '/placeholder.svg',
  //     skills: ['Engineering Management', 'Team Leadership', 'Product Strategy'],
  //     price: 200,
  //     isQuickResponder: true,
  //     about:
  //       '12 years of experiences in building high-performing teams and products from the ground up'
  //   }
  // ];

  const mentorCategories = [
    'Engineering Mentors',
    'Design Mentors',
    'Startup Mentors',
    'Product Managers',
    'Leadership Mentors',
    'Career Coaches',
    'Top Mentors'
  ];

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
