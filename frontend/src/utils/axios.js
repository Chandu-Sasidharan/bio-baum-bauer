import axios from 'axios';

const DEFAULT_LANGUAGE = 'de';
const LANGUAGE_STORAGE_KEY = 'bbb-language';

const getPreferredLanguage = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  return (
    window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
    document.documentElement.lang ||
    DEFAULT_LANGUAGE
  );
};

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosApiInstance.interceptors.request.use(config => {
  const lang = getPreferredLanguage();
  const headers = {
    ...(config.headers || {}),
    'Accept-Language': lang,
  };

  const params =
    config.params && config.params.lang !== undefined
      ? config.params
      : { ...(config.params || {}), lang };

  return {
    ...config,
    headers,
    params,
  };
});

export default axiosApiInstance;
