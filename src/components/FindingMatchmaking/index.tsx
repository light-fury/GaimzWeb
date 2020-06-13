import React, { useState, useEffect, SyntheticEvent } from 'react';
import styles from './FindingMatchmaking.module.css';
import CircularProgressBar from '../shared/CircularProgressBar';

export enum Direction {
  Down,
  Up
}

interface FindingMatchmakingProps {
  title: string;
  description?: string;
  completedTimeInS: number;
  direction?: Direction;
  centerText?: string;
  onFinished?: (event?: SyntheticEvent) => void;
}

const FindingMatchmaking = (
  {
    title,
    centerText,
    description,
    completedTimeInS,
    direction = Direction.Up,
    onFinished = () => {}
  }: FindingMatchmakingProps
) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const timoutid = setTimeout(() => {
      setElapsedTime(elapsedTime + 1);
      if (elapsedTime >= completedTimeInS) {
        onFinished();
      }
    }, 1000);
    return () => clearTimeout(timoutid);
  }, [setElapsedTime, elapsedTime, onFinished, completedTimeInS]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title}
      </div>
      <CircularProgressBar
        percentage={direction === Direction.Up
          ? 100 * (elapsedTime / completedTimeInS)
          : 100 - 100 * (elapsedTime / completedTimeInS)}
      >
        <div className={styles.elapsedTime}>
          {centerText || `${elapsedTime} seconds`}
        </div>
      </CircularProgressBar>
      {description
        && (
          <div className={styles.descriptionText}>
            {description}
          </div>
        )}
    </div>
  );
};

export default FindingMatchmaking;
