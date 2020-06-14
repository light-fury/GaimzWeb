import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import styles from './CircularProgressBar.module.css';
import 'react-circular-progressbar/dist/styles.css';

interface FindingMatchmakingProps {
  children: any;
  percentage: number;
}

const CircularProgressBar = ({ percentage, children }: FindingMatchmakingProps) => (
  <div className={styles.progressCircleCenterContainer}>
    <div className={styles.progressCircleContainer}>
      <CircularProgressbarWithChildren
        value={percentage}
        styles={{
          path: {
            // Path color
            stroke: '#6027d7',
          }
        }}
        strokeWidth={3}
      >
        {children}
      </CircularProgressbarWithChildren>
    </div>
  </div>
);

export default CircularProgressBar;
