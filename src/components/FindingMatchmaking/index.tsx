import React, { useState, useEffect, SyntheticEvent, useLayoutEffect } from 'react';
import styles from './FindingMatchmaking.module.css';
import CircularProgressBar from '../shared/CircularProgressBar';

export enum Direction {
  Down,
  Up
}

const defaultOnFinished = () => {};
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
    onFinished = defaultOnFinished
  }: FindingMatchmakingProps
) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  useEffect(() => {
    if (!title && !centerText) { return; }
    if (direction === Direction.Up) {
      setElapsedTime(0);
    } else if (direction === Direction.Down) {
      setElapsedTime(completedTimeInS);
    }
  }, [centerText, title, direction, setElapsedTime, completedTimeInS]);


  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      if (direction === Direction.Up) {
        setElapsedTime((et) => {
          if (et >= completedTimeInS) {
            onFinished();
          }
          return et + 1;
        });
      } else {
        setElapsedTime((et) => {
          if (et <= 0) {
            onFinished();
          }
          return et - 1;
        });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [setElapsedTime, onFinished, completedTimeInS, direction]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title}
      </div>
      <CircularProgressBar
        percentage={100 * (elapsedTime / completedTimeInS)}
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
