export const formatErrorMessage = (error) => {
  console.error('Authentication error:', error);

  switch (error?.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/operation-not-allowed':
      return 'Email/password authentication is not enabled.';
    case 'auth/invalid-api-key':
      return 'Firebase configuration error. Please contact support.';
    default:
      return error?.message || 'Login failed. Please try again.';
  }
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatRole = (role) => {
  if (!role) return 'Unknown';
  return role.split('_').map(capitalize).join(' ');
};
