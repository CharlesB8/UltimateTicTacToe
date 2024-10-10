import {fireEvent, render, screen, within} from "@testing-library/react";
import UltimateTicTacToe from "./UltimateTicTacToe";

beforeEach( () => {
    render(<UltimateTicTacToe />)
});

it('renders a tic tac toe board', () => {
   const ticTacToeBoard = screen.getByTestId('ultimate-board');

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
    const xWins = screen.getByTestId("x-wins")
    const ultimateWinner = screen.getByTestId("ultimate-winner")
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const subBoard1 = within(subBoards[0]).getAllByTestId('square')
    const subBoard2 = within(subBoards[1]).getAllByTestId('square')
    const subBoard3 = within(subBoards[2]).getAllByTestId('square')
    const subBoard4 = within(subBoards[3]).getAllByTestId('square')

    expect(ultimateWinner.textContent).toContain("Who will be the ultimate winner?")

    xWinsBoard(subBoard1)
    expect(xWins.textContent).toContain("1")

    fireEvent.click(subBoard4[1]); // Play O somewhere
    xWinsBoard(subBoard2)
    expect(xWins.textContent).toContain("2")

    fireEvent.click(subBoard4[2]); // Play O somewhere
    xWinsBoard(subBoard3)
    expect(xWins.textContent).toContain("3")

    expect(ultimateWinner.textContent).toContain("X is the ultimate winner")
});

test("The ultimate board becomes disabled after a winner is declared", () => {
    const xWins = screen.getByTestId("x-wins")
    const ultimateWinner = screen.getByTestId("ultimate-winner")
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const subBoard1 = within(subBoards[0]).getAllByTestId('square')
    const subBoard2 = within(subBoards[1]).getAllByTestId('square')
    const subBoard3 = within(subBoards[2]).getAllByTestId('square')
    const subBoard4 = within(subBoards[3]).getAllByTestId('square')

    const everySquare = screen.getAllByTestId('square')

    expect(ultimateWinner.textContent).toContain("Who will be the ultimate winner?")

    xWinsBoard(subBoard1)
    expect(xWins.textContent).toContain("1")

    fireEvent.click(subBoard4[1]); // Play O somewhere
    xWinsBoard(subBoard2)
    expect(xWins.textContent).toContain("2")

    fireEvent.click(subBoard4[2]); // Play O somewhere
    xWinsBoard(subBoard3)
    expect(xWins.textContent).toContain("3")

    expect(ultimateWinner.textContent).toContain("X is the ultimate winner")

    everySquare.forEach( square => {
        expect(square).toBeDisabled()
    });
});

test("If x plays in the top left square of a sub board, o must play in the top left square of the ultimate board", () =>{
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const subBoard0 = within(subBoards[0]).getAllByTestId('square')
    const subBoard2 = within(subBoards[2]).getAllByTestId('square')

    /*
    * |0|1|2|
    * |3|4|5|
    * |6|7|8|
    * */
    fireEvent.click(subBoard0[1]); // x top left sub board in the center middle
    fireEvent.click(subBoard2[1]); // O plays illegally in top right

    expect(subBoard2[1].textContent).toBe("")
});

function xWinsBoard(subBoard: HTMLElement[]) {
    fireEvent.click(subBoard[0]); // X turn
    fireEvent.click(subBoard[3]); // O turn
    fireEvent.click(subBoard[1]); // X turn
    fireEvent.click(subBoard[4]); // O turn
    fireEvent.click(subBoard[2]); // X turn
}
