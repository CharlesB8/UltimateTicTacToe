import {Route, Routes} from "react-router-dom";
import TicTacToe from "./TicTacToe";
import UltimateTicTacToe from "./UltimateTicTacToe";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<TicTacToe />}/>
            <Route path="/ultimate" element={<UltimateTicTacToe />} />
        </Routes>
    )
}

export default App;