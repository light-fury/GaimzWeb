import React from 'react';
import styles from './FindingMatchmaking.module.css';
import CircularProgressBar from '../shared/CircularProgressBar';

interface FindingMatchmakingProps {
  title: string;
  progress: number;
  description?: string;
  circularButtonCenterText: string;
}

const FindingMatchmaking = ({ circularButtonCenterText, title, progress, description }: FindingMatchmakingProps) => (
  <div className={styles.container}>
    <div className={styles.title}>
      {title}
    </div>
    <CircularProgressBar
      percentage={progress}
      children={(
        <div className={styles.elapsedTime}>
          {circularButtonCenterText}
        </div>
        )}
    />
    {description
      && (
      <div className={styles.descriptionText}>
        {description}
      </div>
      )}
  </div>
);

export default FindingMatchmaking;
