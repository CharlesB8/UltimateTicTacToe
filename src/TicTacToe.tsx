import './TicTacToe.css';
import './index.css';
import {useEffect, useState} from 'react';
//
// interface TicTacToeProps {
//     xIsNext: boolean
//     setXIsNext: () => void
// }

function TicTacToe({ xIsNext, setXIsNext }) {
    const initialBoard = Array(9).fill(null)
    const [squares, setSquares] = useState(initialBoard)
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);

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
    } else if (winner === "") {
        status = "Cat's game! Better luck next time. Try again?"
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O")
    }

    useEffect(() => {
        if (winner === "X") {
            setXWins((prevXWins) => prevXWins + 1);
        } else if (winner === "O") {
            setOWins((prevOWins) => prevOWins + 1);
        }
    }, [winner]);


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
        <div>
            <div className='flex justify-center' data-testid='tictactoe-board'>
                <div className='board border-4 border-black'>
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
        </div>
    )
}

interface SquareProps {
    value: string;
    onSquareClick: () => void;
}

interface WinCounterProps {
    xWins: number;
    oWins: number;
}

function WinCounter({ xWins, oWins }: WinCounterProps) {
    return (
        <>
            <div> X wins: {xWins} </div>
            <div> O wins: {oWins} </div>
        </>
    )
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


export default TicTacToe

function calculateWinner(squares: Array<string | null>) {
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

    if (!squares.includes(null)) {
        return "";
    }

    return null;
}
