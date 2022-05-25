export const config = {
  api: {
    url: process.env.REACT_APP_API_URL,
  },
  notification: {
    duration: 3500,
  },
  cloudinary: {
    cloudName: process.env.REACT_APP_CL_NAME,
    uploadPreset: process.env.REACT_APP_CL_PRESET,
    cropping: true,
    multiple: false,
    reset: true,
  },
};
