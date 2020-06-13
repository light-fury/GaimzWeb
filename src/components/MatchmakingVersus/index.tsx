import React from 'react';
import { PlayerInterface } from 'src/models/match-interfaces';
import styles from './MatchmakingVersus.module.css';
import sharedStyles from '../shared/sharedcss.module.css';
import MatchmakingVersusRow from '../MatchmakingVersusRow';

interface MatchmakingVersusProps {
  players: { radiant: PlayerInterface, dire: PlayerInterface }[];
}

const MatchmakingVersus = (props: MatchmakingVersusProps) => (
  <div className={styles.container}>
    <div className={sharedStyles.row} style={{ marginBottom: 30 }}>
      <div className={styles.leftContainer}>
        <div className={styles.topText}>
          RADIANT
        </div>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.topText}>
          VS
        </div>
      </div>
      <div className={`${styles.rightContainer}`}>
        <div className={styles.topText}>
          DIRE
        </div>
      </div>
    </div>
    {props.players?.map((players) => <MatchmakingVersusRow radiantPlayer={players.radiant} direPlayer={players.dire} />)}
  </div>
);

export default MatchmakingVersus;
