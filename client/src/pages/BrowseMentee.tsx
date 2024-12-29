import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { mentees } from '@/constants';

export default function MenteeBrowse() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFields, setSelectedFields] = React.useState<string[]>([]);

  const fields = [
    { name: 'Software Engineering', count: 50 },
    { name: 'Design', count: 30 },
    { name: 'Project Management', count: 25 },
    { name: 'Business Strategy', count: 20 },
    { name: 'Data Science', count: 15 }
  ];

  const navigate = useNavigate();

  const MenteeCard = ({ mentee }: any) => (
    <Card className='w-full hover:shadow-md transition-shadow'>
      <CardContent className='flex gap-4 p-4'>
        <img
          src={mentee.image}
          alt={mentee.name}
          className='w-24 h-24 rounded-full object-cover'
        />
        <div className='flex-1'>
          <h3 className='text-lg font-semibold'>{mentee.name}</h3>
          <p className='text-sm text-muted-foreground'>{mentee.field}</p>
          <div className='mt-4 flex items-center justify-between'>
            <Button onClick={() => navigate(`/mentees/${mentee.id}`)}>View Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            <h1 className='text-xl font-bold'>Browse Mentees</h1>
            <div className='flex-1 max-w-xl mx-4'>
              <Input
                type='search'
                placeholder='Search mentees...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-6'>
        <div className='flex gap-6'>
          <aside className='w-64 shrink-0'>
            <div className='space-y-6'>
              <div>
                <h2 className='font-semibold mb-4'>Fields of Interest</h2>
                <div className='space-y-2'>
                  {fields.map((field) => (
                    <div
                      key={field.name}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox
                        id={field.name}
                        checked={selectedFields.includes(field.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFields([...selectedFields, field.name]);
                          } else {
                            setSelectedFields(selectedFields.filter((f) => f !== field.name));
                          }
                        }}
                      />
                      <label
                        htmlFor={field.name}
                        className='flex flex-1 justify-between text-sm'
                      >
                        {field.name}
                        <span className='text-muted-foreground'>{field.count}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className='flex-1 max-w-3xl'>
            <div className='space-y-4'>
              {mentees.map((mentee) => (
                <MenteeCard
                  key={mentee.id}
                  mentee={mentee}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
