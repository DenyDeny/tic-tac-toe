import React, {Fragment} from 'react';
import {connect, useDispatch} from 'react-redux';
// Actions
import {executeTurn, IPayload} from '../../actions';
// Components
import {BoardCell} from '../BoardCell/BoardCell';
// Types
import {CELL_TYPE, GAME, PLAYER_TURN} from '../../types';
// Styles
import './Board.css';

interface IProps {
  game: GAME,
}

const Board: React.FunctionComponent<IProps> = ({ game: { board, isStarted, isFinished, turn } }) => {
  const dispatch = useDispatch();
  const playerTurn =
    turn === PLAYER_TURN.CROSS_TURN ?
    `${PLAYER_TURN.CROSS_TURN} turn`
    :
    `${PLAYER_TURN.ZERO_TURN} turn`;

  const winner = `Победитель: ${turn}`;

  const onCellClick = ({ cell, cellValue, turn }: IPayload, type: CELL_TYPE) => {
    if (type !== CELL_TYPE.EMPTY || isFinished) {
      return false
    }
    return dispatch(executeTurn( { cell, cellValue, turn } ));
  };

  const cellValue = turn === PLAYER_TURN.CROSS_TURN ? CELL_TYPE.CROSS : CELL_TYPE.ZERO;

  const drawBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="Board-row">
        {
          row.map((type, columnIndex) =>
            <BoardCell
              key={`${rowIndex}-${columnIndex}`}
              disabled={!isStarted && [rowIndex][columnIndex] !== [0][0]}
              type={type}
              onClick={() => onCellClick({ cellValue, cell: [rowIndex, columnIndex], turn }, type)}
            />
          )
        }
      </div>
    ));
  };

  return (
    <Fragment>
      <h2>{ !isFinished ? playerTurn : winner }</h2>
      <div className="Board">{ drawBoard() }</div>
    </Fragment>
  )
};

const mapStateToProps = (state: any) => ({
  game: state.game,
});

const BoardComponent = connect(mapStateToProps)(Board);

export { BoardComponent as Board };
