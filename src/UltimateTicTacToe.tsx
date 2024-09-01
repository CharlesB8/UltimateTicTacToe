import './UltimateTicTacToe.css'
import { useState } from 'react';

function UltimateTicTacToe() {

  return (
      <div>
          <h1 className='text-orange-500 text-5xl'>something</h1>
          <div className='flex justify-center'>
              <GameBoard />
          </div>
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
            className='square'
            data-testid='square'
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function GameBoard() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null))

    function handleClick(i: number) {
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    return (
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
    )
}


export default UltimateTicTacToe
