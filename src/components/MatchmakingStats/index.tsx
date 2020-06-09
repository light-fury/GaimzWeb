import React from 'react';
import styles from './MatchmakingStats.module.css';
import sharedStyles from '../shared/sharedcss.module.css';
import { MatchResponse, Stats } from '../../utils/MatchmakingModels';

interface MatchmakingStatsProps {
  matchStats: Stats;
  matchResponse: MatchResponse;
}

const MatchMakingStats = (props: MatchmakingStatsProps) => {
  const { matchResponse, matchStats } = props;

  return (
    <div>
      <div className={styles.title}>
        {matchResponse.match_status}
      </div>
    </div>
  );
};

export default MatchMakingStats;
