import './TicTacToe.css';
import './index.css';
import {useEffect, useState} from 'react';
import ResetButton from "./components/ResetButton";
import Board from "./components/Board";
import WinCounter from "./components/WinCounter";
import calculateTicTacToeWinner from "./calculateTicTacToeWinner";

function TicTacToe() {
    const initialBoard = Array(9).fill(null);
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(initialBoard);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);

    const winner = calculateTicTacToeWinner(squares);

    function handleClick(i: number) {
        if (squares[i] || winner) {
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
        } else if (winner === "O") {/**/
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
            <Board squares={squares} onSquareClick={handleClick}/>
            <ResetButton onReset={reset}/>
            <WinCounter xWins={xWins} oWins={oWins}/>
        </>
    )
}


export default TicTacToe