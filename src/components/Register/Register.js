import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import styles from './Register.module.css';
import SocialButton from '../shared/SocialButton/SocialButton';
import Button from '../shared/Button/Button';
import InputField from '../shared/InputField/InputField';

import logo from '../../images/logos/logo.svg';
import logoText from '../../images/logos/logoText.svg';
import facebook from '../../images/socialMedia/facebook.svg';
import twitch from '../../images/socialMedia/twitch.svg';
import steam from '../../images/socialMedia/steam.svg';
import loadingSpinner from '../../images/loadingSpinner.svg';

const Register = ({ isAuthenticated, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSocialClick = (socialMedia) => {
    console.log(socialMedia);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted');
  };

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
              <SocialButton icon={facebook} iconName="Facebook" style={{ color: '#FFFFFF', backgroundColor: '#39579B' }} onClick={() => handleSocialClick('facebook')} />
              <SocialButton icon={twitch} iconName="Twitch" onClick={() => handleSocialClick('twitch')} />
              <SocialButton icon={steam} iconName="Steam" onClick={() => handleSocialClick('steam')} />
            </div>
            <p className={styles.socialText}>Or use your email account</p>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <InputField type="name" name="name" label="Name" style={{ marginBottom: '28px' }} value={formData.name} onChange={handleChange} />
              <InputField type="email" name="email" label="Email" style={{ marginBottom: '28px' }} value={formData.email} onChange={handleChange} />
              <InputField type="password" name="password" label="password" style={{ marginBottom: '38px' }} value={formData.password} onChange={handleChange} />
              <Button className={styles.submitButton} type="Submit">{isLoading ? (<img className={styles.loadingSpinner} src={loadingSpinner} alt="Loading Spinner" />) : ('Sign up')}</Button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.heroContainer}>
        <p className={styles.heroTextTitle}>Hello Gamer</p>
        <p className={styles.heroTextBody}>Already have an account?</p>
        <Link to="/login" className={styles.heroButton}>Login</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  isLoading: state.authentication.isLoading,
});

export default connect(
  mapStateToProps,
  null,
)(Register);
