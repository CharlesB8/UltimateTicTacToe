import './TicTacToe.css';
import './index.css';
import {useEffect, useState} from 'react';
import ResetButton from "./components/ResetButton";
import Board from "./components/Board";
import WinCounter from "./components/WinCounter";

function TicTacToe() {
    const initialBoard = Array(9).fill(null)
    const [xIsNext, setXIsNext] = useState(true);
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

    function reset() {
        setSquares(initialBoard);
        setXIsNext(true)
    }

    return (
        <>
            <div className='status' data-testid='status'>{status}</div>
            <Board squares={squares} onSquareClick={handleClick} />
            <ResetButton onReset={reset} />
            <WinCounter xWins={xWins} oWins={oWins} />
        </>
    )
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
