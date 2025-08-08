import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, X, Edit3, Send, Plus } from 'lucide-react';
import {
  getInstagramCredentials,
  saveInstagramCredentials,
  updateInstagramCredentials,
  getFacebookCredentials,
  saveFacebookCredentials,
  updateFacebookCredentials,
  getBothCredentials,
  saveBothCredentials,
  updateBothCredentials
} from '../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Credentials {
  user_id: string;
  ACCESS_TOKENS: string;
  IG_USER_ID: string;
  PAGE_ID: string;
  FACEBOOK_ACCESS: string;
}

interface BothCredentials {
  user_id: string;
  insta_credentials: {
    user_id: string;
    ACCESS_TOKENS: string;
    IG_USER_ID: string;
  };
  facebook_credentials: {
    user_id: string;
    PAGE_ID: string;
    FACEBOOK_ACCESS: string;
  };
}

interface PlatformCardProps {
  platform: 'instagram' | 'facebook';
  icon: React.ReactNode;
  title: string;
  description: string;
  onSetup: () => void;
  onEdit: () => void;
  isSetup: boolean;
}

interface BothPlatformCardProps {
  onSetup: () => void;
  onEdit: () => void;
  isSetup: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'instagram' | 'facebook' | 'both';
  type: 'setup' | 'edit';
  onSave: (data: any) => void;
  initialData?: any;
}

// Platform Card Component
const PlatformCard: React.FC<PlatformCardProps> = ({ 
  platform, 
  icon, 
  title, 
  description, 
  onSetup, 
  onEdit,
  isSetup 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-[#853AEA] to-[#4057EB]"></div>
      <div className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-[#853AEA] to-[#4057EB] rounded-full text-white">
            {icon}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">
          {title}
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="space-y-3">
          {!isSetup ? (
            <button
              onClick={onSetup}
              className="w-full bg-gradient-to-r from-[#853AEA] to-[#4057EB] text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
            >
              Setup
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-[#853AEA] hover:text-[#853AEA] transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Edit3 size={18} />
              Edit Credentials
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Both Platform Card Component
const BothPlatformCard: React.FC<BothPlatformCardProps> = ({ 
  onSetup, 
  onEdit,
  isSetup 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-[#853AEA] to-[#4057EB]"></div>
      <div className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-[#853AEA] to-[#4057EB] rounded-full text-white">
            <Plus size={48} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">
          Both Platforms
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Manage both Instagram and Facebook together
        </p>
        <div className="space-y-3">
          {!isSetup ? (
            <button
              onClick={onSetup}
              className="w-full bg-gradient-to-r from-[#853AEA] to-[#4057EB] text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Setup Both
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-[#853AEA] hover:text-[#853AEA] transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Edit3 size={18} />
              Edit Both Credentials
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Credentials Modal Component
const CredentialsModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  platform, 
  type, 
  onSave, 
  initialData 
}) => {
  const [formData, setFormData] = useState({
    user_id: localStorage.getItem('user_id') || '',
    ACCESS_TOKENS: '',
    IG_USER_ID: '',
    PAGE_ID: '',
    FACEBOOK_ACCESS: ''
  });

  const [bothFormData, setBothFormData] = useState({
    user_id: localStorage.getItem('user_id') || '',
    insta_credentials: {
      user_id: localStorage.getItem('user_id') || '',
      ACCESS_TOKENS: '',
      IG_USER_ID: ''
    },
    facebook_credentials: {
      user_id: localStorage.getItem('user_id') || '',
      PAGE_ID: '',
      FACEBOOK_ACCESS: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      if (platform === 'both') {
        setBothFormData(initialData);
      } else {
        setFormData(initialData);
      }
    } else {
      if (platform === 'both') {
        setBothFormData({
          user_id: localStorage.getItem('user_id') || '',
          insta_credentials: {
            user_id: localStorage.getItem('user_id') || '',
            ACCESS_TOKENS: '',
            IG_USER_ID: ''
          },
          facebook_credentials: {
            user_id: localStorage.getItem('user_id') || '',
            PAGE_ID: '',
            FACEBOOK_ACCESS: ''
          }
        });
      } else {
        setFormData({
          user_id: localStorage.getItem('user_id') || '',
          ACCESS_TOKENS: '',
          IG_USER_ID: '',
          PAGE_ID: '',
          FACEBOOK_ACCESS: ''
        });
      }
    }
  }, [initialData, platform]);

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBothInputChange = (section: 'insta_credentials' | 'facebook_credentials', field: string, value: string) => {
    setBothFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    if (platform === 'both') {
      onSave(bothFormData);
    } else {
      const dataToSave = platform === 'instagram' 
        ? {
            user_id: formData.user_id,
            ACCESS_TOKENS: formData.ACCESS_TOKENS,
            IG_USER_ID: formData.IG_USER_ID
          }
        : {
            user_id: formData.user_id,
            PAGE_ID: formData.PAGE_ID,
            FACEBOOK_ACCESS: formData.FACEBOOK_ACCESS
          };
      onSave(dataToSave);
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            {platform === 'instagram' ? 'Instagram' : 
             platform === 'facebook' ? 'Facebook' : 'Both Platforms'} Credentials
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {platform === 'instagram' ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Access Token</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#853AEA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your access token"
                  value={formData.ACCESS_TOKENS}
                  onChange={(e) => handleInputChange('ACCESS_TOKENS', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">IG User ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#853AEA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your IG user ID"
                  value={formData.IG_USER_ID}
                  onChange={(e) => handleInputChange('IG_USER_ID', e.target.value)}
                />
              </div>
            </>
          ) : platform === 'facebook' ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Page ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#853AEA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your Facebook page ID"
                  value={formData.PAGE_ID}
                  onChange={(e) => handleInputChange('PAGE_ID', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook Access Token</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#853AEA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your Facebook access token"
                  value={formData.FACEBOOK_ACCESS}
                  onChange={(e) => handleInputChange('FACEBOOK_ACCESS', e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <h4 className="text-lg font-semibold mb-4">Instagram Credentials</h4>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Access Token</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#853AEA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your access token"
                  value={bothFormData.insta_credentials.ACCESS_TOKENS}
                  onChange={(e) => handleBothInputChange('insta_credentials', 'ACCESS_TOKENS', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">IG User ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#853AEA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your IG user ID"
                  value={bothFormData.insta_credentials.IG_USER_ID}
                  onChange={(e) => handleBothInputChange('insta_credentials', 'IG_USER_ID', e.target.value)}
                />
              </div>

              <h4 className="text-lg font-semibold mb-4 mt-8">Facebook Credentials</h4>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Page ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#853AEA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your Facebook page ID"
                  value={bothFormData.facebook_credentials.PAGE_ID}
                  onChange={(e) => handleBothInputChange('facebook_credentials', 'PAGE_ID', e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook Access Token</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#853AEA] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your Facebook access token"
                  value={bothFormData.facebook_credentials.FACEBOOK_ACCESS}
                  onChange={(e) => handleBothInputChange('facebook_credentials', 'FACEBOOK_ACCESS', e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-[#853AEA] to-[#4057EB] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            {type === 'setup' ? 'Save' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
function SocialMediaManager() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'setup' | 'edit'>('setup');
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'facebook' | 'both'>('instagram');
  const [setupStatus, setSetupStatus] = useState({
    instagram: false,
    facebook: false,
    both: false
  });
  const [credentials, setCredentials] = useState<Credentials>({
    user_id: '',
    ACCESS_TOKENS: '',
    IG_USER_ID: '',
    PAGE_ID: '',
    FACEBOOK_ACCESS: ''
  });
  const [bothCredentials, setBothCredentials] = useState<BothCredentials>({
    user_id: '',
    insta_credentials: {
      user_id: '',
      ACCESS_TOKENS: '',
      IG_USER_ID: ''
    },
    facebook_credentials: {
      user_id: '',
      PAGE_ID: '',
      FACEBOOK_ACCESS: ''
    }
  });
  const [initialFormData, setInitialFormData] = useState<any>(null);

  const userId = localStorage.getItem('user_id') || '';

  useEffect(() => {
    const checkCredentials = async () => {
      if (!userId) return;

      try {
        // Check Instagram credentials
        const instaResponse = await getInstagramCredentials(userId);
        if (instaResponse && instaResponse.ACCESS_TOKENS) {
          setSetupStatus(prev => ({ ...prev, instagram: true }));
          setCredentials(prev => ({
            ...prev,
            ACCESS_TOKENS: instaResponse.ACCESS_TOKENS,
            IG_USER_ID: instaResponse.IG_USER_ID
          }));
        }

        // Check Facebook credentials
        const fbResponse = await getFacebookCredentials(userId);
        if (fbResponse && fbResponse.PAGE_ID) {
          setSetupStatus(prev => ({ ...prev, facebook: true }));
          setCredentials(prev => ({
            ...prev,
            PAGE_ID: fbResponse.PAGE_ID,
            FACEBOOK_ACCESS: fbResponse.FACEBOOK_ACCESS
          }));
        }

        // Check Both credentials
        const bothResponse = await getBothCredentials(userId);
        if (bothResponse && bothResponse.insta_credentials && bothResponse.facebook_credentials) {
          setSetupStatus(prev => ({ ...prev, both: true }));
          setBothCredentials(bothResponse);
        }
      } catch (error) {
        console.error('Error checking credentials:', error);
      }
    };

    checkCredentials();
  }, [userId]);

  const handleSetup = (platform: 'instagram' | 'facebook' | 'both') => {
    setSelectedPlatform(platform);
    setModalType('setup');
    setInitialFormData(null);
    setModalOpen(true);
  };

  const handleEdit = async (platform: 'instagram' | 'facebook' | 'both') => {
    setSelectedPlatform(platform);
    setModalType('edit');
    
    try {
      let response;
      if (platform === 'instagram') {
        response = await getInstagramCredentials(userId);
        setInitialFormData({
          user_id: userId,
          ACCESS_TOKENS: response.ACCESS_TOKENS,
          IG_USER_ID: response.IG_USER_ID
        });
      } else if (platform === 'facebook') {
        response = await getFacebookCredentials(userId);
        setInitialFormData({
          user_id: userId,
          PAGE_ID: response.PAGE_ID,
          FACEBOOK_ACCESS: response.FACEBOOK_ACCESS
        });
      } else {
        response = await getBothCredentials(userId);
        setInitialFormData({
          user_id: userId,
          insta_credentials: {
            user_id: userId,
            ACCESS_TOKENS: response.insta_credentials.ACCESS_TOKENS,
            IG_USER_ID: response.insta_credentials.IG_USER_ID
          },
          facebook_credentials: {
            user_id: userId,
            PAGE_ID: response.facebook_credentials.PAGE_ID,
            FACEBOOK_ACCESS: response.facebook_credentials.FACEBOOK_ACCESS
          }
        });
      }
      setModalOpen(true);
    } catch (error) {
      console.error(`Error fetching ${platform} credentials:`, error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (modalType === 'setup') {
        if (selectedPlatform === 'instagram') {
          await saveInstagramCredentials(data);
          setSetupStatus(prev => ({ ...prev, instagram: true }));
          toast.success('Instagram credentials saved successfully!');
        } else if (selectedPlatform === 'facebook') {
          await saveFacebookCredentials(data);
          setSetupStatus(prev => ({ ...prev, facebook: true }));
          toast.success('Facebook credentials saved successfully!');
        } else {
          await saveBothCredentials(data);
          setSetupStatus(prev => ({ ...prev, both: true }));
          toast.success('Both platform credentials saved successfully!');
        }
      } else {
        if (selectedPlatform === 'instagram') {
          await updateInstagramCredentials(data);
          toast.success('Instagram credentials updated successfully!');
        } else if (selectedPlatform === 'facebook') {
          await updateFacebookCredentials(data);
          toast.success('Facebook credentials updated successfully!');
        } else {
          await updateBothCredentials(data);
          toast.success('Both platform credentials updated successfully!');
        }
      }
      
      // Refresh credentials after save/update
      if (selectedPlatform === 'instagram') {
        const updatedCreds = await getInstagramCredentials(userId);
        setCredentials(prev => ({
          ...prev,
          ...updatedCreds
        }));
      } else if (selectedPlatform === 'facebook') {
        const updatedCreds = await getFacebookCredentials(userId);
        setCredentials(prev => ({
          ...prev,
          ...updatedCreds
        }));
      } else {
        const updatedCreds = await getBothCredentials(userId);
        setBothCredentials(updatedCreds);
      }
    } catch (error) {
      console.error('Error saving credentials:', error);
      toast.error('Failed to save credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br overflow-y-auto from-[#f8f9ff] to-[#eae6ff] p-4">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Social Media Management
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect your accounts to manage your social media presence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <PlatformCard
            platform="instagram"
            icon={<Instagram size={48} />}
            title="Instagram"
            description="Connect your Instagram account to manage posts and stories."
            onSetup={() => handleSetup('instagram')}
            onEdit={() => handleEdit('instagram')}
            isSetup={setupStatus.instagram}
          />
          <PlatformCard
            platform="facebook"
            icon={<Facebook size={48} />}
            title="Facebook"
            description="Link your Facebook page to manage content and posts."
            onSetup={() => handleSetup('facebook')}
            onEdit={() => handleEdit('facebook')}
            isSetup={setupStatus.facebook}
          />
          <BothPlatformCard
            onSetup={() => handleSetup('both')}
            onEdit={() => handleEdit('both')}
            isSetup={setupStatus.both}
          />
        </div>

        <div className="text-center text-gray-500">
          <p className="text-sm">
            Secure connection • Your credentials are encrypted and stored safely
          </p>
        </div>
      </div>

      <CredentialsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        platform={selectedPlatform}
        type={modalType}
        onSave={handleSave}
        initialData={initialFormData}
      />
    </div>
  );
}

export default SocialMediaManager;