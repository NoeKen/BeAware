import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Config from '../constants/config';

/**
 * Axios defaults
 */
axios.defaults.baseURL = Config.apiBaseUrl;

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

/**
 * Request Interceptor
 */
axios.interceptors.request.use(
  async (inputConfig) => {
    const config = inputConfig;

    config.onDownloadProgress = (progressEvent) => {
      const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length']);
      const current = progressEvent.currentTarget.response.length;

      const percentCompleted = Math.floor(current / total * 100);
    };

    // Check for and add the stored Auth Token to the header request
    let token = '';
    try {
      token = await AsyncStorage.getItem('@Auth:token');
    } catch (error) {
      /* Nothing */
    }
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    throw error;
  },
);

axios.interceptors.response.use(
  (response) =>
    // maybe process here
    response,
  (error) =>
  // do some global magic with error and pass back to caller
    Promise.reject(error),

);
/**
 * Response Interceptor
 */
// axios.interceptors.response.use(
//   (res) => {
//     // Status code isn't a success code - throw error
//     if (!`${res.status}`.startsWith('2')) {
//       throw res.data;
//     }

//     // Otherwise just return the data
//     return res;
//   },
//   (error) => {
//     // Pass the response from the API, rather than a status code
//     if (error && error.response && error.response.data) {
//       throw error.response.data;
//     }
//     throw error;
//   },
// );

export default axios;

export const progressConfig = {
  onDownloadProgress: (progressEvent) => {
    const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length']);
    const current = progressEvent.currentTarget.response.length;

    const percentCompleted = Math.floor(current / total * 100);
  },
};
