import React, { useState } from 'react';
import { 
  Zap, 
  Check, 
  Settings, 
  ExternalLink,
  ShoppingBag,
  Instagram,
  Facebook,
  Mail,
  Globe,
  Calendar,
  CreditCard,
  Smartphone,
  Youtube,
  Twitter,
  Linkedin,
  Plus,
  AlertCircle
} from 'lucide-react';

const Integrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState(['instagram', 'facebook']);

  const integrationCategories = [
    {
      title: 'Social Media',
      integrations: [
        {
          id: 'instagram',
          name: 'Instagram',
          icon: Instagram,
          description: 'Auto-post generated content to Instagram feed and stories',
          features: ['Auto-posting', 'Story scheduling', 'Hashtag optimization'],
          connected: true,
          premium: false
        },
        {
          id: 'facebook',
          name: 'Facebook',
          icon: Facebook,
          description: 'Share content across Facebook pages and groups',
          features: ['Page posting', 'Group sharing', 'Ad creation'],
          connected: true,
          premium: false
        },
        {
          id: 'twitter',
          name: 'Twitter',
          icon: Twitter,
          description: 'Tweet generated content with optimal timing',
          features: ['Auto-tweeting', 'Thread creation', 'Engagement tracking'],
          connected: false,
          premium: false
        },
        {
          id: 'linkedin',
          name: 'LinkedIn',
          icon: Linkedin,
          description: 'Professional content sharing for business accounts',
          features: ['Company page posts', 'Article publishing', 'Professional networking'],
          connected: false,
          premium: true
        },
        {
          id: 'youtube',
          name: 'YouTube',
          icon: Youtube,
          description: 'Create thumbnails and promotional content for videos',
          features: ['Thumbnail generation', 'Channel art', 'Video promotion'],
          connected: false,
          premium: true
        }
      ]
    },
    {
      title: 'E-commerce',
      integrations: [
        {
          id: 'shopify',
          name: 'Shopify',
          icon: ShoppingBag,
          description: 'Generate product images and promotional content',
          features: ['Product image enhancement', 'Sale banners', 'Collection graphics'],
          connected: false,
          premium: false
        },
        {
          id: 'square',
          name: 'Square',
          icon: CreditCard,
          description: 'Create promotional content for Square merchants',
          features: ['Menu design', 'Promotional flyers', 'Digital receipts'],
          connected: false,
          premium: false
        }
      ]
    },
    {
      title: 'Email Marketing',
      integrations: [
        {
          id: 'mailchimp',
          name: 'Mailchimp',
          icon: Mail,
          description: 'Design email headers and promotional graphics',
          features: ['Email templates', 'Header graphics', 'Campaign visuals'],
          connected: false,
          premium: false
        }
      ]
    },
    {
      title: 'Automation Tools',
      integrations: [
        {
          id: 'zapier',
          name: 'Zapier',
          icon: Zap,
          description: 'Connect with 5000+ apps for workflow automation',
          features: ['Workflow automation', 'Trigger-based generation', 'Multi-app integration'],
          connected: false,
          premium: true
        },
        {
          id: 'make',
          name: 'Make (Integromat)',
          icon: Settings,
          description: 'Advanced automation scenarios and workflows',
          features: ['Complex workflows', 'Data transformation', 'API integrations'],
          connected: false,
          premium: true
        }
      ]
    },
    {
      title: 'Scheduling',
      integrations: [
        {
          id: 'buffer',
          name: 'Buffer',
          icon: Calendar,
          description: 'Schedule and manage social media posts',
          features: ['Post scheduling', 'Analytics', 'Team collaboration'],
          connected: false,
          premium: false
        },
        {
          id: 'hootsuite',
          name: 'Hootsuite',
          icon: Smartphone,
          description: 'Comprehensive social media management',
          features: ['Multi-platform posting', 'Social listening', 'Team management'],
          connected: false,
          premium: true
        }
      ]
    }
  ];

  const toggleIntegration = (integrationId) => {
    setConnectedIntegrations(prev => 
      prev.includes(integrationId)
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  const connectIntegration = (integration) => {
    console.log('Connecting to:', integration.name);
    // In a real app, this would open OAuth flow or connection modal
    toggleIntegration(integration.id);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Integrations
          </h1>
          <p className="text-gray-600">
            Connect your favorite tools and platforms to automate your content workflow
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{connectedIntegrations.length}</p>
                <p className="text-sm text-gray-600">Connected</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {integrationCategories.reduce((acc, cat) => acc + cat.integrations.length, 0)}
                </p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Automation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Categories */}
        <div className="space-y-8">
          {integrationCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {category.integrations.map((integration) => {
                  const Icon = integration.icon;
                  const isConnected = connectedIntegrations.includes(integration.id);
                  
                  return (
                    <div
                      key={integration.id}
                      className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
                        isConnected 
                          ? 'border-green-200 bg-green-50/30' 
                          : 'border-gray-100 hover:shadow-md'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`p-3 rounded-lg mr-4 ${
                              isConnected 
                                ? 'bg-green-100' 
                                : 'bg-gray-100'
                            }`}>
                              <Icon className={`w-6 h-6 ${
                                isConnected 
                                  ? 'text-green-600' 
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="text-lg font-semibold text-gray-900 mr-2">
                                  {integration.name}
                                </h3>
                                {integration.premium && (
                                  <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full">
                                    Premium
                                  </span>
                                )}
                              </div>
                              {isConnected && (
                                <div className="flex items-center mt-1">
                                  <Check className="w-4 h-4 text-green-600 mr-1" />
                                  <span className="text-sm text-green-600 font-medium">Connected</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => connectIntegration(integration)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                              isConnected
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                          >
                            {isConnected ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{integration.description}</p>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                          <ul className="space-y-1">
                            {integration.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {isConnected && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Last sync: 2 hours ago</span>
                              <button className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium">
                                <Settings className="w-4 h-4 mr-1" />
                                Configure
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Integration */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8 border border-purple-100">
            <div className="flex items-start">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Need a Custom Integration?
                </h3>
                <p className="text-gray-600 mb-4">
                  Don't see your favorite tool? We can build custom integrations for enterprise customers.
                </p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Request Integration
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Tips */}
        <div className="mt-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  Integration Tips
                </h3>
                <ul className="space-y-2 text-amber-800">
                  <li>• Connect your most-used platforms first for maximum automation benefit</li>
                  <li>• Premium integrations offer advanced features like multi-step workflows</li>
                  <li>• Test your integrations with sample content before going live</li>
                  <li>• Monitor your connected accounts regularly for optimal performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;