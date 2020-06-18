import React, { useMemo } from 'react';
import { PlayerInterface } from 'src/models/match-interfaces';

import styles from './MatchmakingPlayerHero.module.css';
import sharedStyles from '../shared/sharedcss.module.css';
import { matchmakingStatsColWidth } from '../MatchmakingStats';

interface MatchmakingPlayerHeroProps {
  player: PlayerInterface;
}

const MatchmakingPlayerHero = ({ player }: MatchmakingPlayerHeroProps) => {
  const rowItems = useMemo(() => {
    const returnItems = [];
    if (player.items) {
      for (let i = 0; i < 6; i++) {
        const element = player.items[i];
        if (!element) {
          returnItems[i] = <div key={element + i} className={`${styles.item} ${styles.empty}`} />;
        } else {
          returnItems[i] = (
            <img
              key={element + i}
              className={styles.item}
              src={element}
              alt={element}
            />
          );
        }
      }
    }
    return returnItems;
  }, [player.items]);


  return (
    <div className={`${sharedStyles.row} ${styles.containerCard} ${player.won === true ? styles.borderedWon : ''} ${player.won === false ? styles.borderedLost : ''}`}>
      <div style={{ width: `${matchmakingStatsColWidth[0]}%` }}>
        <img src={player.hero_avatar_url} alt={player.hero_name} />
      </div>
      <div className={styles.playerStats} style={{ width: `${matchmakingStatsColWidth[1]}%` }}>
        {player.hero_name}
      </div>
      <div className={styles.playerStats} style={{ width: `${matchmakingStatsColWidth[2]}%` }}>
        {player.kills}
        /
        {player.deaths}
        /
        {player.assists}
      </div>
      <div className={styles.playerStats} style={{ width: `${matchmakingStatsColWidth[3]}%` }}>
        {player.gpm}
      </div>
      <div className={styles.playerStats} style={{ width: `${matchmakingStatsColWidth[4]}%` }}>
        {player.lasthits}
        /
        {player.denies}
      </div>
      <div className={styles.playerStats} style={{ width: `${matchmakingStatsColWidth[5]}%` }}>
        <div>
          {rowItems}
        </div>
      </div>
    </div>
  );
};

export default MatchmakingPlayerHero;
