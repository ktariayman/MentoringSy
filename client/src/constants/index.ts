import { Mentee, Mentor } from '@/ts/indes.types';

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
    about: 'Senior Product Designer with extensive experience in E-commerce and UX/UI Design.',
    type: 'mentor'
  },
  {
    id: 2,
    name: 'Pedro Proenca',
    title: 'Engineering Manager @ Meta',
    location: 'Portugal',
    rating: 5.0,
    reviews: 12,
    image: '/placeholder.svg',
    skills: ['Engineering Management', 'Team Leadership', 'Product Strategy'],
    price: 250,
    isQuickResponder: true,
    about: '12 years of experience building high-performing teams and products from scratch.',
    type: 'mentor'
  },
  {
    id: 3,
    name: 'Sophia Alvarez',
    title: 'Data Scientist @ Amazon',
    location: 'Spain',
    rating: 4.8,
    reviews: 9,
    image: '/placeholder.svg',
    skills: ['Machine Learning', 'Data Analysis', 'Python', 'Deep Learning'],
    price: 220,
    isQuickResponder: false,
    about: 'Passionate about data-driven decision-making and mentoring aspiring data scientists.',
    type: 'mentor'
  },
  {
    id: 4,
    name: 'Emily Roberts',
    title: 'Full Stack Developer @ Google',
    location: 'USA',
    rating: 4.9,
    reviews: 15,
    image: '/placeholder.svg',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    price: 180,
    isQuickResponder: true,
    about: 'Helping developers master modern web technologies and build scalable applications.',
    type: 'mentor'
  },
  {
    id: 5,
    name: 'Hiro Tanaka',
    title: 'Product Manager @ Sony',
    location: 'Japan',
    rating: 4.7,
    reviews: 8,
    image: '/placeholder.svg',
    skills: ['Product Roadmapping', 'Agile Methodologies', 'Team Collaboration'],
    price: 210,
    isQuickResponder: true,
    about: 'Dedicated to guiding aspiring product managers towards successful careers.',
    type: 'mentor'
  }
];

export const mentees: Mentee[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    title: 'Aspiring UX Designer',
    location: 'USA',
    image: '/placeholder.svg',
    goals: ['Learn UX design', 'Build a strong portfolio', 'Get hired at a top company'],
    mentorshipHistory: ['Worked with John Smith, Senior UX Designer at Google'],
    about: 'An aspiring UX designer passionate about creating intuitive user experiences.',
    type: 'mentee'
  },
  {
    id: 2,
    name: 'Liam Brown',
    title: 'Junior Front-End Developer',
    location: 'UK',
    image: '/placeholder.svg',
    goals: [
      'Master React.js',
      'Build scalable web applications',
      'Contribute to open-source projects'
    ],
    mentorshipHistory: ['Mentored by Emily Roberts, Full Stack Developer at Google'],
    about: 'Excited about front-end technologies and contributing to impactful projects.',
    type: 'mentee'
  },
  {
    id: 3,
    name: 'Evelyn Smith',
    title: 'Data Enthusiast',
    location: 'Canada',
    image: '/placeholder.svg',
    goals: [
      'Learn Python for data analysis',
      'Understand machine learning basics',
      'Build data-driven dashboards'
    ],
    mentorshipHistory: ['Guided by Sophia Alvarez, Data Scientist at Amazon'],
    about: 'Exploring the world of data and seeking to unlock insights through analytics.',
    type: 'mentee'
  },
  {
    id: 4,
    name: 'Noah Kim',
    title: 'Aspiring Product Manager',
    location: 'South Korea',
    image: '/placeholder.svg',
    goals: ['Understand Agile methodologies', 'Master product roadmapping', 'Lead a product team'],
    mentorshipHistory: ['Coached by Hiro Tanaka, Product Manager at Sony'],
    about: 'Eager to transition into product management and lead innovative projects.',
    type: 'mentee'
  },
  {
    id: 5,
    name: 'Sophia Martinez',
    title: 'Junior Developer',
    location: 'Mexico',
    image: '/placeholder.svg',
    goals: ['Improve coding skills', 'Learn TypeScript', 'Contribute to an international team'],
    mentorshipHistory: ['Worked with Pedro Proenca, Engineering Manager at Meta'],
    about: 'Passionate about software development and building meaningful applications.',
    type: 'mentee'
  }
];

export const loggedInUser: Mentor | Mentee = {
  id: 1,
  name: 'Dan Carino',
  title: 'Senior Product Designer @ Klarna',
  location: 'Sweden',
  image: '/placeholder.svg',
  about: 'Senior Product Designer with extensive experience in E-commerce and UX/UI Design.',
  type: 'mentor',
  rating: 5.0,
  reviews: 3,
  skills: ['Swedish', 'E-commerce', 'Design Strategy', 'UX/UI Design'],
  price: 200,
  isQuickResponder: true
};
