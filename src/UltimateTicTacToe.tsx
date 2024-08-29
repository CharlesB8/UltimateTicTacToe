import './UltimateTicTacToe.css'

function UltimateTicTacToe() {

  return (
      <div>
          <h1 className='text-orange-500 text-5xl'>Tic-Tac-Toe!</h1>
          <div className='flex justify-center'>
              <Square />
          </div>
      </div>
  );
}

function Square() {
    return <button className="square">X</button>;
}


export default UltimateTicTacToe
