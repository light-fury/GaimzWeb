import React from 'react';

import { pad2 } from 'src/utils/pad2';
import { MatchResult } from 'src/features/matches';
import styles from './RecentMatches.module.css';

interface RecentMatchesProps {
  recentMatchesData: MatchResult[];
}

const RecentMatches = ({ recentMatchesData }: RecentMatchesProps) => (
  <div>
    <div className={styles.resultRow}>
      <div className={styles.resultColumn}>RESULT</div>
      <div className={styles.resultColumn}>HERO</div>
      <div className={styles.resultColumn}>K/D/A</div>
      <div className={styles.resultColumn}>GPM</div>
      <div className={styles.resultColumn}>DURATION</div>
      <div className={styles.resultColumn}>TYPE</div>
    </div>
    {recentMatchesData.map((matchItem) => (
      <div className={styles.resultRow}>
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
        <div className={styles.resultColumn}>{matchItem.type}</div>
      </div>
    ))}
  </div>
);

export default RecentMatches;
