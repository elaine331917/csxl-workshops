import React, { useState } from 'react';

function Square({ value, onSquareClick, isWinningSquare }) {
  const classNames = isWinningSquare ? "square winning" : "square";
  return <button className={classNames} onClick={onSquareClick}>{value}</button>
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningSquares: [a, b, c],
      };
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    const winnerInfo = calculateWinner(nextSquares);
    if (winnerInfo) {
      onPlay(nextSquares, winnerInfo.winningSquares);
    } else {
      onPlay(nextSquares, []);
    }
  }

  const winnerInfo = calculateWinner(squares);
  let status;
  if (winnerInfo) {
    status = "Winner: " + winnerInfo.winner + "!";
  } else if (squares.every((square) => square)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={winnerInfo && winnerInfo.winningSquares.includes(8)}/>
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === currentMove) {
      description = `You are at move #${move}`;
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move} className="travel-buttons">
        {move === currentMove ? (
          <span className="current-move">{description}</span>
        ) : (
          <button className="travel-button" onClick={() => jumpTo(move)}>
            {description}
          </button>
        )}
      </li>
    )
  })

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    </div>
    
  )
}
