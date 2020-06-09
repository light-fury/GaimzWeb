import React from "react";
import styles from './MatchmakingVersus.module.css';
import sharedStyles from '../shared/sharedcss.module.css'
import MatchmakingVersusRow from "../MatchmakingVersusRow";

export interface PlayerInterface {
  user_id: string;
  player_status: string;
}

interface MatchmakingVersusProps {
  players: { radiant: PlayerInterface, dire: PlayerInterface }[];
}

const MatchmakingVersus = (props: MatchmakingVersusProps) => {
  return (
    <div className={styles.container}>
      <div className={sharedStyles.row} style={{marginBottom: 30}}>
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
      {props.players?.map((players) => {
        return <MatchmakingVersusRow radiantPlayer={players.radiant} direPlayer={players.dire}/>
      })}
    </div>
  )
};

export default MatchmakingVersus;
