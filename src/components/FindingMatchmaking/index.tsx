import React, {useEffect, useState} from 'react';
import styles from './FindingMatchmaking.module.css';
import CircularProgressBar from "../CircularProgressBar";

interface FindingMatchmakingProps {

}

const FindingMatchmaking = ({}: FindingMatchmakingProps) => {

  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    runElapsedTimeCounter();
  });

  useEffect(() => {
    runElapsedTimeCounter();
  }, [elapsedTime]);

  const runElapsedTimeCounter = () => {
    let newTime = elapsedTime;
    setTimeout(() => setElapsedTime(newTime++), 1000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Finding Match...
      </div>
      <CircularProgressBar percentage={20}
                           children={
                             <div className={styles.elapsedTime}>
                               {`${elapsedTime} seconds`}
                             </div>
                           }
      />
    </div>
  );
};

export default FindingMatchmaking;
