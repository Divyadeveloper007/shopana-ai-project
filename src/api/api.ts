import axios from 'axios';

const BASE_URL = 'http://192.168.1.14:9002';

export const api = axios.create({
  baseURL: BASE_URL,
});

// ======================
// Social Media Post Types
// ======================

export interface LoginResponse {
  access_token: string;
  user_email: string;
  user_id: string;
  role: string;
  verified: boolean;
  message?: string;
}


export interface PostPayload {
  caption: string;
  base64_image: string;
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

export interface SocialMediaResponse {
  id?: string;
  post_id?: string;
}

export interface PostResponse {
  message: string;
  data: {
    caption: string;
    uploaded_at: string;
    cloudinary_response: CloudinaryResponse;
    instagram_response?: SocialMediaResponse;
    facebook_response?: SocialMediaResponse;
    twitter_response?: SocialMediaResponse;
    linkedin_response?: SocialMediaResponse;
  };
}

export const postToSocialMedia = async (payload: PostPayload): Promise<PostResponse> => {
  const res = await fetch(`${BASE_URL}/api/upload-socialmedia/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Failed to post to social media');
  }

  return await res.json();
};

// ==========================
// Auth Types
// ==========================

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

// ==========================
// Auth APIs
// ==========================

export const signupApi = async (payload: SignupPayload) => {
  const response = await axios.post(`${BASE_URL}/api/signup`, payload);
  return response.data;
};


export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/api/signin', payload);
    
    // Validate response structure
    if (!response.data.access_token) {
      throw new Error('Invalid response structure: access_token missing');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your connection.');
      }
      if (error.response) {
        // Server responded with a status code outside 2xx
        const serverError = error.response.data as ErrorResponse;
        throw new Error(
          serverError.message || 
          serverError.detail || 
          `Login failed (${error.response.status})`
        );
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Check your network connection.');
      }
    }
    // Generic error handling
    throw new Error(error instanceof Error ? error.message : 'Unknown login error');
  }
};

export const forgotPasswordApi = async (email: string) => {
  const response = await axios.post(`${BASE_URL}/api/forgotPass`, { email });
  return response.data;
};

export const verifyOtpApi = async (payload: VerifyOtpPayload) => {
  const response = await axios.post(`${BASE_URL}/api/verify`, payload);
  return response.data;
};

export const resetPasswordApi = async (payload: ResetPasswordPayload) => {
  const response = await axios.post(`${BASE_URL}/api/resetPass`, {
    email: payload.email,
    password: payload.password,
    passwordConfirm: payload.confirmPassword,
  });
  return response.data;
};

export const changePasswordApi = async (payload: ChangePasswordPayload) => {
  const token = localStorage.getItem('token');

  const response = await axios.post(
    `${BASE_URL}/api/updatePass`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Instagram APIs
export const getInstagramCredentials = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/api/get-instagram-credentials/${userId}`);
  return response.data;
};

export const saveInstagramCredentials = async (data: {
  user_id: string;
  ACCESS_TOKENS: string;
  IG_USER_ID: string;
}) => {
  const response = await axios.post(`${BASE_URL}/api/save-instagram-credentials/`, data);
  return response.data;
};

export const updateInstagramCredentials = async (data: {
  user_id: string;
  ACCESS_TOKENS: string;
  IG_USER_ID: string;
}) => {
  const response = await axios.put(`${BASE_URL}/api/edit-instagram-credentials/`, data);
  return response.data;
};

// Facebook APIs
export const getFacebookCredentials = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/api/get-facebook-credentials/${userId}`);
  return response.data;
};

export const saveFacebookCredentials = async (data: {
  user_id: string;
  PAGE_ID: string;
  FACEBOOK_ACCESS: string;
}) => {
  const response = await axios.post(`${BASE_URL}/api/save-facebook-credentials/`, data);
  return response.data;
};

export const updateFacebookCredentials = async (data: {
  user_id: string;
  PAGE_ID: string;
  FACEBOOK_ACCESS: string;
}) => {
  const response = await axios.put(`${BASE_URL}/api/edit-facebook-credentials/`, data);
  return response.data;
};

// Both Platforms APIs
export const getBothCredentials = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/api/get-credentials/${userId}`);
  return response.data;
};

export const saveBothCredentials = async (data: {
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
}) => {
  const response = await axios.post(`${BASE_URL}/api/save-credentials/`, data);
  return response.data;
};

export const updateBothCredentials = async (data: {
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
}) => {
  const response = await axios.put(`${BASE_URL}/api/update-credentials/`, data);
  return response.data;
};
