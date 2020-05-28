import React from 'react';
import { Link } from 'react-router-dom';

import { FeedCard, RightModal } from 'src/components';
import { recentMatchesData } from 'src/utils/dummyData';

import styles from './MatchMaking.module.css';

function pad2(number: number): string {
  return (number < 10 ? '0' : '') + number;
}

const MatchMaking = () => (
  <div className={styles.pageContainer}>
    <div className={styles.mainContainer}>
      <div className={styles.topNavBar}>
        <div className={[styles.topNavBarItem, styles.inactive].join(' ')}>
          <Link to="/feed">Discover</Link>
        </div>
        <div className={[styles.topNavBarItem, styles.active].join(' ')}>
          <span>Matchmaking</span>
          <div className={styles.dot} />
        </div>
      </div>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Recent Matches</span>
      </div>
      <div className={styles.contentContainer}>
        {recentMatchesData !== null && (
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
                <div
                  className={styles.resultColumn}
                >{`${matchItem.kills}/${matchItem.deaths}/${matchItem.assists}`}</div>
                <div className={styles.resultColumn}>{matchItem.gpm}</div>
                <div className={styles.resultColumn}>{`${pad2(
                  Math.floor(matchItem.duration / 60)
                )}:${pad2(matchItem.duration % 60)}`}</div>
                <div className={styles.resultColumn}>{matchItem.type}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <RightModal>
      <h1 style={{ color: 'white' }}>Hello there!</h1>
    </RightModal>
  </div>
);

export default MatchMaking;
