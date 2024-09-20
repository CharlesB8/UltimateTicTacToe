import {fireEvent, render, screen, within} from "@testing-library/react";
import UltimateTicTacToe from "./UltimateTicTacToe";

beforeEach( () => {
    render(<UltimateTicTacToe />)
});

it('renders a tic tac toe board', () => {
   const ticTacToeBoard = screen.getByTestId('ultimate-tictactoe');

   expect(ticTacToeBoard).toBeTruthy();
});

it('X and O alternate turns', () => {
    const subBoards = screen.getAllByTestId('tictactoe-board');

    const subBoard1 = within(subBoards[0]).getAllByTestId('square')
    const subBoard2 = within(subBoards[1]).getAllByTestId('square')

    expect(subBoard1[0].textContent).toBe('')
    expect(subBoard2[1].textContent).toBe('')

    fireEvent.click(subBoard1[0]);
    fireEvent.click(subBoard2[1]);

    expect(subBoard1[0].textContent).toBe('X')
    expect(subBoard2[1].textContent).toBe('O')
});

test('A box in any given sub board can only be claimed once', () => {
    const subBoards = screen.getAllByTestId('tictactoe-board');

    const subBoard1 = within(subBoards[0]).getAllByTestId('square')

    expect(subBoard1[0].textContent).toBe('')

    fireEvent.click(subBoard1[0]);
    expect(subBoard1[0].textContent).toBe('X')

    fireEvent.click(subBoard1[0]); // O attempts to claim X's square
    expect(subBoard1[0].textContent).toBe('X')
});
