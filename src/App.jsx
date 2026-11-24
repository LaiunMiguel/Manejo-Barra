import { useState } from 'react'
import './App.css'
import ConsumoMode from './Modes/ConsumoMode.jsx'
import CristaleriaMode from './Modes/CristaleriaMode.jsx'
import AlmacenMode from './Modes/AlmacenMode.jsx'
import './Modes/ModeShared.css'

function App() {
  const [mode, setMode] = useState('Consumo')

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="app-eyebrow">Operaciones</p>
        <h1>Manejo de Barra</h1>
      </header>
      <nav className="mode-navigation" aria-label="Secciones de barra">
        {['Consumo', 'Cristaleria', 'Almacen'].map((section) => (
          <button
            aria-pressed={mode === section}
            className={mode === section ? 'is-active' : ''}
            key={section}
            onClick={() => setMode(section)}
            type="button"
          >
            {section}
          </button>
        ))}
      </nav>
      <div className="mode-container" key={mode}>
        {mode === 'Consumo' ? (
          <ConsumoMode />
        ) : mode === 'Cristaleria' ? (
          <CristaleriaMode />
        ) : (
          <AlmacenMode />
        )}
      </div>
    </main>
  )
}

export default App
