import { CELL_TYPE, GAME, PLAYER_TURN } from '../types';
import { IAction, IPayload } from '../actions';

import { AMOUNT_OF_HORIZONTAL_BOARD_CELLS,
  AMOUNT_OF_VERTICAL_BOARD_CELLS,
  EXECUTE_TURN,
} from '../constants';

const initBoard = () =>
  Array.from({ length: AMOUNT_OF_HORIZONTAL_BOARD_CELLS }, () =>
  Array.from({ length: AMOUNT_OF_VERTICAL_BOARD_CELLS }, () => CELL_TYPE.EMPTY),
);

export const initialState: GAME = {
  board: initBoard(),
  turn: PLAYER_TURN.CROSS_TURN,
  isStarted: false,
  isFinished: false,
};

const PARAMETER_FOR_WIN: number = Number(process.env.REACT_APP_C);

export const updateBoard = (oldBoard: CELL_TYPE[][], { cell: [cellCoordX, cellCoordY], cellValue }: IPayload) => {
  return oldBoard.map((row, rowIndex) => {
    if (rowIndex === cellCoordX) {
      return row.map((currentCellvalue, columnIndex) => columnIndex === cellCoordY ? cellValue : currentCellvalue);
    }
    return row;
  });
};

const getCell = (board: CELL_TYPE[][], [cellCoordX, cellCoordY]: [number, number]) => {
  if (board[cellCoordX]) return board[cellCoordX][cellCoordY];
  return undefined;
};

const checkOnHorizontal = (board: CELL_TYPE[][], [cellCoordX, cellCoordY]: [number, number], type: CELL_TYPE) => {
  return Array
    .from({ length: PARAMETER_FOR_WIN },
    (_, value) => getCell(board,[cellCoordX, cellCoordY + value])
    )
    .every((element) => element === type)
};

const checkOnVertical = (board: CELL_TYPE[][], [cellCoordX, cellCoordY]: [number, number], type: CELL_TYPE) => {
  return Array
    .from({ length: PARAMETER_FOR_WIN },
    (_, value) => getCell(board,[cellCoordX + value, cellCoordY])
    )
    .every((element) => element === type)
};

const checkOnCross = (board: CELL_TYPE[][], [cellCoordX, cellCoordY]: [number, number], type: CELL_TYPE) => {
  return Array
    .from({ length: PARAMETER_FOR_WIN },
      (_, value) => getCell(board,[cellCoordX + value, cellCoordY + value])
    )
    .every((element) => element === type)
};

const checkOnAntiCross = (board: CELL_TYPE[][], [cellCoordX, cellCoordY]: [number, number], type: CELL_TYPE) => {
  return Array
    .from({ length: PARAMETER_FOR_WIN },
      (_, value) => getCell(board,[cellCoordX + value, cellCoordY - value])
    )
    .every((element) => element === type)
};

const checkGameIsFinished = (board: CELL_TYPE[][], type: CELL_TYPE) => {
  for (let x = 0; x < AMOUNT_OF_HORIZONTAL_BOARD_CELLS; x++) {
    for (let y = 0; y < AMOUNT_OF_VERTICAL_BOARD_CELLS; y++) {
      if (
        checkOnHorizontal(board, [x, y], type) ||
        checkOnVertical(board, [x, y], type) ||
        checkOnCross(board, [x, y], type) ||
        checkOnAntiCross(board, [x, y], type)

      ) {
        return true;
      }
    }
  }
  return false;
};

const changeTurn = (turn: PLAYER_TURN): PLAYER_TURN =>
  turn === PLAYER_TURN.CROSS_TURN ? PLAYER_TURN.ZERO_TURN : PLAYER_TURN.CROSS_TURN;

export default function game(state = initialState, action: IAction) {
  switch (action.type) {
    case EXECUTE_TURN:
      const { payload: { cell, cellValue, turn } } = action;

      const updatedBoard = updateBoard(state.board, { cell, cellValue, turn });
      const isFinished = checkGameIsFinished(updatedBoard, cellValue);

      const nextTurn = isFinished ? turn : changeTurn(turn);

      return {
        ...state,
        isStarted: true,
        isFinished,
        board: updatedBoard,
        turn: nextTurn,
      };
    default:
      return state;
  }
};
