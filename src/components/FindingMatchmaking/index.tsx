import React, { useEffect, useState } from 'react';
import styles from './FindingMatchmaking.module.css';
import CircularProgressBar from '../CircularProgressBar';

interface FindingMatchmakingProps {

}

const FindingMatchmaking = ({}: FindingMatchmakingProps) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    startCounting();
  }, []);

  const startCounting = () => {
    setTimeout(() => runElapsedTimeCounter(elapsedTime), 1000);
  };

  const runElapsedTimeCounter = (count: number) => {
    count++;
    setElapsedTime(count);
    setTimeout(() => runElapsedTimeCounter(count), 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Finding Match...
      </div>
      <CircularProgressBar
        percentage={20}
        children={(
          <div className={styles.elapsedTime}>
            {`${elapsedTime} seconds`}
          </div>
                           )}
      />
      <div className={styles.descriptionText}>
        Double click the timer to hide the search and explore Gaimz. We will notify you when the match is found.
      </div>
    </div>
  );
};

export default FindingMatchmaking;
