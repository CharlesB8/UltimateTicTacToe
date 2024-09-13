import TicTacToe from "./TicTacToe";
import { useState } from "react";

function UltimateTicTacToe() {
    const [xIsNext, setXIsNext] = useState(true);

    return (
        <div className="inline-grid grid-cols-3 grid-rows-3">
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
            <TicTacToe xIsNext={xIsNext} setXIsNext={setXIsNext} />
        </div>
    )
}

export default UltimateTicTacToe;