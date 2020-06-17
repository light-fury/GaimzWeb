import { Game } from 'src/models/match-interfaces';
import React from 'react';
import loadingSpinner from 'src/images/loadingSpinner.svg';

import styles from './GameSelector.module.css';


interface GameSelectorProps {
  games?: Game[];
  selectedGameId: string;
  onGameSelected(game: Game): void;
}
const GameSelector = (
  { games, selectedGameId = '1', onGameSelected }: GameSelectorProps
) => (
  <div className={styles.container}>
    {
    games
      ? games.map((game) => {
        const className = game.game_id === selectedGameId ? styles.selected : '';
        return (
          <button key={game.game_id} className={`${styles.gameBtn} ${className}`} onClick={() => onGameSelected(game)}>
            <img
              className={styles.gameBg}
              src={game.game_picture_url}
              alt={`${game.game_name} Background`}
            />
          </button>
        );
      })
      : (
        <img
          className={styles.loadingSpinner}
          src={loadingSpinner}
          alt="Loading Spinner"
        />
      )
}
  </div>
);

export default GameSelector;
