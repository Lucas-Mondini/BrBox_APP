import React from 'react';
import {GameProvider} from '../../Contexts/Game';
import GameInfo from './GameInfo';

const GameInfoPage = () => {
  return (
    <GameProvider>
      <GameInfo />
    </GameProvider>
  );
};

export default GameInfoPage;
