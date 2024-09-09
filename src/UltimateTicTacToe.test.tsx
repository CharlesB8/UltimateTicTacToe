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

    expect(square.textContent).toBe('')
    fireEvent.click(square);
    expect(square.textContent).toBe('X')
});

test('O appears after X has played', () => {
    const squares = screen.getAllByTestId('square');

    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);

    expect(squares[0].textContent).toBe('X')
    expect(squares[1].textContent).toBe('O')
});

test('A box can only be claimed once', () => {
    const squares = screen.getAllByTestId('square');

    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X')
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X')
});

test('Claiming three squares in a row makes you win', () => {
    const squares = screen.getAllByTestId('square');

    fireEvent.click(squares[0]); // X's turn
    fireEvent.click(squares[3]); // O's turn
    fireEvent.click(squares[1]); // X's turn
    fireEvent.click(squares[4]); // O's turn
    fireEvent.click(squares[2]); // X's turn

    const status = screen.getByTestId('status')
    expect(status).toContainHTML('Winner: X')
});

test('Clicking reset game resets the game', async () => {
    const squares = screen.getAllByTestId('square');

    fireEvent.click(squares[0]); // X's turn
    fireEvent.click(squares[3]); // O's turn

    // Why do I have to get reset button here? If I put it at the top of the test it fails
    const resetButton = screen.getByTestId('reset');

    fireEvent.click(resetButton)

    expect(squares[0].textContent).toBe('')
    expect(squares[3].textContent).toBe('')
})