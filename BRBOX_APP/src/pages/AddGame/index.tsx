import React  from 'react';
import { GameProvider } from '../../Contexts/Game';

import AddGame from './AddGame';

const AddGamePage = () => {
  return (
    <GameProvider>
      <AddGame />
    </GameProvider>
  );
};

export default AddGamePage;