import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './App.css';

function NewThread() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function Submit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError('タイトルを入力してください。');
      return;
    }

    try {
      setError('');
      const api = import.meta.env.VITE_API_URL;  
      const response = await fetch(`${api}/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error(`スレッドの作成に失敗しました ${response.status}`);
      }
      setTitle('');
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      setError('スレッドの作成に失敗しました。');
    }
  }
  return (
    <div>
        <h2>スレッドを作成</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={Submit}>
            <label>タイトル：</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">投稿</button><br></br><br></br>
            <div className="header-bar">
              <Link to="/" className="back-link">← 戻る</Link>
            </div>
        </form>
    </div>
  );
}

export default NewThread;