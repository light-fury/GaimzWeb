import React from "react";
import styles from './MatchmakingVersusRow.module.css';
import sharedStyles from '../shared/sharedcss.module.css'
import {PlayerInterface} from "../MatchmakingVersus";
import direImg from 'src/images/matchmaking/direImage.svg';
import radiantImg from 'src/images/matchmaking/radiantImage.svg';

interface MatchmakingVersusRowProps {
  radiantPlayer: PlayerInterface;
  direPlayer: PlayerInterface;
}

const MatchmakingVersusRow = (props: MatchmakingVersusRowProps) => {
  return (
    <div className={sharedStyles.row}>
      <div className={`${sharedStyles.halfContainer} ${sharedStyles.row}`}>
        <img src={radiantImg}/>
        <div className={styles.playerText} style={{marginLeft: "1rem"}}>
          {props.radiantPlayer.user_id}
        </div>
      </div>
      <div className={`${sharedStyles.halfContainer} ${sharedStyles.row} ${sharedStyles.alignRight}`}>
        <div className={styles.playerText} style={{marginRight: "1rem"}}>
          {props.direPlayer.user_id}
        </div>
        <img src={direImg}/>
      </div>
    </div>
  )
}

export default MatchmakingVersusRow;
