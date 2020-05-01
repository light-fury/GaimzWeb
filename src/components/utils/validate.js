import { isEmail } from 'validator';

export const validateName = (name) => {
  if (name.length < 3 || name.length > 255) {
    return {
      error: 'Name must be between 3 and 255 characters',
    };
  }
  return {
    error: null,
  };
};

export const validateEmail = (email) => {
  if (!isEmail(email)) {
    return {
      error: 'Email is invalid',
    };
  }
  return {
    error: null,
  };
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      error: 'Password must be at least 8 characters',
    };
  }
  return {
    error: null,
  };
};
