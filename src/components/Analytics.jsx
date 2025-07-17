import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Download,
  Share2,
  Calendar,
  Filter,
  Image,
  Film,
  Users,
  Clock,
  Star,
  Target
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [contentType, setContentType] = useState('all');

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const stats = [
    {
      label: 'Total Assets Created',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Image,
      color: 'blue'
    },
    {
      label: 'Total Downloads',
      value: '8,934',
      change: '+23%',
      trend: 'up',
      icon: Download,
      color: 'green'
    },
    {
      label: 'Avg. Generation Time',
      value: '2.3s',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      color: 'purple'
    },
    {
      label: 'Success Rate',
      value: '98.7%',
      change: '+2%',
      trend: 'up',
      icon: Target,
      color: 'orange'
    }
  ];

  const topPerformingAssets = [
    {
      id: 1,
      name: 'Holiday Sale Banner',
      type: 'image',
      views: 2847,
      downloads: 234,
      shares: 45,
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: 'Product Launch GIF',
      type: 'gif',
      views: 1923,
      downloads: 189,
      shares: 67,
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      name: 'Social Media Pack',
      type: 'image',
      views: 1756,
      downloads: 156,
      shares: 34,
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 4,
      name: 'Email Header Design',
      type: 'image',
      views: 1234,
      downloads: 98,
      shares: 23,
      rating: 4.6,
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const contentTypeData = [
    { type: 'Images', count: 847, percentage: 68 },
    { type: 'GIFs', count: 234, percentage: 19 },
    { type: 'Banners', count: 166, percentage: 13 }
  ];

  const weeklyData = [
    { day: 'Mon', images: 45, gifs: 12 },
    { day: 'Tue', images: 52, gifs: 18 },
    { day: 'Wed', images: 38, gifs: 8 },
    { day: 'Thu', images: 61, gifs: 22 },
    { day: 'Fri', images: 55, gifs: 15 },
    { day: 'Sat', images: 33, gifs: 9 },
    { day: 'Sun', images: 28, gifs: 6 }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Analytics
              </h1>
              <p className="text-gray-600">
                Track your content performance and generation insights
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === 'up';
            
            return (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Content Generation Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Generation</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Images</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">GIFs</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{day.day}</div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${(day.images / 70) * 100}%` }}
                      ></div>
                      <div
                        className="h-full bg-blue-500 rounded-full absolute top-0"
                        style={{ 
                          left: `${(day.images / 70) * 100}%`,
                          width: `${(day.gifs / 70) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 w-16 text-right">
                      {day.images + day.gifs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Type Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Content Distribution</h2>
            <div className="space-y-4">
              {contentTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-3 ${
                      index === 0 ? 'bg-purple-500' : 
                      index === 1 ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-gray-700 font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${
                          index === 0 ? 'bg-purple-500' : 
                          index === 1 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Assets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Top Performing Assets</h2>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topPerformingAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={asset.thumbnail}
                          alt={asset.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        asset.type === 'image' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {asset.type === 'image' ? (
                          <Image className="w-3 h-3 mr-1" />
                        ) : (
                          <Film className="w-3 h-3 mr-1" />
                        )}
                        {asset.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Eye className="w-4 h-4 mr-1 text-gray-400" />
                        {asset.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Download className="w-4 h-4 mr-1 text-gray-400" />
                        {asset.downloads}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Share2 className="w-4 h-4 mr-1 text-gray-400" />
                        {asset.shares}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {asset.rating}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;