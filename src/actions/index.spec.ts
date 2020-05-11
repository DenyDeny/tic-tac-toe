import { executeTurn } from './index';
import { EXECUTE_TURN } from '../constants';
import { CELL_TYPE, PLAYER_TURN } from '../types';

describe('game actions tests', () => {
  it('execute turn', () => {
    const cell = [0, 0];
    const cellValue = CELL_TYPE.CROSS;
    const turn = PLAYER_TURN.CROSS_TURN;
    expect(executeTurn({ cell, cellValue, turn })).toEqual({
      type: EXECUTE_TURN,
      payload: {
        cell,
        cellValue,
        turn,
      }
    })
  })
});
