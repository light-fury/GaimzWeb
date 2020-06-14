import React from 'react';
import { MatchResponse, Stats, Game, Side } from 'src/models/match-interfaces';
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

const MatchMakingStats = ({ matchResponse, matchStats, game }: MatchmakingStatsProps) => {
  if (!matchStats) {
    return (<div><h3>We&apos;re still loading data.</h3></div>);
  }

  const tempMatchStats = { ...matchStats };
  if (matchStats.teamWon) {
    let winningTeam: Side;
    let losingTeam: Side;
    for (let i = 0; i < matchStats.teams.length; i += 1) {
      const element = matchStats.teams[i];
      if (element.id === matchStats.teamWon) {
        winningTeam = { ...element };
        winningTeam.players = winningTeam.players.map((p) => {
          const newPlayer = { ...p };
          newPlayer.won = true;
          return newPlayer;
        });
        tempMatchStats[winningTeam.name.toLowerCase()] = winningTeam;
      } else {
        losingTeam = { ...element };
        losingTeam.players = losingTeam.players.map((p) => {
          const newPlayer = { ...p };
          newPlayer.won = false;
          return newPlayer;
        });
        tempMatchStats[losingTeam.name.toLowerCase()] = losingTeam;
      }
    }
  }

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
            {matchResponse.game_type}
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
        {tempMatchStats.dire.players.map(
          (player) => <MatchmakingPlayerHero player={player} key={player.user_id} />
        )}
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
        {tempMatchStats.radiant.players.map(
          (player) => <MatchmakingPlayerHero player={player} key={player.user_id} />
        )}
      </div>
    </div>
  );
};

export default MatchMakingStats;
