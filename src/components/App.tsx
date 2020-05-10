import React from 'react';

// Components
import { Board } from './Board/Board';

// Constant
import {
  AMOUNT_OF_VERTICAL_BOARD_CELLS,
  AMOUNT_OF_HORIZONTAL_BOARD_CELLS,
} from '../constants';

// Styles
import './App.css';

function App() {
  const PARAMETER_FOR_WIN: number = Number(process.env.REACT_APP_C);
  return (
    <div className="App">
      <h1>{`Tic tac toe ${AMOUNT_OF_HORIZONTAL_BOARD_CELLS}x${AMOUNT_OF_VERTICAL_BOARD_CELLS}`}</h1>
      <span>{`Количество клеток подряд для победы ${PARAMETER_FOR_WIN}`}</span>
      <span>Первый ход в ячейку [0][0]</span>
      <Board />
    </div>
  );
}

export default App;
