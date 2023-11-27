import React from 'react';
import './App.css';
import { useState } from 'react';
import pawnW from './images/pawn_w.png';
import bishopW from './images/bishop_w.png';
import knightW from './images/knight_w.png';
import rookW from './images/rook_w.png';
import queenW from './images/queen_w.png';
import pawnB from './images/pawn_b.png';
import rookB from './images/rook_b.png';
import knightB from './images/knight_b.png';
import bishopB from './images/bishop_b.png';
import kingB from './images/king_b.png';
import queenB from './images/queen_b.png';
import kingW from './images/king_w.png';

const App = () => {
  const [board, setBoard] = useState([
    [rookB, knightB, bishopB, queenB, kingB, bishopB, knightB, rookB],
    [pawnB, pawnB, pawnB, pawnB, pawnB, pawnB, pawnB, pawnB],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    [pawnW, pawnW, pawnW, pawnW, pawnW, pawnW, pawnW, pawnW],
    [rookW, knightW, bishopW, queenW, kingW, bishopW, knightW, rookW],
  ]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handlePieceClick = (row, col) => {
    const piece = board[row][col];

    if (piece) {
      setSelectedPiece({ piece, row, col });
    }
  };

  const isOpponent = (piece1, piece2) => {
    
    return (isWhitePiece(piece1) && isBlackPiece(piece2)) || (isBlackPiece(piece1) && isWhitePiece(piece2));
  };
  
  const isWhitePiece = (piece) => {
    // Checking if piece is white 
    return piece === pawnW || piece === rookW || piece === knightW ;
  };
  
  const isBlackPiece = (piece) => {
    // Checking if piece is black
    return piece === pawnB || piece === rookB || piece === knightB ;
  };
  

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      const { piece, row: startRow, col: startCol } = selectedPiece;
  
      if (board[startRow][startCol] === piece) {
        let isValidMove = false;
  
        switch (piece) {
          case pawnW:
          case pawnB:
            isValidMove = handlePawnMove(startRow, startCol, row, col, piece);
            break;
          case bishopW:
          case bishopB:
            isValidMove = handleBishopMove(startRow, startCol, row, col, piece);
            break;
            case knightW:
            case knightB:
              isValidMove = handleKnightMove(startRow,startCol,row,col,piece);
              break;
            case rookW:
            case rookB:
                  isValidMove = handleRookMove(startRow,startCol,row,col,piece);
              break;
            case kingW:
            case kingB:
                  isValidMove = handleKingMove(startRow,startCol,row,col,piece);
              break;
            case queenW:
            case queenB:
                      isValidMove = handleQueenMove(startRow,startCol,row,col,piece);
                  break;
          default:
            break;
        }
  
        if (isValidMove) {
          const newBoard = [...board];
          newBoard[startRow][startCol] = null;
          newBoard[row][col] = piece;
          setBoard(newBoard);
          setSelectedPiece(null);
        }
      }
    }
  };
  
  const handlePawnMove = (startRow, startCol, row, col, piece) => {
    const forward = piece === pawnW ? -1 : 1;
    const startRowForColor = piece === pawnW ? 6 : 1;
  
    // Pawn moves
    if (startCol === col) {
      if (startRow + forward === row && board[row][col] === null) {
        return true;
      } else if (startRow === startRowForColor && startRow + 2 * forward === row && board[row][col] === null && board[startRow + forward][col] === null) {
        return true;
      }
    } else if (Math.abs(startCol - col) === 1 && startRow + forward === row && board[row][col] && isOpponent(board[row][col], piece)) {
      // Pawn captures diagonally
      return true;
    }
    return false;
  };
  
  const handleBishopMove = (startRow, startCol, row, col, piece) => {
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
  };

  const handleKnightMove = (startRow, startCol, row, col) => {
    const dx = Math.abs(col - startCol);
    const dy = Math.abs(row - startRow);
    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
  };

  const handleRookMove = (startRow, startCol, row, col, piece) => {
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
    return false;
  };
  

  
  
  
  const handleKingMove = (startRow, startCol, row, col) => {
    const dx = Math.abs(col - startCol);
    const dy = Math.abs(row - startRow);
    return dx <= 1 && dy <= 1;
  };
  

  const handleQueenMove = (startRow, startCol, row, col, piece) => {
    // Queen moves (combination of rook and bishop moves)
    if ((startRow === row || startCol === col) || Math.abs(startRow - row) === Math.abs(startCol - col)) {
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
      } else {
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
  };
 

const handleSquareDrop = (row, col) => {
  if (selectedPiece && (
    selectedPiece.piece === pawnW || 
    selectedPiece.piece === pawnB || 
    selectedPiece.piece === bishopW || 
    selectedPiece.piece === bishopB || 
    selectedPiece.piece === knightW || 
    selectedPiece.piece === knightB || 
    selectedPiece.piece === rookW || 
    selectedPiece.piece === rookB || 
    selectedPiece.piece === kingW || 
    selectedPiece.piece === kingB || 
    selectedPiece.piece === queenW || 
    selectedPiece.piece === queenB
  )) {
    handleSquareClick(row, col);
  }
};

return (
  <div className="App">
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((piece, colIndex) => (
            <div
              className="square"
              key={`${rowIndex}-${colIndex}`}
              onClick={() => {
                if (selectedPiece) {
                  handleSquareClick(rowIndex, colIndex);
                } else {
                  handlePieceClick(rowIndex, colIndex);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleSquareDrop(rowIndex, colIndex)}
              draggable={(piece === pawnW || piece === pawnB || piece === bishopW || piece === bishopB || piece === knightW || piece === knightB || piece === rookW || piece === rookB || piece === kingW || piece === kingB || piece === queenW || piece === queenB)}
              onDragStart={() => setSelectedPiece({ piece, row: rowIndex, col: colIndex })}
            >
              {piece && <img src={piece} width={"15px"} alt="Chess Piece" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
};
 export default App;           
