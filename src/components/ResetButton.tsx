function ResetButton({ onReset }: { onReset: () => void }) {
    return (
        <button
            data-testid='reset'
            onClick={onReset}
        >Reset Game</button>
    )
}

export default ResetButton