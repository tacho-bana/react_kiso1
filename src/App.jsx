import { useState, useEffect } from 'react'
import './App.css'




function App() {
  const [threads, setThreads] = useState([])
  const [offset, setOffset] = useState(0)
  async function fetchThreads(offsetValue){
    const url = 'https://railway.bulletinboard.techtrain.dev'
    const response = await fetch(`${url}/threads?offset=${offsetValue}`)
    const data = await response.json()
    setThreads((prev) => [...prev, ...data.threads])
  }
  useEffect(() => {
    fetchThreads(offset)
  }, [offset])

  const handleLoadMore = () => {
    setOffset((prev) => prev + 10)
  }
  return (
    <div>
      <h1>スレッド一覧</h1>
      <ul>
        {threads.map((t, i) => (
          <li key={i}>{t.title}</li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>次の10件を取得</button>
    </div>
  )
}



export default App;
