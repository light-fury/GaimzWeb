import React from 'react';

import { pad2 } from 'src/utils/pad2';
import { MatchResult, PlayerInterface } from 'src/models/match-interfaces';
import styles from './RecentMatches.module.css';

interface RecentMatchesProps {
  recentMatchesData: MatchResult[];
  userId: string;
}

const RecentMatches = ({ userId, recentMatchesData }: RecentMatchesProps) => {
  const ourData = recentMatchesData.map((matchItem) => {
    let ourPlayer: PlayerInterface = { user_id: userId, player_status: 'match_accepted' };
    const ourTeam = matchItem.stats.teams.find((t) => {
      const tempPlayer = t.players.find((p) => p.user_id === userId);
      if (tempPlayer) { ourPlayer = tempPlayer; return true; }
      return false;
    });

    if (!ourTeam) { return { duration: 60 }; }

    return {
      match_id: matchItem.match_id,
      won: ourTeam.id === matchItem.stats.teamWon,
      hero_avatar_url: ourPlayer.hero_avatar_url,
      hero_name: ourPlayer.hero_name,
      kills: ourPlayer.kills,
      deaths: ourPlayer.deaths,
      assists: ourPlayer.assists,
      gpm: ourPlayer.gpm,
      duration: matchItem.stats.duration
        || (new Date(matchItem.ended).getTime() - new Date(matchItem.started).getTime()) / 1000
    };
  });

  return (
    <div>
      <div className={styles.resultRow}>
        <div className={styles.resultColumn}>RESULT</div>
        <div className={styles.resultColumn}>HERO</div>
        <div className={styles.resultColumn}>K/D/A</div>
        <div className={styles.resultColumn}>GPM</div>
        <div className={styles.resultColumn}>DURATION</div>
      </div>
      {ourData.map((matchItem) => (
        <div key={matchItem.match_id} className={styles.resultRow}>
          <div className={styles.resultColumn}>
            <img
              className={[
                styles.heroImage,
                matchItem.won ? styles.won : styles.loss,
              ].join(' ')}
              src={matchItem.hero_avatar_url}
              alt={matchItem.hero_name}
            />
          </div>
          <div className={styles.resultColumn}>{matchItem.hero_name}</div>
          <div className={styles.resultColumn}>
            {`${matchItem.kills}/${matchItem.deaths}/${matchItem.assists}`}
          </div>
          <div className={styles.resultColumn}>{matchItem.gpm}</div>
          <div className={styles.resultColumn}>
            {`${pad2(Math.floor(matchItem.duration / 60))}:${pad2(
              matchItem.duration % 60
            )}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentMatches;
