import './UltimateTicTacToe.css';
import './index.css';
import { useState } from 'react';

function UltimateTicTacToe() {

  return (
      <div>
          <GameBoard />
      </div>
  );
}

interface SquareProps {
    value: string;
    onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
    return (
        <button
            className='square hover:bg-orange-400'
            data-testid='square'
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function GameBoard() {
    const initialBoard = Array(9).fill(null)
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(initialBoard)

    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (winner === 0) {
        status = "Cat's game! Better luck next time. Try again?"
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O")
    }

    function ResetGame() {
        function reset() {
            setSquares(initialBoard);
            setXIsNext(true)
        }

        return (
            <button
                data-testid='reset'
                onClick={reset}
            >Reset Game</button>
        )
    }


    return (
        <>
        <div className='status' data-testid='status'>{status}</div>
        <div className='flex justify-center'>
            <div className='board'>
                    <div className='flex'>
                        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
                    </div>
                    <div className='flex'>
                        <Square value={squares[3]}  onSquareClick={() => handleClick(3)}/>
                        <Square value={squares[4]}  onSquareClick={() => handleClick(4)}/>
                        <Square value={squares[5]}  onSquareClick={() => handleClick(5)}/>
                    </div>
                    <div className='flex'>
                        <Square value={squares[6]}  onSquareClick={() => handleClick(6)}/>
                        <Square value={squares[7]}  onSquareClick={() => handleClick(7)}/>
                        <Square value={squares[8]}  onSquareClick={() => handleClick(8)}/>
                    </div>
                </div>
            </div>
            <ResetGame />
        </>
    )
}


export default UltimateTicTacToe

function calculateWinner(squares: Array<number>) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    if (!squares.some((num) => num === null)) {
        return 0;
    }

    return null;
}
