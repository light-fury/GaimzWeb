import React from "react";
import styles from './MatchmakingPlayerHero.module.css';
import sharedStyles from '../shared/sharedcss.module.css';
import {PlayerInterface} from "../../utils/MatchmakingModels";
import {matchmakingStatsColWidth} from "../MatchmakingStats";

interface MatchmakingPlayerHeroProps {
  player: PlayerInterface;
}

const MatchmakingPlayerHero = (props: MatchmakingPlayerHeroProps) => (
  <div className={`${sharedStyles.row} ${styles.containerCard}`}>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[0]}%`}}>
      Dire
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[1]}%`}}>
      Hero
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[2]}%`}}>
      K/D/A
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[3]}%`}}>
      GPM
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[4]}%`}}>
      LH/DN
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[5]}%`}}>
      ITEMS
    </div>
  </div>
);

export default MatchmakingPlayerHero;
