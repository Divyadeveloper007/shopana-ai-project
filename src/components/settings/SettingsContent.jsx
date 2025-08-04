import React, { useState, useEffect } from "react";
import ProfileTab from "./tabs/ProfileTab";
import NotificationsTab from "./tabs/NotificationsTab";
import PrivacyTab from "./tabs/PrivacyTab";
import BillingTab from "./tabs/BillingTab";
import ApiTab from "./tabs/ApiTab";
import PreferencesTab from "./tabs/PreferencesTab";
import BrandSetupTab from "./tabs/BrandSetupTab";
import { Save } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { updateBrandProfileApi } from "../../api/auth";

const SettingsContent = ({ activeTab }) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));

  const [settings, setSettings] = useState({
    name: storedData?.name || "",
    email: storedData?.email || "",
    password: storedData?.password || "",
    passwordConfirm: storedData?.passwordConfirm || "",
    company: storedData?.company || "",
    timezone: storedData?.timezone || "America/New_York",
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    generationAlerts: true,
    dataCollection: true,
    analytics: true,
    thirdPartySharing: false,
    apiKey: "sk-1234567890abcdef...",
    defaultImageSize: "1920x1080",
    defaultStyle: "modern",
    autoSave: true,
    qualityPreference: "high",
  });

  const [brandData, setBrandData] = useState({
    logo: null,
    logo_base64: null, // ⬅️ ensure this exists
    primaryColor: "#6366f1",
    secondaryColor: "#ec4899",
    accentColor: "#22d3ee",
    fontFile: null,
    fontFamily: "Poppins",
    brandTone: "",
    brandPersonality: "",
    imageryStyle: "",
    businessName: "",
    uniqueValue: "",
    brandPurpose: "",
  });

  const [fontFile, setFontFile] = useState(null);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (key, value) => {
    setBrandData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;

        setBrandData((prev) => ({
          ...prev,
          logo: file,
          logo_base64: base64,
        }));

        localStorage.setItem("brand_logo_base64", base64);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const handleRemoveImage = () => {
    setBrandData((prev) => ({ ...prev, logo: null, logo_base64: null }));
  };

  const handleBrandSave = async (
    incomingData = brandData,
    onSuccessCallback
  ) => {
    try {
      // Save API call
      await updateBrandProfileApi(incomingData, fontFile);
      toast.success("✅ Brand updated!");

      // ✅ Call back to BrandSetupTab to set isEditing false
      if (onSuccessCallback) onSuccessCallback();
    } catch (err) {
      console.error("❌ Failed to update brand:", err);
      toast.error(err.message || "Failed to update brand settings");
    }
  };

  useEffect(() => {
    const storedLogoBase64 = localStorage.getItem("brand_logo_base64");
    if (storedLogoBase64) {
      setBrandData((prev) => ({
        ...prev,
        logo_base64: storedLogoBase64,
      }));
    }
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileTab settings={settings} onChange={handleSettingChange} />
        );
      case "notifications":
        return (
          <NotificationsTab
            settings={settings}
            onChange={handleSettingChange}
          />
        );
      case "privacy":
        return (
          <PrivacyTab settings={settings} onChange={handleSettingChange} />
        );
      case "billing":
        return <BillingTab />;
      case "api":
        return <ApiTab settings={settings} />;
      case "preferences":
        return (
          <PreferencesTab settings={settings} onChange={handleSettingChange} />
        );
      case "brandsetup":
        return (
          <BrandSetupTab
            brandData={brandData}
            setBrandData={setBrandData}
            onSave={(data, callback) => {
              handleBrandSave(data, callback); // ⬅️ pass the callback
            }}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            handleRemoveImage={handleRemoveImage}
            setFontFile={setFontFile}
            fontOptions={["Poppins", "Roboto", "Inter", "Lato", "Open Sans"]}
            brandTones={[
              {
                id: "professional",
                label: "Professional",
                desc: "Clear and direct.",
              },
              { id: "friendly", label: "Friendly", desc: "Casual and warm." },
            ]}
            personalities={[
              { id: "bold", label: "Bold" },
              { id: "elegant", label: "Elegant" },
              { id: "modern", label: "Modern" },
            ]}
            imageryStyles={[
              {
                id: "realistic",
                label: "Realistic",
                desc: "True-to-life visuals.",
              },
              {
                id: "illustrative",
                label: "Illustrative",
                desc: "Stylized drawings.",
              },
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="lg:col-span-3 lg:mb-20 mb-20">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        {renderTab()}
      </div>
    </div>
  );
};

export default SettingsContent;
