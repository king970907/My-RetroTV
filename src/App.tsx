import { useState } from 'react'
import BootScreen from '@/components/BootScreen'
import MainScene from '@/components/scene/MainScene'
import './styles/global.css'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className="app-root">
      {!isReady && <BootScreen onDone={() => setIsReady(true)} />}
      {isReady && (
        <div className="scene-fadein">
          <MainScene />
        </div>
      )}
    </div>
  )
}
