import React from "react";
import styles from './MatchmakingPlayerHero.module.css';
import sharedStyles from '../shared/sharedcss.module.css';
import {PlayerInterface} from "../../utils/MatchmakingModels";

interface MatchmakingPlayerHeroProps {
  player: PlayerInterface;
}

const MatchmakingPlayerHero = (props: MatchmakingPlayerHeroProps) => (
  <div className={`${sharedStyles.row} ${styles.containerCard}`}>
    <div className={styles.playerStats} style={{width: "20%"}}>
      Dire
    </div>
    <div className={styles.playerStats} style={{width: "35%"}}>
      Hero
    </div>
    <div className={styles.playerStats} style={{width: "10%"}}>
      K/D/A
    </div>
    <div className={styles.playerStats} style={{width: "10%"}}>
      GPM
    </div>
    <div className={styles.playerStats} style={{width: "10%"}}>
      LH/DN
    </div>
    <div className={styles.playerStats} style={{width: "15%"}}>
      ITEMS
    </div>
  </div>
);

export default MatchmakingPlayerHero;
