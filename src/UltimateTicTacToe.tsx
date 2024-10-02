import Board from "./components/Board";
import {useState} from "react";
import calculateTicTacToeWinner from "./calculateTicTacToeWinner";
import WinCounter from "./components/WinCounter";

function createBoard() {
    return Array(9).fill(null).map<BoardWithCachedWinner>(() => {
        return {
            board: Array(9).fill(null),
            winner: null
        }
    });
}

interface BoardWithCachedWinner {
    board: BoardType;
    winner: "X" | "O" | "" | null
}

type BoardType = Array<"X" | "O" | null>

function UltimateTicTacToe() {
    const [xIsNext, setXIsNext] = useState(true);
    const [board, setBoard] = useState<Array<BoardWithCachedWinner>>(createBoard());
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);


    function handleClick(boardIndex: number, squareIndex: number) {
        const nextUltBoard = board
        const nextBoard = board.map(subBoard => subBoard.board.slice());

        nextBoard[boardIndex][squareIndex] = xIsNext ? "X" : "O";

        const winner = calculateTicTacToeWinner(nextBoard[boardIndex])


        if (winner === "X") {
            setXWins((prevXWins) => prevXWins + 1);
        } else if (winner === "O") {
            setOWins((prevOWins) => prevOWins + 1);
        }

        nextUltBoard[boardIndex] = {
            board: nextBoard[boardIndex],
            winner: winner
        } as BoardWithCachedWinner;

        setBoard(nextUltBoard);
        setXIsNext(!xIsNext);
    }



    return (
        <div>
            <WinCounter xWins={xWins} oWins={oWins}/>
            <div className="inline-grid grid-cols-3 grid-rows-3" data-testid="ultimate-tictactoe">
                {board.map((subBoard, boardIndex) => (
                    <div className="border-8" key={boardIndex}>
                        <Board onSquareClick={(squareIndex) => handleClick(boardIndex, squareIndex)} squares={subBoard.board} disabled={subBoard.winner !== null}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UltimateTicTacToe;