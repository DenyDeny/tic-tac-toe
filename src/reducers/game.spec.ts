import reducer, { initialState, updateBoard } from './game';
import { EXECUTE_TURN } from '../constants';
import { CELL_TYPE, PLAYER_TURN } from '../types';

describe('game tests', () => {
  it('game is started', () => {

    const cell = [0, 0];
    const cellValue = CELL_TYPE.CROSS;
    const turn = PLAYER_TURN.CROSS_TURN;

    const action = {
      type: EXECUTE_TURN,
      payload: {
        cell,
        cellValue,
        turn,
      }
    };

    expect(reducer(initialState, action)).toEqual({
      board: updateBoard(initialState.board, { cell, cellValue, turn }),
      isStarted: true,
      isFinished: false,
      turn: PLAYER_TURN.ZERO_TURN,
    })
  })
});
