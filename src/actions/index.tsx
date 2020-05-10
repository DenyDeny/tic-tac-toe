import { EXECUTE_TURN } from '../constants';
import { CELL_TYPE, PLAYER_TURN } from '../types';

export interface IPayload {
  cell: [number, number],
  cellValue: CELL_TYPE,
  turn: PLAYER_TURN,
}

export interface IAction {
  type: string,
  payload: IPayload,
}

export const executeTurn = ({ cell, cellValue, turn }: IPayload): IAction => ({
  type: EXECUTE_TURN,
  payload: {
    cell,
    cellValue,
    turn,
  }
});
