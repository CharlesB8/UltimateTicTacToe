interface WinCounterProps {
    xWins: number;
    oWins: number;
}

function WinCounter({ xWins, oWins }: WinCounterProps) {
    return (
        <>
            <div data-testid="x-wins"> X wins: {xWins} </div>
            <div data-testid="o-wins"> O wins: {oWins} </div>
        </>
    )
}

export default WinCounter;