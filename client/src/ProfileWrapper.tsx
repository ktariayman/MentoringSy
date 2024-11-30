import React from 'react';
import { useParams } from 'react-router-dom';
import MentorProfile from './pages/MentorProfile';

const profileComponentMap: Record<string, React.ComponentType<{ id: string }>> = {
  mentor: MentorProfile,
  mentee: MentorProfile
};

const ProfileWrapper = () => {
  const { type, id } = useParams<{ type: string; id: string }>();

  if (!type || !id) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-lg text-muted-foreground'>Invalid profile type or ID.</p>
      </div>
    );
  }

  const ProfileComponent = profileComponentMap[type];

  if (!ProfileComponent) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-lg text-muted-foreground'>Profile type not recognized.</p>
      </div>
    );
  }

  return <ProfileComponent id={id} />;
};

export default ProfileWrapper;
