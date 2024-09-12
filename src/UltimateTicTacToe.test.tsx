import {render, screen} from "@testing-library/react";
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