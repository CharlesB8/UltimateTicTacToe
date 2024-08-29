import {render} from '@testing-library/react';
import UltimateTicTacToe from "./UltimateTicTacToe";

test('renders the tic tac toe board', () => {
    const element= render(<UltimateTicTacToe />);
    expect(element).toBeTruthy();
});