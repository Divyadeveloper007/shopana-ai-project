import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Download, 
  Share2, 
  Trash2,
  Star,
  Image,
  Film,
  Calendar,
  Tag,
  Eye,
  MoreHorizontal
} from 'lucide-react';

const AssetManager = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAssets, setSelectedAssets] = useState([]);

  const assets = [
    {
      id: 1,
      name: 'Holiday Sale Banner',
      type: 'image',
      size: '1920x1080',
      date: '2024-01-15',
      tags: ['holiday', 'sale', 'banner'],
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: true,
      downloads: 23
    },
    {
      id: 2,
      name: 'Product Launch GIF',
      type: 'gif',
      size: '800x600',
      date: '2024-01-14',
      tags: ['product', 'launch', 'animation'],
      url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: false,
      downloads: 15
    },
    {
      id: 3,
      name: 'Social Media Pack',
      type: 'image',
      size: '1080x1080',
      date: '2024-01-13',
      tags: ['social', 'instagram', 'square'],
      url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: true,
      downloads: 31
    },
    {
      id: 4,
      name: 'Email Header',
      type: 'image',
      size: '600x200',
      date: '2024-01-12',
      tags: ['email', 'header', 'newsletter'],
      url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: false,
      downloads: 8
    },
    {
      id: 5,
      name: 'Website Hero',
      type: 'image',
      size: '1920x800',
      date: '2024-01-11',
      tags: ['website', 'hero', 'banner'],
      url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: false,
      downloads: 12
    },
    {
      id: 6,
      name: 'Instagram Story',
      type: 'gif',
      size: '1080x1920',
      date: '2024-01-10',
      tags: ['instagram', 'story', 'vertical'],
      url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      favorite: true,
      downloads: 27
    }
  ];

  const filters = [
    { id: 'all', label: 'All Assets', count: assets.length },
    { id: 'image', label: 'Images', count: assets.filter(a => a.type === 'image').length },
    { id: 'gif', label: 'GIFs', count: assets.filter(a => a.type === 'gif').length },
    { id: 'favorite', label: 'Favorites', count: assets.filter(a => a.favorite).length }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'favorite' ? asset.favorite : asset.type === selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const toggleAssetSelection = (assetId) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const toggleFavorite = (assetId) => {
    // In a real app, this would update the backend
    console.log('Toggle favorite for asset:', assetId);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Asset Manager
          </h1>
          <p className="text-gray-600">
            Organize, search, and manage all your generated content
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search assets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {selectedAssets.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {selectedAssets.length} selected
                  </span>
                  <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left ${
                      selectedFilter === filter.id
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{filter.label}</span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['holiday', 'sale', 'product', 'social', 'banner'].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Assets Grid/List */}
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <div className="relative">
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          asset.type === 'image' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {asset.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={() => toggleFavorite(asset.id)}
                          className={`p-1.5 rounded-full transition-colors duration-200 ${
                            asset.favorite 
                              ? 'bg-yellow-100 text-yellow-600' 
                              : 'bg-white/80 text-gray-600 hover:bg-white'
                          }`}
                        >
                          <Star className="w-4 h-4" fill={asset.favorite ? 'currentColor' : 'none'} />
                        </button>
                        <button className="p-1.5 bg-white/80 text-gray-600 rounded-full hover:bg-white transition-colors duration-200">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <input
                          type="checkbox"
                          checked={selectedAssets.includes(asset.id)}
                          onChange={() => toggleAssetSelection(asset.id)}
                          className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 truncate">{asset.name}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{asset.size}</span>
                        <span>{new Date(asset.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{asset.downloads}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {filteredAssets.map((asset) => (
                    <div key={asset.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedAssets.includes(asset.id)}
                          onChange={() => toggleAssetSelection(asset.id)}
                          className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500"
                        />
                        <img
                          src={asset.url}
                          alt={asset.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              asset.type === 'image' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {asset.type.toUpperCase()}
                            </span>
                            <span>{asset.size}</span>
                            <span>{new Date(asset.date).toLocaleDateString()}</span>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{asset.downloads}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleFavorite(asset.id)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              asset.favorite 
                                ? 'text-yellow-600 hover:bg-yellow-50' 
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Star className="w-5 h-5" fill={asset.favorite ? 'currentColor' : 'none'} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <Share2 className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredAssets.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first asset to get started'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetManager;