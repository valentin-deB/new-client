import { useState } from "react";

const CLOUDINARY_UPLOAD_PRESET = "unisgned_upload";
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

type UploadState = {
  uploading: boolean;
  uploadedUrl: string | null;
  error: Error | null;
  uploadToCloudinary: (file: File) => Promise<void>;
};

export const useCloudinaryUpload = (): UploadState => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadedUrl,
    error,
    uploadToCloudinary,
  };
};