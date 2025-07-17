import axios from 'axios';

const BASE_URL = 'http://192.168.1.37:9007';

export const api = axios.create({
  baseURL: BASE_URL,
});

// ----------------------- background remover ---------------------------------

export const convertToBase64 = (fileOrBlob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileOrBlob);
    reader.onload = () => {
      const base64Data = reader.result.split(",")[1]; // remove prefix
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

// export const removeBackgroundBase64 = async (base64Image) => {
//   try {
//     //  Log the raw base64 string to console
//     console.log(" Sending base64 image payload to backend:");
//     console.log(base64Image.slice(0, 100) + "..."); //  slice to limit log size (optional)

//     const response = await axios.post(`${BASE_URL}/api/remove/remove-background-base64`, {
//       image_base64: base64Image,
//     });

//     //  Log response
//     console.log(" Backend response:", response);

//     if (response?.data?.image_base64) {
//       return `data:image/png;base64,${response.data.image_base64}`;
//     } else {
//       throw new Error("Invalid response from API");
//     }
//   } catch (error) {
//     console.error(" Background removal API error:", error);
//     throw error;
//   }
// };






// ------------------------- signup, signin, forgot, reset password--------------

export const removeBackgroundBase64 = async (base64Image) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/remove/remove-background-base64`, {
      image_base64: base64Image,
    });

    let result = response?.data?.image_base64;

    // ✅ If prefix already exists, don't add again
    if (!result.startsWith("data:image")) {
      result = `data:image/png;base64,${result}`;
    }

    return result;
  } catch (error) {
    console.error("❌ Background removal API error:", error);
    throw error;
  }
};



export const signupApi = async ({ name, email, password, passwordConfirm }) => {
  const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
    name, 
    email,
    password,
    passwordConfirm
  });
  return response.data;
};

export const loginApi = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
    email,
    password
  });
  return response.data;
};


export const forgotPasswordApi = async (email) => {
  const response = await axios.post(`${BASE_URL}/api/auth/forgotPass`, { email });
  return response.data;
};


export const verifyOtpApi = async ({ email, otp }) => {
  const res = await axios.post(`${BASE_URL}/api/auth/verify`, { email, otp });
  return res.data;
};


export const resetPasswordApi = async ({ email, password, confirmPassword }) => {
  const response = await axios.post(`${BASE_URL}/api/auth/resetPass`, {
    email,
    password,
    passwordConfirm: confirmPassword,
  });
  return response.data;
};


export const changePasswordApi = async ({ email, oldPassword, password, passwordConfirm }) => {
  const token = localStorage.getItem('token');

  const response = await axios.post(
    `${BASE_URL}/api/auth/updatePass`,
    {
      email,
      oldPassword,
      password,
      passwordConfirm
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ----------------------- brand setup -------------------------------------------

export const saveBrandProfileApi = async (brandData, fontFile) => {
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const logoBase64 = brandData.logo
    ? await convertToBase64(brandData.logo)
    : null;

  const profile = {
    name: brandData.businessName,
    colors: [brandData.primaryColor, brandData.secondaryColor],
    fonts: [brandData.fontFamily],
    tone: [brandData.brandTone],
    style: brandData.imageryStyle,
    personality: brandData.brandPersonality,
    unique: brandData.uniqueValue,
    purpose: brandData.brandPurpose,
    logo_base64: logoBase64,
  };

  const formData = new FormData();
  formData.append("profile_data", JSON.stringify(profile));
  formData.append("font", fontFile);

  const response = await axios.post(`${BASE_URL}/api/brand/setup`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { data: response.data, logoBase64 }; // ⬅️ return it here
};


export const getBrandProfile = async (brandId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/api/brand/brand-profile/${brandId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching brand profile:", error);
    throw error;
  }
};


export const updateBrandProfileApi = async (brandData, fontFile) => {
  // Convert logo file to base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  let logoBase64 = null;

  if (brandData.logo) {
    logoBase64 = await convertToBase64(brandData.logo);
  } else if (brandData.logo_base64) {
    logoBase64 = brandData.logo_base64;
  }

  if (!logoBase64) {
    throw new Error("⚠️ Logo is required. Please upload or retain the existing logo.");
  }

  const profile = {
    name: brandData.businessName,
    colors: [
      brandData.primaryColor,
      brandData.secondaryColor,
      brandData.accentColor,
    ],
    fonts: [brandData.fontFamily],
    tone: [brandData.brandTone],
    style: brandData.imageryStyle,
    personality: brandData.brandPersonality,
    unique: brandData.uniqueValue,
    purpose: brandData.brandPurpose,
    logo_base64: logoBase64,
  };

  const formData = new FormData();
  formData.append("profile_data", JSON.stringify(profile));
  if (fontFile) {
    formData.append("font", fontFile); 
  }

  const brandId = localStorage.getItem("brand_id");

  return axios.put(`${BASE_URL}/api/brand/edit/${brandId}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// --------------------------------- prompt generation ----------------------------
export const generatePrompt = async ({
  brandId,
  templateType,
  offer_details,
  product,
  season,
}) => {
  const endpoint = `${BASE_URL}/api/prompt_generator/generate_prompt/${brandId}`;

  const params = {};
  if (templateType) params.template_type = templateType;
  if (offer_details) params.offer_details = offer_details;
  if (product) params.product = product;
  if (season) params.season = season;

  try {
    const response = await axios.get(endpoint, { params });
    return response.data.prompt; 
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const generateImageFromPrompt = async (prompt) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/generate/generate`, {
      prompt,
    });

    return response.data.image_id;
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};


export const getImageUrlById = (imageId) => {
  return `${BASE_URL}/api/generate/image/${imageId}`; 
};


// ---------------------------- post chat api ------------------------------------------------

const dataURLtoBlob = (dataUrl) => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const generatePoster = async ({ prompt, file, logo }) => {
  try {
    const brandId = localStorage.getItem("brand_id");

    const payload = {
      prompt,
      file,
      logo,
    };

    const response = await fetch(`${BASE_URL}/api/generate-poster/${brandId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Poster generation failed: ${errorText}`);
    }

    // Get image as blob
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return {
      posterUrl: imageUrl,
      headline: "Your Poster is Ready!", // no headline from backend
      metadata: {
        fontColor: "white",
        fontSize: "40px",
        textPosition: "top center",
        logoPosition: "bottom right",
      },
    };
  } catch (err) {
    console.error("Poster Generation Failed:", err);
    throw err;
  }
};


export const getPosterHistory = async (brandId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/poster-history/${brandId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch poster history");
    }
    const data = await response.json();
    return data; // array of poster entries
  } catch (err) {
    console.error("Error fetching poster history:", err);
    return [];
  }
};

// Delete Poster by ID
export const deletePosterById = async (posterId) => {
  const res = await fetch(`${BASE_URL}/api/poster-history/${posterId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || data.message || "Failed to delete poster");
  }

  return data;
};


// -------------------------- post image for insta, facebook--------------

export const uploadToCloudinary = async (blobUrl) => {
  const blob = await fetch(blobUrl).then((res) => res.blob());
  const file = new File([blob], `generated-${Date.now()}.jpg`, { type: blob.type });

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/api/post_insta/upload-cloudinary/`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Upload failed");

  return data.cloudinary_data.secure_url;
};

export const postToInstagram = async (image_url, caption) => {
  const formData = new FormData();
  formData.append("image_url", image_url);
  formData.append("caption", caption);

  const res = await fetch(`${BASE_URL}/api/post_insta/post-instagram-from-url/`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || data.error || "Post failed");

  return data;
};

export const postToFacebook = async (image_url, caption) => {
  const res = await fetch(`${BASE_URL}/api/post_insta/post-to-facebook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_url,
      caption,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail?.error?.message || data.detail || "Post failed");

  return data;
};




