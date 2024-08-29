import React from 'react'; // I shouldn't need this, so there is still something wrong with the project config
import {render} from '@testing-library/react';
import UltimateTicTacToe from "./UltimateTicTacToe";

test('renders the tic tac toe board', () => {
    const element= render(<UltimateTicTacToe />);
    expect(element).toBeTruthy();
});