import React, { useState } from 'react';
import CreateProject from './CreateProject';
import AssetManager from './AssetManager';
import BrandSetup from './BrandSetup';
import Integrations from './Integrations';
import Analytics from './Analytics';
import { 
  TrendingUp, 
  Image, 
  Zap, 
  Clock,
  Plus,
  Sparkles,
  BarChart3,
  Users,
  Calendar
} from 'lucide-react';
import PromptGenerator from './prompt/PromptGenerator';
import AIImageGeneration from './prompt/AIImageGeneration';
import PosterGenerator from './prompt/PosterGeneration';
import ChatArea from './chat/ChatArea';
import GeneratedGallery from './posts/GeneratedGallery';
import Templates from './templates/Templates';
// import ProfilePage from '../user/ProfilePage';
import SettingsLayout from './settings/SettingsLayout';
import BrandCanvas from './brandCanvas/BrandCanvas';

const DashboardHome = ({ currentView, setCurrentView }) => {
const [subView, setSubView] = useState('prompt'); 



  if (currentView === 'create') {
    if (subView === 'prompt') return <PromptGenerator setSubView={setSubView} />;
    if (subView === 'image') return <AIImageGeneration setSubView={setSubView} />;
    if (subView === 'poster') return <PosterGenerator setSubView={setSubView} />;
  }


  if (currentView === 'assets') return <AssetManager />;
  if (currentView === 'templates') return <Templates />;
  if (currentView === 'brand') return <BrandSetup />;
  if (currentView === 'integrations') return <Integrations />;
  if (currentView === 'analytics') return <Analytics />;
  if (currentView === 'settings') return <SettingsLayout />;
if (currentView === 'gallery') return <GeneratedGallery />;
if (currentView === 'canvas') return <BrandCanvas />;
  // if (currentView === 'settings') return <ProfilePage />;

  // const stats = [
  //   { label: 'Total Assets', value: '1,247', icon: Image, color: 'purple', change: '+12%' },
  //   { label: 'Active Projects', value: '23', icon: Zap, color: 'blue', change: '+5%' },
  //   { label: 'This Month', value: '89', icon: TrendingUp, color: 'green', change: '+23%' },
  //   { label: 'Credits Left', value: '250', icon: Sparkles, color: 'orange', change: '-15%' },
  // ];

  // const recentProjects = [
  //   { id: 1, name: 'Holiday Sale Banner', type: 'Image', status: 'Completed', date: '2 hours ago' },
  //   { id: 2, name: 'Product Launch GIF', type: 'GIF', status: 'Processing', date: '4 hours ago' },
  //   { id: 3, name: 'Social Media Pack', type: 'Batch', status: 'Completed', date: '1 day ago' },
  //   { id: 4, name: 'Instagram Stories', type: 'Template', status: 'Draft', date: '2 days ago' },
  // ];

  // const quickActions = [
  //   { label: 'Create Image', icon: Image, color: 'purple' },
  //   { label: 'Generate GIF', icon: Zap, color: 'blue' },
  //   { label: 'Use Template', icon: Plus, color: 'green' },
  //   { label: 'Batch Create', icon: Sparkles, color: 'orange' },
  // ];

  return (
  // <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
  //   <div className="p-4 sm:p-6 lg:p-8">
  //     {/* Header */}
  //     <div className="mb-8">
  //       <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
  //         Welcome back! 
  //       </h1>
  //       <p className="text-gray-600 dark:text-gray-400">
  //         Here's what's happening with your creative projects today.
  //       </p>
  //     </div>

  //     {/* Stats Grid */}
  //     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
  //       {stats.map((stat, index) => {
  //         const Icon = stat.icon;
  //         return (
  //           <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
  //             <div className="flex items-center justify-between mb-3">
  //               <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
  //                 <Icon className={`w-5 h-5 text-${stat.color}-600`} />
  //               </div>
  //               <span className={`text-xs font-medium px-2 py-1 rounded-full ${
  //                 stat.change.startsWith('+')
  //                   ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
  //                   : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  //               }`}>
  //                 {stat.change}
  //               </span>
  //             </div>
  //             <div>
  //               <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
  //               <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>

  //     {/* Quick Actions */}
  //     <div className="mb-8">
  //       <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
  //       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  //         {quickActions.map((action, index) => {
  //           const Icon = action.icon;
  //           return (
  //             <button
  //               key={index}
  //               className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-left group"
  //             >
  //               <div className={`p-3 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900 mb-3 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-800 transition-colors duration-200`}>
  //                 <Icon className={`w-6 h-6 text-${action.color}-600`} />
  //               </div>
  //               <p className="font-medium text-gray-900 dark:text-white">{action.label}</p>
  //             </button>
  //           );
  //         })}
  //       </div>
  //     </div>

  //     <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
  //       {/* Recent Projects */}
  //       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
  //         <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
  //           <div className="flex items-center justify-between">
  //             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h2>
  //             <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium">
  //               View All
  //             </button>
  //           </div>
  //         </div>
  //         <div className="p-4 sm:p-6">
  //           <div className="space-y-4">
  //             {recentProjects.map((project) => (
  //               <div key={project.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
  //                 <div className="flex items-center space-x-3">
  //                   <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-800 dark:to-blue-800 rounded-lg flex items-center justify-center">
  //                     <Image className="w-5 h-5 text-purple-600 dark:text-purple-300" />
  //                   </div>
  //                   <div>
  //                     <p className="font-medium text-gray-900 dark:text-white text-sm">{project.name}</p>
  //                     <p className="text-xs text-gray-500 dark:text-gray-400">{project.type} • {project.date}</p>
  //                   </div>
  //                 </div>
  //                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
  //                   project.status === 'Completed'
  //                     ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
  //                     : project.status === 'Processing'
  //                     ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
  //                     : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  //                 }`}>
  //                   {project.status}
  //                 </span>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>

  //       {/* Activity Feed */}
  //       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
  //         <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
  //           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Feed</h2>
  //         </div>
  //         <div className="p-4 sm:p-6">
  //           <div className="space-y-4">
  //             {[
  //               {
  //                 icon: <Sparkles className="w-4 h-4 text-green-600" />,
  //                 bg: 'bg-green-100 dark:bg-green-900',
  //                 message: <> <span className="font-medium">Holiday Sale Banner</span> was generated successfully </>,
  //                 time: '2 hours ago'
  //               },
  //               {
  //                 icon: <Users className="w-4 h-4 text-blue-600" />,
  //                 bg: 'bg-blue-100 dark:bg-blue-900',
  //                 message: <> Brand colors updated for <span className="font-medium">Summer Collection</span> </>,
  //                 time: '5 hours ago'
  //               },
  //               {
  //                 icon: <Calendar className="w-4 h-4 text-purple-600" />,
  //                 bg: 'bg-purple-100 dark:bg-purple-900',
  //                 message: <> Scheduled <span className="font-medium">Instagram posts</span> for next week </>,
  //                 time: '1 day ago'
  //               },
  //               {
  //                 icon: <BarChart3 className="w-4 h-4 text-orange-600" />,
  //                 bg: 'bg-orange-100 dark:bg-orange-900',
  //                 message: <> Monthly report generated with <span className="font-medium">89 assets</span> created </>,
  //                 time: '2 days ago'
  //               }
  //             ].map((item, i) => (
  //               <div key={i} className="flex items-start space-x-3">
  //                 <div className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center`}>
  //                   {item.icon}
  //                 </div>
  //                 <div className="flex-1">
  //                   <p className="text-sm text-gray-900 dark:text-white">
  //                     {item.message}
  //                   </p>
  //                   <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>



<>

 <div className="h-full w-full">
    <ChatArea setCurrentView ={setCurrentView }/>
  </div>
</>
);

};

export default DashboardHome;