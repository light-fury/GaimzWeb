import React, { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from 'src/features/alert';
import { register } from 'src/features/authentication';

import {
  validateName,
  validateEmail,
  validatePassword,
} from 'src/utils/validate';
import { SocialButton, Button, InputField, InputType } from 'src/components';

import logo from 'src/images/logos/logo.svg';
import logoText from 'src/images/logos/logoText.svg';
import facebook from 'src/images/socialMedia/facebook.svg';
import twitch from 'src/images/socialMedia/twitch.svg';
import steam from 'src/images/socialMedia/steam.svg';
import loadingSpinner from 'src/images/loadingSpinner.svg';
import { RootState } from 'src/app/rootReducer';
import styles from './Register.module.css';

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.authentication
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const handleSocialClick = useCallback((socialMedia) => {
    console.log(socialMedia);
  }, []);

  const handleChange = useCallback(
    (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const nameValidation = validateName(name);
      const emailValidation = validateEmail(email);
      const passwordValidation = validatePassword(password);
      let validSubmission = true;
      if (nameValidation.error !== null) {
        dispatch(createAlert(nameValidation.error, 'danger'));
        validSubmission = false;
      }
      if (emailValidation.error !== null) {
        dispatch(createAlert(emailValidation.error, 'danger'));
        validSubmission = false;
      }
      if (passwordValidation.error !== null) {
        dispatch(createAlert(passwordValidation.error, 'danger'));
        validSubmission = false;
      }
      if (validSubmission) {
        dispatch(register(name, email, password));
      }
    },
    [name, email, password, dispatch]
  );

  if (isAuthenticated) {
    return <Redirect to="/feed" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt="Gaimz Logo" />
            <img className={styles.logoText} src={logoText} alt="Gaimz Text" />
          </div>
          <p className={styles.cardTitle}>Create an account</p>
          <p className={styles.cardBody}>Register to continue</p>
          <div className={styles.socialContainer}>
            <div className={styles.socialButtonContainer}>
              <SocialButton
                icon={facebook}
                iconName="Facebook"
                style={{ color: '#FFFFFF', backgroundColor: '#39579B' }}
                onClick={() => handleSocialClick('facebook')}
              />
              <SocialButton
                icon={twitch}
                iconName="Twitch"
                onClick={() => handleSocialClick('twitch')}
              />
              <SocialButton
                icon={steam}
                iconName="Steam"
                onClick={() => handleSocialClick('steam')}
              />
            </div>
            <p className={styles.socialText}>Or use your email account</p>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <InputField
                type={InputType.Name}
                name="name"
                label="Name"
                style={{ marginBottom: '28px' }}
                value={name}
                onChange={handleChange}
              />
              <InputField
                type={InputType.Email}
                name="email"
                label="Email"
                style={{ marginBottom: '28px' }}
                value={email}
                onChange={handleChange}
              />
              <InputField
                type={InputType.Password}
                name="password"
                label="password"
                style={{ marginBottom: '38px' }}
                value={password}
                onChange={handleChange}
              />
              <Button className={styles.submitButton} type="submit">
                {isLoading ? (
                  <img
                    className={styles.loadingSpinner}
                    src={loadingSpinner}
                    alt="Loading Spinner"
                  />
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.heroContainer}>
        <p className={styles.heroTextTitle}>Hello Gamer</p>
        <p className={styles.heroTextBody}>Already have an account?</p>
        <Link to="/login" className={styles.heroButton}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
