type AppConstantsType = {
  apiUrl: string;
};

const AppConstants: AppConstantsType = {
  apiUrl: import.meta.env.VITE_API_URL,
};

export default AppConstants;
