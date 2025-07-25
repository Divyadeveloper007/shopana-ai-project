// api/socialMediaApi.ts

export interface PostPayload {
  caption: string;
  base64_image: string;
}

export interface PostResponse {
  message: string;
  data: {
    caption: string;
    uploaded_at: string;
    cloudinary_response: {
      secure_url: string;
      public_id: string;
      format: string;
      width: number;
      height: number;
    };
    instagram_response?: { id: string };
    facebook_response?: { id: string; post_id: string };
    twitter_response?: { id: string };
    linkedin_response?: { id: string };
  };
}

export const postToSocialMedia = async (payload: PostPayload): Promise<PostResponse> => {
  const res = await fetch("http://192.168.1.13:9002/api/upload-socialmedia/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to post to social media");
  }

  return await res.json();
};
