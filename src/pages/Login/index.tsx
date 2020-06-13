import React, { useState, useCallback } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createAlert } from 'src/features/alert';
import { login } from 'src/features/authentication';

import { validateEmail, validatePassword } from 'src/utils/validate';
import {
  SocialButton,
  Button,
  InputField,
  InputType,
} from 'src/components/shared';

import logo from 'src/images/logos/logo.svg';
import logoText from 'src/images/logos/logoText.svg';
import facebook from 'src/images/socialMedia/facebook.svg';
import twitch from 'src/images/socialMedia/twitch.svg';
import steam from 'src/images/socialMedia/steam.svg';
import loadingSpinner from 'src/images/loadingSpinner.svg';
import { RootState } from 'src/app/rootReducer';
import { SocialPlatform, connectWithSocial } from 'src/utils/socialPlatforms';
import styles from './Login.module.css';


const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { from } = (location.state as { from: {pathname: string}}) || { from: { pathname: '/feed' } };

  const { isAuthenticated, isLoading } = useSelector(
    (s: RootState) => s.authentication
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleSocialClick = useCallback((socialMedia: SocialPlatform) => {
    connectWithSocial(socialMedia);
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
      const emailValidation = validateEmail(email);
      const passwordValidation = validatePassword(password);
      let validSubmission = true;
      if (emailValidation.error !== null) {
        dispatch(createAlert(emailValidation.error, 'danger'));
        validSubmission = false;
      }
      if (passwordValidation.error !== null) {
        dispatch(createAlert(passwordValidation.error, 'danger'));
        validSubmission = false;
      }
      if (validSubmission) {
        dispatch(login(email, password));
      }
    },
    [email, password, dispatch]
  );

  if (isAuthenticated) {
    return <Redirect to={from} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt="Gaimz Logo" />
            <img className={styles.logoText} src={logoText} alt="Gaimz Text" />
          </div>
          <p className={styles.cardTitle}>Welcome Back!</p>
          <p className={styles.cardBody}>Sign in to continue</p>
          <div className={styles.socialContainer}>
            <div className={styles.socialButtonContainer}>
              <SocialButton
                icon={facebook}
                iconName="Facebook"
                style={{ color: '#FFFFFF', backgroundColor: '#39579B' }}
                onClick={() => handleSocialClick(SocialPlatform.Facebook)}
              />
              <SocialButton
                icon={twitch}
                iconName="Twitch"
                onClick={() => handleSocialClick(SocialPlatform.Twitch)}
              />
              <SocialButton
                icon={steam}
                iconName="Steam"
                onClick={() => handleSocialClick(SocialPlatform.Steam)}
              />
            </div>
            <p className={styles.socialText}>Or use your email account</p>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                style={{ marginBottom: '28px' }}
                value={password}
                onChange={handleChange}
              />
              <p className={styles.formText}>Forgot password?</p>
              <Button className={styles.submitButton} type="submit">
                {isLoading ? (
                  <img
                    className={styles.loadingSpinner}
                    src={loadingSpinner}
                    alt="Loading Spinner"
                  />
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.heroContainer}>
        <p className={styles.heroTextTitle}>Hello Gamer</p>
        <p className={styles.heroTextBody}>Don&apos;t have an account yet?</p>
        <Link to="/register" className={styles.heroButton}>
          Create New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
