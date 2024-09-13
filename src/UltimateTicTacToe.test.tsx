import {fireEvent, getAllByTestId, render, screen} from "@testing-library/react";
import UltimateTicTacToe from "./UltimateTicTacToe";


beforeEach(() => {
    render(<UltimateTicTacToe />)
})

test("renders without crashing", () => {
    const element = render(<UltimateTicTacToe />)
    expect(element).toBeTruthy()
})

test("it renders 9 tic tac toe boards", () => {
    const ticTacToeBoards = screen.getAllByTestId('tictactoe-board');

    expect(ticTacToeBoards.length).toBe(9);
})

test("X and O alternate turns", () => {
    const ticTacToeBoard = document.querySelectorAll('[data-testid="tictactoe-board"]');

    const boardOneSquares = getAllByTestId(ticTacToeBoard[0] as HTMLElement, 'square')
    const boardTwoSquares = getAllByTestId(ticTacToeBoard[1] as HTMLElement, 'square')

    fireEvent.click(boardOneSquares[0])
    fireEvent.click(boardTwoSquares[3])

    expect(boardOneSquares[0].textContent).toBe('X')
    expect(boardTwoSquares[3].textContent).toBe('O')
})