import React from 'react';
import direImg from 'src/images/matchmaking/direImage.svg';
import radiantImg from 'src/images/matchmaking/radiantImage.svg';
import styles from './MatchmakingVersusRow.module.css';
import sharedStyles from '../shared/sharedcss.module.css';
import { PlayerInterface } from '../../utils/MatchmakingModels';

interface MatchmakingVersusRowProps {
  radiantPlayer: PlayerInterface;
  direPlayer: PlayerInterface;
}

const MatchmakingVersusRow = (props: MatchmakingVersusRowProps) => (
  <div className={sharedStyles.row}>
    <div className={`${sharedStyles.halfContainer} ${sharedStyles.row}`}>
      <div className={props.radiantPlayer.won == true ? styles.borderedWonImg : props.radiantPlayer.won == false ? styles.borderedLostImg : ''}>
        <img src={radiantImg} />
      </div>
      <div className={styles.playerText} style={{ marginLeft: '1rem' }}>
        {props.radiantPlayer.user_id}
      </div>
    </div>
    <div className={`${sharedStyles.halfContainer} ${sharedStyles.row} ${sharedStyles.alignRight}`}>
      <div className={styles.playerText} style={{ marginRight: '1rem' }}>
        {props.direPlayer.user_id}
      </div>
      <div className={props.direPlayer.won == true ? styles.borderedWonImg : props.direPlayer.won == false ? styles.borderedLostImg : ''}>
        <img src={direImg} />
      </div>
    </div>
  </div>
);

export default MatchmakingVersusRow;
