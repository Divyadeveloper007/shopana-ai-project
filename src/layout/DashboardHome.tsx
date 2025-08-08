import React from 'react';
import PostToPlatforms from '../pages/PostToPlatforms';
import SocialMediaManager from '../pages/SocialMediaManager';

interface DashboardHomeProps {
  currentView: string;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ currentView }) => {
  if (currentView === 'home') return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center p-6 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome to AI Creative Studio
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select an option from the sidebar to get started with content creation.
        </p>
      </div>
    </div>
  );

  if (currentView === 'post') return <PostToPlatforms />;
  if (currentView === 'social_media_manager') return <SocialMediaManager />;

  return null;
};

export default DashboardHome;