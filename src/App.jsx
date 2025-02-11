import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  // スレッド一覧を保持する状態
  const [threads, setThreads] = useState([]);
  // 読み込み開始位置
  const [offset, setOffset] = useState(0);
  // エラー情報を保持する状態
  const [error, setError] = useState('');

  // スレッド一覧を取得する関数
  async function fetchThreads(current_offset){
    try {
      const response = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads?offset=${current_offset}`
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // 取得したデータを状態にセット
      // 追加で読み込む場合は、既存 + 新規取得データで合体させる
      setThreads(data);
    } catch (e) {
      console.error(e);
      setError('スレッド一覧を取得できませんでした。');
    }
  };

  // コンポーネントのマウント時＆offset が更新されたときに実行
  useEffect(() => {
    fetchThreads(offset);
  }, [offset]);

  // 「もっと見る」ボタンを押したときのイベントハンドラ
  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  const handlePrev = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - 10))
  }

  return (

    
    <div className="app-container">
      <header>
        <h2>掲示板</h2>
      </header>
      <h1 className="title">新着スレッド</h1>
      {error && <p className="error">{error}</p>}
      <ul className="thread-list">
        {threads.map((thread, index) => (
          <li key={`thread-${index}`} className="thread-item">
            {thread.title}
          </li>
        ))}
      </ul>
      <div className="button-group">
        <button onClick={handlePrev} disabled={offset === 0} className="paging-button">前へ</button>
        <button onClick={handleNext} className="paging-button">次へ</button>
      </div>
    </div>
  );
};

export default App;