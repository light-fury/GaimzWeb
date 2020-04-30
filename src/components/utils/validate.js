import { isEmail } from 'validator';

const validate = ({ name = null, email, password }) => {
  const errors = [];
  if (name !== null) if (name.length < 3 || name.length > 255) errors.push('Name must be between 3 and 255 characters');
  if (!isEmail(email)) errors.push('Email is invalid');
  if (password.length < 8) errors.push('Password must be at least 8 characters');
  return errors;
};

export default validate;
