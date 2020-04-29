import { isEmail } from 'validator';

const validate = (email, password) => {
  const errors = [];
  if (!isEmail(email)) {
    errors.push('Email is invalid');
  }
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  return errors;
};

export default validate;
