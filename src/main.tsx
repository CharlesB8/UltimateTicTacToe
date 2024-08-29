import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UltimateTicTacToe from './UltimateTicTacToe.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UltimateTicTacToe />
  </StrictMode>,
)
