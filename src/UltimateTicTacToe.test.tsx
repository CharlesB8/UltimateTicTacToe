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
    // something to commit
});

test('A after a sub board is won it cant be played', () => {
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const subBoard = within(subBoards[0]).getAllByTestId('square')

    xWinsBoard(subBoard)
    fireEvent.click(subBoard[5]);
    expect(subBoard[5].textContent).toBe('')
});

test("Per board won is tracked", () => {
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const subBoard = within(subBoards[0]).getAllByTestId('square')

    xWinsBoard(subBoard);
    const status = screen.getByTestId("x-wins")
    expect(status.textContent).toContain("1")
});

test("X can win the ultimate board", () => {
    const status = screen.getByTestId("x-wins")
    // const ultimateWinner = screen.getByTestId("ultimate-winner")
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const subBoard1 = within(subBoards[0]).getAllByTestId('square')
    const subBoard2 = within(subBoards[1]).getAllByTestId('square')
    const subBoard3 = within(subBoards[2]).getAllByTestId('square')
    const subBoard4 = within(subBoards[3]).getAllByTestId('square')

    xWinsBoard(subBoard1)
    expect(status.textContent).toContain("1")

    fireEvent.click(subBoard4[1]); // Play O somewhere
    xWinsBoard(subBoard2)
    expect(status.textContent).toContain("2")

    fireEvent.click(subBoard4[2]); // Play O somewhere
    xWinsBoard(subBoard3)
    expect(status.textContent).toContain("3")

    // expect(ultimateWinner)
});

function xWinsBoard(subBoard: HTMLElement[]) {
    fireEvent.click(subBoard[0]);
    fireEvent.click(subBoard[3]);
    fireEvent.click(subBoard[1]);
    fireEvent.click(subBoard[4]);
    fireEvent.click(subBoard[2]);
}
