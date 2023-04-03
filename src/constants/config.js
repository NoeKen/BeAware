const isDevEnv = process.env.NODE_ENV === 'development';

export default {
  // App Details
  appName: 'beAware',

  // Build Configuration - eg. Debug or Release?
  isDevEnv,

  // Date Format
  dateFormat: 'DD MMM YYYY',

  // API
  apiBaseUrl: isDevEnv ? 'http://beAware.com/api' : 'http://beAware.com/api',

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: isDevEnv ? 'UA-84284256-2' : 'UA-84284256-1',
};
