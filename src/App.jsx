import { useState } from 'react'
import "react-chat-elements/dist/main.css"
import './App.css'
import Main from './components/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1 className='text-5xl border border-green-500 rounded-full'>תעדכן אותי בגיט</h1>
      <Main/>
    </>
  )
}

export default App
