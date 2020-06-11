import React, { useEffect } from 'react';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import loadingSpinner from 'src/images/loadingSpinner.svg';

import { RootState } from 'src/app/rootReducer';
import { addTwitch, addSteam } from 'src/features/oauth';
import { ourUrl } from 'src/utils/socialPlatforms';
import styles from './Oauth.module.css';

const Oauth = () => {
  const { social } = useParams();
  const queryString = useLocation().search;
  const { isLoading, isSuccess } = useSelector(
    (state: RootState) => state.oauth
  );
  const dispatch = useDispatch();


  useEffect(() => {
    const searchParams = new URLSearchParams(queryString);
    const params: { [s: string]: string } = { redirect_uri: `${ourUrl}/oauth/${social}` };
    // downleveliteration option necessary in compiler
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }


    switch (social) {
      case 'twitch':
        dispatch(addTwitch(params));
        break;
      case 'steam':
        dispatch(addSteam(params));
        break;
      default:
        break;
    }
  }, [dispatch, social, queryString]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          {isLoading ? (
            <img
              className={styles.loadingSpinner}
              src={loadingSpinner}
              alt="Loading Spinner"
            />
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14 3.11107L4.66669 12.4444L0.388916 8.16663L1.48558 7.06996L4.66669 10.2433L12.9034 2.0144L14 3.11107Z" fill="white" />
            </svg>
          )}
          {isSuccess && <Redirect to="/feed" />}
        </div>
      </div>
    </div>
  );
};
export default Oauth;
