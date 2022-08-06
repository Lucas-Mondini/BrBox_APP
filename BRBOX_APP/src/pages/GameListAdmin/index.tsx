import React from 'react';
import { GameProvider } from '../../Contexts/Game';
import GameListAdmin from './GameListAdmin';

const GameListAdminPage = () => {
  return (
    <GameProvider>
      <GameListAdmin />
    </GameProvider>
  );
};

export default GameListAdminPage;