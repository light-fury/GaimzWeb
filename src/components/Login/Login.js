import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';
import SocialButton from '../shared/SocialButton/SocialButton';
import InputField from '../shared/InputField/InputField';

import logo from '../../images/logo.svg';
import logoText from '../../images/logoText.svg';
import facebook from '../../images/socialMedia/facebook.svg';
import twitch from '../../images/socialMedia/twitch.svg';
import steam from '../../images/socialMedia/steam.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'ah@gaimz.com',
    password: '••••••••••••'
  });

  const handleSocialClick = (socialMedia) => {
    console.log(socialMedia);
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const userPayload = {
      user_email: formData.email,
      user_password: formData.password
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload)
  };
  fetch('https://basicapi.gaimz.com/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        debugger
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.contentContainer}>

          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt='Gaimz Logo' />
            <img className={styles.logoText} src={logoText} alt='Gaimz Text' />
          </div>

          <p className={styles.cardTitle}>Welcome Back!</p>
          <p className={styles.cardBody}>Sign in to continue</p>

          <div className={styles.socialContainer}>
            <div className={styles.socialButtonContainer}>
              <SocialButton icon={facebook} iconName='Facebook' style={{ color: '#FFFFFF', backgroundColor: '#39579B' }} onClick={() => handleSocialClick('facebook')} />
              <SocialButton icon={twitch} iconName='Twitch' onClick={() => handleSocialClick('twitch')} />
              <SocialButton icon={steam} iconName='Steam' onClick={() => handleSocialClick('steam')} />
            </div>
            <p className={styles.socialText}>Or use your email account</p>
          </div>

          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <InputField type='email' name='email' label='Email' style={{ marginBottom: '28px' }} value={formData.email} onChange={handleChange} />
              <InputField type='password' name='password' label='password' style={{ marginBottom: '28px' }} value={formData.password} onChange={handleChange} />
              <p className={styles.formText}>Forgot password?</p>
              <button className={styles.formButton} type='Submit'>Login</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.heroContainer}>
        <p className={styles.heroTextTitle}>Hello Gamer</p>
        <p className={styles.heroTextBody}>Don't have an account yet?</p>
        <Link to='/register' className={styles.heroButton}>Create New Account</Link>
      </div>
    </div>
  );
};

export default Login;