import React from 'react';
import classnames from 'classnames';
// Types
import {CELL_TYPE} from '../../types';
// Styles
import './BoardCell.css';

interface IProps {
  disabled: boolean,
  onClick: any,
  type: CELL_TYPE,
}

const BoardCell: React.FunctionComponent<IProps> = ({ disabled, type, onClick }) => {
  const getCell = (type: CELL_TYPE) => {
    switch (type) {
      case CELL_TYPE.EMPTY:
        return <div className="BoardCell-empty" />;
      case CELL_TYPE.CROSS:
        return <div className="BoardCell-cross">+</div>;
      case CELL_TYPE.ZERO:
        return <div className="BoardCell-zero">o</div>;
      default:
        return <div className="BoardCell-empty" />;
    }
  };

  const cell = getCell(type);

  const onHandleClick = () => {
    if (disabled) {
      return false;
    }
    return onClick();
  };

  return (
    <div
      onClick={onHandleClick}
      className={classnames('BoardCell', {
        ['BoardCell-disabled']: type !== CELL_TYPE.EMPTY || disabled,
      })}
    >
      { cell }
    </div>
  )
};

const BoardCellComponent = BoardCell;

export { BoardCellComponent as BoardCell }
