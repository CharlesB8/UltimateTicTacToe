import './Square.css'

interface SquareProps {
    value: string;
    onSquareClick: () => void;
    disabled?: boolean
}

function Square({ value, onSquareClick, disabled = false }: SquareProps) {
    return (
        <button
            className='square hover:bg-orange-400'
            data-testid='square'
            onClick={onSquareClick}
            disabled={disabled}
        >
            {value}
        </button>
    );
}

export default Square;