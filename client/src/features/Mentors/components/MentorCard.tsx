import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Mentor } from '@/ts/indes.types';

type Props = {
  mentor: Mentor;
};
export default function MentorCard({ mentor }: Props) {
  const navigate = useNavigate();

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="flex gap-4 p-4">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{mentor.name}</h3>
            {mentor.isQuickResponder && (
              <Badge variant="secondary" className="gap-1">
                <Zap className="w-3 h-3" /> Quick Responder
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{mentor.title}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{mentor.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({mentor.reviews} reviews)
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {mentor.skills.map((skill: any) => (
              <Badge variant="outline" key={skill}>
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-lg font-bold">${mentor.price} / month</p>
            </div>
            <Button onClick={() => navigate(`/mentors/${mentor.id}`)}>
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
