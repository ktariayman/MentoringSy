type UserType = 'mentor' | 'mentee' | 'admin';

type User = {
  id: number;
  name: string;
  title: string;
  location: string;
  image: string;
  about: string;
  type: UserType;
};
export type Mentor = User & {
  rating: number;
  reviews: number;
  skills: string[];
  price: number;
  isQuickResponder: boolean;
};

export type Mentee = User & {
  goals: string[];
  mentorshipHistory: string[];
};
