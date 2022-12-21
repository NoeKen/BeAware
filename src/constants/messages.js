export const generalMessages = {};

export const successMessages = {
  // Defaults
  defaultForm: 'Success - Form Saved',

  // Member
  login: 'You are now logged in',
  signUp: 'You are now signed up. Please login to continue.',
  forgotPassword: 'Password reset. Please check your email.',
};

export const errorMessages = {
  // Defaults
  default: 'Hmm, an unknown error occurred',
  timeout: 'Server Timed Out. Check your internet connection',
  invalidJson: 'Response returned is not valid JSON',
  missingData: 'Missing data',

  // Member
  memberNotAuthd: 'You need to be logged in, to update your profile',
  memberExists: 'Member already exists',
  missingFirstName: 'First name is missing',
  missingLastName: 'Last name is missing',
  unavailableUsername: "Username unavailable",
  missingEmail: 'Email is missing',
  missingPassword: 'Password is missing',
  passwordsDontMatch: 'Passwords do not match',

  // Articles 
  articlesEmpty: 'No articles found',
  category404: 'This category could not be found',
};
