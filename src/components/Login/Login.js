import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../redux/modules/authentication';

import styles from './Login.module.css';
import SocialButton from '../shared/SocialButton/SocialButton';
import InputField from '../shared/InputField/InputField';
import logo from '../../images/logo.svg';
import logoText from '../../images/logoText.svg';
import facebook from '../../images/socialMedia/facebook.svg';
import twitch from '../../images/socialMedia/twitch.svg';
import steam from '../../images/socialMedia/steam.svg';
import loadingSpinner from '../../images/loadingSpinner.svg';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: 'ah@gaimz.com',
    password: 'password'
  });

  const handleSocialClick = (socialMedia) => {
    console.log(socialMedia);
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('click');
    props.login(formData.email, formData.password);
  }

  if (props.isAuthenticated) {
    return <Redirect to='/feed' />;
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
              <button className={styles.formButton} type='Submit'>
                {props.isLoading ? (<img className={styles.loadingSpinner} src={loadingSpinner} />) : ('Login')}
              </button>
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    isLoading: state.authentication.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);