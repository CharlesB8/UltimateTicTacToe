import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import UltimateTicTacToe from "./UltimateTicTacToe";
import '@testing-library/jest-dom';


beforeEach( () => {
    render(<UltimateTicTacToe />)
});

it('renders a tic tac toe board', () => {
   const ticTacToeBoard = screen.getByTestId('ultimate-board');

   expect(ticTacToeBoard).toBeTruthy();
});

it('X and O alternate turns', () => {

    /*
    * |0|1|2|
    * |3|4|5|
    * |6|7|8|
    * */

    const subBoards = screen.getAllByTestId('tictactoe-board');

    const subBoard0 = within(subBoards[0]).getAllByTestId('square')
    const subBoard1 = within(subBoards[1]).getAllByTestId('square')

    expect(subBoard0[1].textContent).toBe('')
    expect(subBoard1[1].textContent).toBe('')

    fireEvent.click(subBoard0[1]); // because x played square 1 on his turn, O may only play in sub board 1
    fireEvent.click(subBoard1[1]);

    expect(subBoard0[1].textContent).toBe('X')
    expect(subBoard1[1].textContent).toBe('O')
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

test('After a sub board is won all non-won boards are playable', async () => {
    const subBoards = screen.getAllByTestId('tictactoe-board');

    xWinsBoard0(subBoards)
    expect(subBoards[0]).toHaveClass("is-disabled")

    for (let i = 1; i < subBoards.length; i++) {
        expect(subBoards[i]).not.toHaveClass("is-disabled");
    }
});

test('A after a sub board is won it cant be played', () => {
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const subBoard0 = within(subBoards[0]).getAllByTestId('square')

    xWinsBoard0(subBoards)
    fireEvent.click(subBoard0[5]);
    expect(subBoard0[5].textContent).toBe('')
});

test("A sub-board can be won and is tracked", () => {
    const subBoards = screen.getAllByTestId('tictactoe-board');

    xWinsBoard0(subBoards);
    const status = screen.getByTestId("x-wins")
    expect(status.textContent).toContain("1")
});

test("X can win the ultimate board", () => {
    const xWins = screen.getByTestId("x-wins")
    const ultimateWinner = screen.getByTestId("ultimate-winner")
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const everySquare = screen.getAllByTestId('square')


    const subBoardsSquares: HTMLElement[][] = [];

    subBoards.forEach((subBoard) => {
        subBoardsSquares.push(within(subBoard).getAllByTestId('square'))
    })

    /*
    * |0|1|2|
    * |3|4|5|
    * |6|7|8|
    * */

    xWinsBoard0(subBoards)

    fireEvent.click(subBoardsSquares[2][3]) // setup O to loose

    // X turn
    fireEvent.click(subBoardsSquares[3][4]);
    // O turn
    fireEvent.click(subBoardsSquares[4][3]);
    // X turn
    fireEvent.click(subBoardsSquares[3][5]);
    // O turn
    fireEvent.click(subBoardsSquares[5][3]);
    // X turn
    fireEvent.click(subBoardsSquares[3][3]);

    fireEvent.click(subBoardsSquares[2][6]); // setup O to loose

    // X turn
    fireEvent.click(subBoardsSquares[6][7]);
    // O turn
    fireEvent.click(subBoardsSquares[7][6]);
    // X turn
    fireEvent.click(subBoardsSquares[6][8]);
    // O turn
    fireEvent.click(subBoardsSquares[8][6]);
    // X turn
    fireEvent.click(subBoardsSquares[6][6]);

    expect(xWins.textContent).toContain("3")
    expect(ultimateWinner.textContent).toContain("X is the ultimate winner!")

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

// TODO fix this test
xtest("If next play required board is a winning board, all non-won boards because legal plays", () => {
    const xWins = screen.getByTestId("x-wins")
    const ultimateWinner = screen.getByTestId("ultimate-winner")
    const subBoards = screen.getAllByTestId('tictactoe-board');
    const everySquare = screen.getAllByTestId('square')

    const subBoardsSquares: HTMLElement[][] = [];

    subBoards.forEach((subBoard) => {
        subBoardsSquares.push(within(subBoard).getAllByTestId('square'))
    })

    xWinsBoard0(subBoards);
    expect(xWins.textContent).toContain("1")

    fireEvent.click(subBoardsSquares[5][0]) // Board 0 is required play, which was just won

    everySquare.forEach( square => {
        expect(square).not.toBeDisabled()
    });
})

function xWinsBoard0(subBoards: HTMLElement[]) {
    const subBoard0 = within(subBoards[0]).getAllByTestId('square')
    const subBoard1 = within(subBoards[1]).getAllByTestId('square')
    const subBoard2 = within(subBoards[2]).getAllByTestId('square')

    /*
    * |0|1|2|
    * |3|4|5|
    * |6|7|8|
    * */

    fireEvent.click(subBoard0[1]); // X turn
    fireEvent.click(subBoard1[0]); // O turn
    fireEvent.click(subBoard0[2]); // X turn
    fireEvent.click(subBoard2[0]); // O turn
    fireEvent.click(subBoard0[0]); // X turn
}
