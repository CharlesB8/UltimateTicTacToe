import './Square.css'
import classNames from "classnames";

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
            className={classNames('square hover:bg-gray-300', {
                "text-sky-700": value == "O",
                "text-rose-700": value == "X"
            })}
            data-testid='square'
            onClick={handleClick}
            disabled={disabled}
        >
            {value}
        </button>
    );
}

export default Square;