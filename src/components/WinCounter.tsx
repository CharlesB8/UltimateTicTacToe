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

export default WinCounter;