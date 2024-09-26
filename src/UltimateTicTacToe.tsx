import Board from "./components/Board";
import {useState} from "react";
import calculateTicTacToeWinner from "./calculateTicTacToeWinner";
import WinCounter from "./components/WinCounter";

const initialBoard = Array(9).fill(Array(9).fill(null));

function UltimateTicTacToe() {
    const [xIsNext, setXIsNext] = useState(true);
    const [board, setBoard] = useState(initialBoard);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);


    function handleClick(boardIndex: number, squareIndex: number) {
        const boardAlreadyWon = calculateTicTacToeWinner(board[boardIndex])
        if (board[boardIndex][squareIndex] || boardAlreadyWon) {
            return;
        }

        const nextBoard = board.map(subBoard => subBoard.slice());

        nextBoard[boardIndex][squareIndex] = xIsNext ? "X" : "O";

        const winner = calculateTicTacToeWinner(nextBoard[boardIndex])

        if (winner === "X") {
            setXWins((prevXWins) => prevXWins + 1);
        } else if (winner === "O") {
            setOWins((prevOWins) => prevOWins + 1);
        }

        setBoard(nextBoard);
        setXIsNext(!xIsNext);
    }



    return (
        <div>
            <WinCounter xWins={xWins} oWins={oWins}/>
            <div className="inline-grid grid-cols-3 grid-rows-3" data-testid="ultimate-tictactoe">
                {board.map((squares, boardIndex) => (
                    <div className="border-8" key={boardIndex}>
                        <Board onSquareClick={(squareIndex) => handleClick(boardIndex, squareIndex)} squares={squares}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UltimateTicTacToe;