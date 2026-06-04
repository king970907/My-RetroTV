import { useState } from 'react'
import MainScene from '@/components/scene/MainScene'
import './styles/global.css'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className="app-root">
      {!isReady && (
        <div className="boot-screen" onClick={() => setIsReady(true)}>
          <div className="boot-text">CLICK TO TURN ON</div>
        </div>
      )}
      {isReady && <MainScene />}
    </div>
  )
}
