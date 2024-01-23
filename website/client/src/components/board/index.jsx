import React from 'react';
import PropTypes from 'prop-types';
import './board.styles.css';
import Cell from '../cell';

const isPort3000 = window.location.port === '3000';
const Board = ({ cells, ...props }) => {
    return (
        <div className={isPort3000 ? 'board' : 'board1'}>
            {cells.map((cell, index) => {
                return (
                    <Cell cell={cell} index={index} key={cell.pos} {...props} />
                );
            })}
        </div>
    );
};

Board.prototype = {
	cells: PropTypes.array.isRequired,
	makeMove: PropTypes.func,
	setFromPos: PropTypes.func,
};
export default Board;
