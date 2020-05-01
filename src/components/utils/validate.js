import Store from '../redux/store/configureStore';
import { createAlert } from '../redux/modules/alert';
import { isEmail } from 'validator';

const store = Store();

export const validateName = (name) => {
  if (name.length < 3 || name.length > 255) {
    store.dispatch(createAlert('Name must be between 3 and 255 characters', 'danger'));
    return false;
  };
  return true;
}

export const validateEmail = (email) => {
  if (!isEmail(email)) {
    store.dispatch(createAlert('Email is invalid', 'danger'));
    return false;
  }
  return true;
}

export const validatePassword = (password) => {
  if (password.length < 8) {
    store.dispatch(createAlert('Password must be at least 8 characters', 'danger'));
    return false;
  }
  return true;
}
