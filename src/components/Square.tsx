import './Square.css'

interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
    disabled?: boolean
}

function Square({ value, onSquareClick, disabled = false }: SquareProps) {
    function handleClick() {
        if (value) {
            return;
        } else {
            onSquareClick();
        }
    }

    return (
        <button
            className='square hover:bg-orange-400'
            data-testid='square'
            onClick={handleClick}
            disabled={disabled}
        >
            {value}
        </button>
    );
}

export default Square;