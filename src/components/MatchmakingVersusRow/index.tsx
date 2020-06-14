import React from 'react';
import { PlayerInterface } from 'src/models/match-interfaces';
import styles from './MatchmakingVersusRow.module.css';
import sharedStyles from '../shared/sharedcss.module.css';

interface MatchmakingVersusRowProps {
  radiantPlayer: PlayerInterface;
  direPlayer: PlayerInterface;
}

const MatchmakingVersusRow = ({ radiantPlayer, direPlayer }: MatchmakingVersusRowProps) => (
  <div className={sharedStyles.row}>
    <div className={`${sharedStyles.halfContainer} ${sharedStyles.row}`}>
      <div className={`${radiantPlayer.won === true ? styles.borderedWonImg : ''} ${radiantPlayer.won === false ? styles.borderedLostImg : ''}`}>
        <img
          className={styles.playerAvatar}
          src={radiantPlayer.user_avatar_url}
          alt={radiantPlayer.user_id}
        />
      </div>
      <div className={styles.playerText} style={{ marginLeft: '1rem' }}>
        {radiantPlayer.user_id}
      </div>
    </div>
    <div className={`${sharedStyles.halfContainer} ${sharedStyles.row} ${sharedStyles.alignRight}`}>
      <div className={`${direPlayer.won === true ? styles.borderedWonImg : ''} ${direPlayer.won === false ? styles.borderedLostImg : ''}`}>
        <img
          className={`${styles.playerAvatar} ${styles.right}`}
          src={direPlayer.user_avatar_url}
          alt={direPlayer.user_id}
        />
      </div>
      <div className={styles.playerText} style={{ marginRight: '1rem' }}>
        {direPlayer.user_id}
      </div>
    </div>
  </div>
);

export default MatchmakingVersusRow;
