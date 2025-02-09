import React, { useState, useEffect } from 'react';

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
      setThreads((prevThreads) => [...prevThreads, ...data]);
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
  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  return (
    <div>
      <h1>掲示板スレッド一覧</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {threads.map((thread, index) => (
          <li key={`thread-${index}`}>
            {/* ここでは仮に title プロパティがある前提で表示 */}
            {thread.title}
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>次の 10 件を取得</button>
    </div>
  );
};

export default App;