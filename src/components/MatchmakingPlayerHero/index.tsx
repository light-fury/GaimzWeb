import React from "react";
import styles from './MatchmakingPlayerHero.module.css';
import sharedStyles from '../shared/sharedcss.module.css';
import {PlayerInterface} from "../../utils/MatchmakingModels";
import {matchmakingStatsColWidth} from "../MatchmakingStats";
import centaur from 'src/images/matchmaking/centaur.svg';

interface MatchmakingPlayerHeroProps {
  player: PlayerInterface;
}

const MatchmakingPlayerHero = ({player}: MatchmakingPlayerHeroProps) => (
  <div className={`${sharedStyles.row} ${styles.containerCard} ${player.won == true ? styles.borderedWon : player.won == false ? styles.borderedLost : ""}`}>
    <div style={{width: `${matchmakingStatsColWidth[0]}%`}}>
      <img src={centaur} />
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[1]}%`}}>
      {player.hero_name}
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[2]}%`}}>
      {player.kills}/{player.deaths}/{player.assists}
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[3]}%`}}>
      {player.gpm}
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[4]}%`}}>
      {player.lasthits}/{player.denies}
    </div>
    <div className={styles.playerStats} style={{width: `${matchmakingStatsColWidth[5]}%`}}>
      {player.items?.map(item => item + ", ")}
    </div>
  </div>
);

export default MatchmakingPlayerHero;
