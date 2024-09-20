import Board from "./components/Board";
import { useState } from "react";

const initialBoard = Array(9).fill(Array(9).fill(null));

function UltimateTicTacToe() {
    const [xIsNext, setXIsNext] = useState(true);
    const [board, setBoard] = useState(initialBoard);

    function handleClick(boardIndex: number, squareIndex: number) {
        if (board[boardIndex][squareIndex]) {
            return;
        }

       const nextBoard = board.map(subBoard => subBoard.slice());

        nextBoard[boardIndex][squareIndex] = xIsNext ? "X" : "O";

        setBoard(nextBoard);
        setXIsNext(!xIsNext);
    }


        return (
        <div className="inline-grid grid-cols-3 grid-rows-3" data-testid="ultimate-tictactoe">
            {board.map((squares, boardIndex ) => (
                <div className="border-8" key={boardIndex}>
                    <Board  onSquareClick={(squareIndex) => handleClick(boardIndex, squareIndex)} squares={squares} />
                </div>
            ))}
        </div>
    )
}

export default UltimateTicTacToe;