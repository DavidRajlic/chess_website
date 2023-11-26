import React, { useState } from 'react';
import './App.css';

const initialBoard = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
];

const isLowerCase = (piece) => piece === piece.toLowerCase();

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');

  const handlePieceClick = (row, col) => {
    const piece = board[row][col];

    if (piece && isLowerCase(piece) === (currentPlayer === 'black')) {
      setSelectedPiece({ piece, row, col });
    }
  };

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      const validMove = validateMove(selectedPiece, row, col);

      if (validMove) {
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[selectedPiece.row][selectedPiece.col] = null;
        newBoard[row][col] = selectedPiece.piece;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      }
      setSelectedPiece(null);
    }
  };

  const validateMove = (selected, row, col) => {
    const [startRow, startCol, piece] = [selected.row, selected.col, selected.piece.toLowerCase()];

    // Validate moves for each piece
    switch (piece) {
      case 'p':
        const forward = isLowerCase(selected.piece) ? -1 : 1;
        const startRowForColor = isLowerCase(selected.piece) ? 6 : 1;

        // Pawn moves
        if (startCol === col) {
          if (startRow + forward === row && board[row][col] === null) {
            return true;
          } else if (startRow === startRowForColor && startRow + 2 * forward === row && board[row][col] === null && board[startRow + forward][col] === null) {
            return true;
          }
        } else if (Math.abs(startCol - col) === 1 && startRow + forward === row && board[row][col] && isLowerCase(board[row][col]) !== isLowerCase(selected.piece)) {
          // Pawn captures diagonally
          return true;
        }
        break;

      case 'r':
        // Rook moves (straight lines)
        if (startRow === row || startCol === col) {
          if (startRow === row) {
            const step = startCol < col ? 1 : -1;
            for (let i = startCol + step; i !== col; i += step) {
              if (board[row][i] !== null) return false;
            }
          } else if (startCol === col) {
            const step = startRow < row ? 1 : -1;
            for (let i = startRow + step; i !== row; i += step) {
              if (board[i][col] !== null) return false;
            }
          }
          return true;
        }
        break;

        case 'n':
      // Knight moves (L-shape)
      const dx = Math.abs(col - startCol);
      const dy = Math.abs(row - startRow);
      return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);

    case 'b':
      // Bishop moves (diagonal lines)
      if (Math.abs(startRow - row) === Math.abs(startCol - col)) {
        const stepRow = startRow < row ? 1 : -1;
        const stepCol = startCol < col ? 1 : -1;
        for (let i = 1; i < Math.abs(startRow - row); i++) {
          if (board[startRow + i * stepRow][startCol + i * stepCol] !== null) {
            return false;
          }
        }
        return true;
      }
      return false;

    case 'q':
      // Queen moves (rook + bishop)
      if ((startRow === row || startCol === col) || Math.abs(startRow - row) === Math.abs(startCol - col)) {
        if (startRow === row) {
          // Rook-like moves
          const step = startCol < col ? 1 : -1;
          for (let i = startCol + step; i !== col; i += step) {
            if (board[row][i] !== null) return false;
          }
        } else if (startCol === col) {
          // Rook-like moves
          const step = startRow < row ? 1 : -1;
          for (let i = startRow + step; i !== row; i += step) {
            if (board[i][col] !== null) return false;
          }
        } else {
          // Bishop-like moves
          const stepRow = startRow < row ? 1 : -1;
          const stepCol = startCol < col ? 1 : -1;
          for (let i = 1; i < Math.abs(startRow - row); i++) {
            if (board[startRow + i * stepRow][startCol + i * stepCol] !== null) {
              return false;
            }
          }
        }
        return true;
      }
      return false;

    case 'k':
      // King moves (one square in any direction)
      const dxK = Math.abs(col - startCol);
      const dyK = Math.abs(row - startRow);
      return (dxK <= 1 && dyK <= 1);



      default:
        return false;
    }
  };

  return (
    <div className="App">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`square ${piece ? 'occupied' : ''} ${
                  selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'selected' : ''
                }`}
                onClick={() => {
                  if (selectedPiece) {
                    handleSquareClick(rowIndex, colIndex);
                  } else {
                    handlePieceClick(rowIndex, colIndex);
                  }
                }}
              >
                {piece}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;