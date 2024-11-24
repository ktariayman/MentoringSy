import { Mentor } from '@/ts/indes.types';

export const SECOND = 1000;

export const mentors: Mentor[] = [
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
    about: 'Senior Product Designer with extensive experience in E-commerce and UX/UI Design.'
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
      '12 years of experience in building high-performing teams and products from the ground up.'
  }
];
