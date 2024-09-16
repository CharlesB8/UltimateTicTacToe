import {fireEvent, render, screen} from '@testing-library/react';
import Board from './Board';

describe('when the board is disabled', () => {
    it('prevents the square from being clicked', () => {
        const boardState = Array(9).fill(null);
        const mockClick = jest.fn();

        render(<Board squares={boardState} onSquareClick={mockClick} disabled />)

        const squares = screen.getAllByTestId('square')
        fireEvent.click(squares[0]);

        expect(mockClick).not.toHaveBeenCalled();
    })
})