import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Find your next study spot here.</p>
      <input type="text" placeholder="San Francisco, CA"/>
    </>
  )
}

export default App
