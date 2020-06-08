import React from 'react';
import styles from './CircularProgressBar.module.css';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface FindingMatchmakingProps {
  children: any;
  percentage: number;
}

const CircularProgressBar = (props: FindingMatchmakingProps) => {

  return (
    <div className={styles.progressCircleCenterContainer}>
      <div className={styles.progressCircleContainer}>
        <CircularProgressbarWithChildren value={props.percentage}
                                         styles={{
                                           path: {
                                             // Path color
                                             stroke: `#6027d7`,
                                           }
                                         }}
                                         strokeWidth={3}>
          {props.children}
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default CircularProgressBar;
