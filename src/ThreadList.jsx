import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'

function ThreadList() {
  const [threads, setThreads] = useState([]);
  // 読み込み開始位置
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState('');

  // スレッド一覧を取得する関数
  async function fetchThreads(current_offset){
    try {
      const api = import.meta.env.VITE_API_URL
      const response = await fetch(
        `${api}/threads?offset=${current_offset}`
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      const data = await response.json();

      setThreads(data);
    } catch (e) {
      console.error(e);
      setError('スレッド一覧を取得できませんでした。');
    }
  };

  // offset が更新されたとき
  useEffect(() => {
    fetchThreads(offset);
  }, [offset]);

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  const handlePrev = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - 10))
  }

  return (

    
    <div className="app-container">
        <Link to="/threads/new" style={{ display: 'inline-block', marginTop: '2rem' }} className="back-link">
        新規スレッド作成
        </Link>
      <h2 className="title">新着スレッド</h2>
      {error && <p className="error">{error}</p>}
      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={`thread.id`} className="thread-item">
            <Link to={`/threads/${thread.id}`} state={{title: thread.title}}>
            {thread.title}
            </Link>
            
          </li>
        ))}
      </ul>
      <div className="button-group">
        <button onClick={handlePrev} disabled={offset === 0} className="paging-button">前へ</button>
        <button onClick={handleNext} disabled={threads.length < 10} className="paging-button">次へ</button>
      </div>
    </div>
  );
};

export default ThreadList;