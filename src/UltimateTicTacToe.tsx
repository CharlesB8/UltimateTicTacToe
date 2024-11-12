import Board from "./components/Board";
import { useState } from "react";
import calculateTicTacToeWinner from "./calculateTicTacToeWinner";
import WinCounter from "./components/WinCounter";

function createBoard() {
    return Array(9).fill(null).map<BoardWithCachedWinner>(() => {
        return {
            board: Array(9).fill(null),
            winner: null,
            disabled: false
        }
    });
}

interface BoardWithCachedWinner {
    board: BoardType;
    winner: "X" | "O" | "" | null
    disabled: boolean
}

type BoardType = Array<"X" | "O" | null>

function simplifiedUltimateBoard(board: BoardWithCachedWinner[]) {
    return board.map(subBoard =>  {
        if (!subBoard.winner) {
            return null;
        } else {
            return subBoard.winner;
        }
    });
}

function UltimateTicTacToe() {
    const [xIsNext, setXIsNext] = useState(true);
    const [board, setBoard] = useState<Array<BoardWithCachedWinner>>(createBoard());
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [ultimateWinner, setUltimateWinner] = useState<string | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    function setWins(winner: "X" | "O" | "" | null) {
        if (winner === "X") {
            setXWins((prevXWins) => prevXWins + 1);
        } else if (winner === "O") {
            setOWins((prevOWins) => prevOWins + 1);
        }
    }


    function handleClick(boardIndex: number, squareIndex: number) {

        const nextUltBoard = [...board];
        const nextSubBoard = nextUltBoard[boardIndex];

        const currentPlayer = xIsNext ? "X" : "O";

        nextSubBoard.board[squareIndex] = currentPlayer;
        nextSubBoard.winner = calculateTicTacToeWinner(nextSubBoard.board)
        setWins(nextSubBoard.winner)
        nextSubBoard.disabled = nextSubBoard.winner !== null;

        const subPlayOnSuper = nextUltBoard[squareIndex]

        if (subPlayOnSuper.winner) {
            board.forEach(board => {
                if (!board.winner) {
                    board.disabled = false
                }
            })
        } else {
            for (let i = 0; i < nextUltBoard.length; i++) {
                if (i === squareIndex){
                    nextUltBoard[i].disabled = false
                } else {
                    nextUltBoard[i].disabled = true
                }
            }
        }



        setBoard(nextUltBoard);
        setXIsNext(!xIsNext);

        const ultWinner = calculateTicTacToeWinner(simplifiedUltimateBoard(nextUltBoard))
        if (ultWinner) {
            setDisabled(true)
            setUltimateWinner(ultWinner)
        }
    }



    return (
        <div>
            <div className="text-xl font-bold" data-testid="ultimate-winner">
                {ultimateWinner ? `${ultimateWinner} is the ultimate winner!` : "Who will be the ultimate winner?"}
            </div>
            <WinCounter xWins={xWins} oWins={oWins}/>
            <div className="inline-grid grid-cols-3 grid-rows-3" data-testid="ultimate-board">
                {board.map((subBoard, boardIndex) => (
                    <div className="border-8" key={boardIndex}>
                        <Board
                            onSquareClick={(squareIndex) => handleClick(boardIndex, squareIndex)}
                            squares={subBoard.board}
                            disabled={disabled ? true : subBoard.disabled}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UltimateTicTacToe;