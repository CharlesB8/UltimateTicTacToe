import Square from './Square'
import classNames from 'classnames'

interface BoardProps {
    squares: Array<string | null>
    onSquareClick: (square: number) => void
    disabled?: boolean
}

function Board({ squares, onSquareClick, disabled = false }: BoardProps) {

    return (
        <div className='flex justify-center' data-testid='tictactoe-board'>
            <div className={classNames('board', {'is-disabled': disabled})}>
                <div className='flex'>
                    <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} disabled={disabled}/>
                    <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} disabled={disabled}/>
                    <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} disabled={disabled}/>
                </div>
                <div className='flex'>
                    <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} disabled={disabled}/>
                    <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} disabled={disabled}/>
                    <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} disabled={disabled}/>
                </div>
                <div className='flex'>
                    <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} disabled={disabled}/>
                    <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} disabled={disabled}/>
                    <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} disabled={disabled}/>
                </div>
            </div>
        </div>
    )
}

export default Board;