import {fireEvent, render, screen} from '@testing-library/react';
import UltimateTicTacToe from "./UltimateTicTacToe";

beforeEach(() => {
        render(<UltimateTicTacToe/>)
});

test('renders the tic tac toe board', () => {
    const element= render(<UltimateTicTacToe />);
    expect(element).toBeTruthy();
});

test('X appears when square is clicked', () => {
    const square = screen.getAllByTestId('square')[0] as HTMLButtonElement;

    expect(square).not.toContainHTML('X')
    fireEvent.click(square);
    expect(square).toContainHTML('X')
});

test('O appears after X has played', () => {
    const squares = screen.getAllByTestId('square');

    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);

    expect(squares[0]).toContainHTML('X')
    expect(squares[1]).toContainHTML('O')
});

test('A box can only be claimed once', () => {
   const squares = screen.getAllByTestId('square');

   fireEvent.click(squares[0]);
   expect(squares[0]).toContainHTML('X');
   fireEvent.click(squares[0]);
   expect(squares[0]).toContainHTML('X')
});