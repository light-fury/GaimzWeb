import React, { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login as loginAction } from '../redux/modules/authentication';
import { createAlert as createAlertAction } from '../redux/modules/alert';

import validate from '../utils/validate';
import styles from './Login.module.css';
import SocialButton from '../shared/SocialButton/SocialButton';
import Button from '../shared/Button/Button';
import InputField from '../shared/InputField/InputField';

import logo from '../../images/logos/logo.svg';
import logoText from '../../images/logos/logoText.svg';
import facebook from '../../images/socialMedia/facebook.svg';
import twitch from '../../images/socialMedia/twitch.svg';
import steam from '../../images/socialMedia/steam.svg';
import loadingSpinner from '../../images/loadingSpinner.svg';

const Login = ({
  createAlert, login, isAuthenticated, isLoading,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleSocialClick = useCallback((socialMedia) => {
    console.log(socialMedia);
  }, []);

  const handleChange = useCallback((event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }, [formData]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const errors = validate({ email, password });
    if (errors.length !== 0) {
      errors.forEach((error) => createAlert(error, 'danger'));
    } else {
      login(email, password);
    }
  }, [email, password, createAlert, login]);


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
          <p className={styles.cardTitle}>Welcome Back!</p>
          <p className={styles.cardBody}>Sign in to continue</p>
          <div className={styles.socialContainer}>
            <div className={styles.socialButtonContainer}>
              <SocialButton icon={facebook} iconName="Facebook" style={{ color: '#FFFFFF', backgroundColor: '#39579B' }} onClick={() => handleSocialClick('facebook')} />
              <SocialButton icon={twitch} iconName="Twitch" onClick={() => handleSocialClick('twitch')} />
              <SocialButton icon={steam} iconName="Steam" onClick={() => handleSocialClick('steam')} />
            </div>
            <p className={styles.socialText}>Or use your email account</p>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <InputField type="email" name="email" label="Email" style={{ marginBottom: '28px' }} value={email} onChange={handleChange} />
              <InputField type="password" name="password" label="password" style={{ marginBottom: '28px' }} value={password} onChange={handleChange} />
              <p className={styles.formText}>Forgot password?</p>
              <Button className={styles.submitButton} type="Submit">{isLoading ? (<img className={styles.loadingSpinner} src={loadingSpinner} alt="Loading Spinner" />) : ('Login')}</Button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.heroContainer}>
        <p className={styles.heroTextTitle}>Hello Gamer</p>
        <p className={styles.heroTextBody}>Don&apos;t have an account yet?</p>
        <Link to="/register" className={styles.heroButton}>Create New Account</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  isLoading: state.authentication.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(loginAction(email, password)),
  createAlert: (message, alertType) => dispatch(createAlertAction(message, alertType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
