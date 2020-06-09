import React from 'react';
import { connectWithSocial, SocialPlatform } from 'src/utils/socialPlatforms';

import styles from './Connections.module.css';
import { Button } from '../shared';


const Connections = () => (
  <div className={styles.connectionsContainer}>
    <Button type="button" className={[styles.twitch, styles.btnBlock].join(' ')} onClick={() => connectWithSocial(SocialPlatform.Twitch)}>
      <span>Connect your Twitch Account</span>
    </Button>
    <Button type="button" className={[styles.steam, styles.btnBlock].join(' ')} onClick={() => connectWithSocial(SocialPlatform.Steam)}>
      <span>Connect your Steam Account</span>
    </Button>
  </div>
);


export default Connections;
