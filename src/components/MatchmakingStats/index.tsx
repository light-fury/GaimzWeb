import React from 'react';
import { MatchResponse, Stats, Game } from 'src/models/match-interfaces';
import styles from './MatchmakingStats.module.css';
import sharedStyles from '../shared/sharedcss.module.css';

import MatchmakingPlayerHero from '../MatchmakingPlayerHero';

interface MatchmakingStatsProps {
  matchStats: Stats;
  matchResponse: MatchResponse;
  game: Game;
}

export const matchmakingStatsColWidth = [
  20,
  31,
  11,
  11,
  11,
  16
];

const MatchMakingStats = (props: MatchmakingStatsProps) => {
  const { matchResponse, matchStats, game } = props;

  return (
    <div>
      <div className={styles.title}>
        {matchResponse.match_status}
      </div>
      <div className={styles.container}>
        <div className={`${sharedStyles.row} ${styles.headerColsContainer}`}>
          <div className={styles.headerText}>
            GAME
          </div>
          <div className={styles.headerText}>
            SERVER
          </div>
          <div className={styles.headerText}>
            MODE
          </div>
          <div className={styles.headerText}>
            VS
          </div>
          <div className={styles.headerText}>
            DURATION
          </div>
          <div className={styles.headerText}>
            DATE
          </div>
        </div>
        <div className={`${sharedStyles.row}`}>
          <div className={styles.headerText}>
            {game.game_name}
          </div>
          <div className={styles.headerText}>
            EU
          </div>
          <div className={styles.headerText}>
            {matchResponse.game_mode}
          </div>
          <div className={styles.headerText}>
            1v1
          </div>
          <div className={styles.headerText}>
            00:00
          </div>
          <div className={styles.headerText}>
            {matchResponse.start_time}
          </div>
        </div>
        <div className={`${sharedStyles.row} ${styles.playerHeaderContainer}`}>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[0]}%` }}>
            Dire
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[1]}%` }}>
            Hero
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[2]}%` }}>
            K/D/A
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[3]}%` }}>
            GPM
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[4]}%` }}>
            LH/DN
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[5]}%` }}>
            ITEMS
          </div>
        </div>
        {matchStats.dire.players.map((player) => <MatchmakingPlayerHero player={player} />)}
        <div className={`${sharedStyles.row} ${styles.playerHeaderContainer}`}>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[0]}%` }}>
            Radiant
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[1]}%` }}>
            Hero
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[2]}%` }}>
            K/D/A
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[3]}%` }}>
            GPM
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[4]}%` }}>
            LH/DN
          </div>
          <div className={styles.playerHeader} style={{ width: `${matchmakingStatsColWidth[5]}%` }}>
            ITEMS
          </div>
        </div>
        {matchStats.radiant.players.map((player) => <MatchmakingPlayerHero player={player} />)}
      </div>
    </div>
  );
};

export default MatchMakingStats;
