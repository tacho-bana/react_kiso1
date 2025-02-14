import React, {useEffect, useState} from 'react';
import { useLocation, useParams, Link} from 'react-router-dom';
import './App.css'

function ThreadDetail() {
    const location = useLocation();
    const [thread, setThread] = useState(null);
    const {id} = useParams();
    const [offset, setOffset] = useState(0);
    const [error, setError] = useState("");
    const {title} =location.state || {};
    const [body, setBody] = useState('');
    const api = import.meta.env.VITE_API_URL;

    // 投稿一覧
    async function fetchThread(threadId, Offset){
        try{
        const response = await fetch(`${api}/threads/${threadId}/posts?offset=${Offset}`);
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
        const data = await response.json();
        setThread(data);

    
        } catch (err) {
            console.error(err);
            setError("スレッドを読み込めませんでした。")
        }
    };

    // 新規投稿
    async function ThreadPost (){
        try{
            const response = await fetch(`${api}/threads/${id}/posts`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post: body }),
            });
            if (!response.ok) {
                throw new Error(`投稿に失敗しました。 ${response.status}`);
              }
              setBody('')
              fetchThread(id, offset);
        }catch (err) {
            console.error(err);
            setError('スレッドの作成に失敗しました。');
          }
    }

    
    useEffect(() => {
        if (id){
            fetchThread(id, offset);
        }
    }, [id, offset]);

    const handleNext = () => {
        setOffset((prevOffset) => prevOffset + 10);
      };
    const handlePrev = () => {
        setOffset((prevOffset) => Math.max(0, prevOffset - 10))
      }


    if (!thread) {
        return <p>投稿を読み込み中...</p>;
      }
    
    return (
        <div className="thread-detail-container">
          {error && <p className="error">{error}</p>}
      
          <h2 className="thread-title">{title}</h2>
      
          <ul className="post-list">
            {thread.posts.map((p) => (
              <li key={p.id}>＞{p.post}</li>
            ))}
          </ul>
            <div className="post-form">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="投稿内容を入力"
              />
              <button onClick={() => {
                if (!body.trim()) {
                    setError("文字を入力してください");
                    return;
                  }
                  ThreadPost();
              }}
              className="submit-button">
                投稿
              </button>
            </div>
          <div className="button-group">
            <button onClick={handlePrev} disabled={offset === 0} className="paging-button">＜</button>
            <button onClick={handleNext} disabled={thread.posts.length < 10} className="paging-button">＞</button>
          </div>
          <div className="header-bar">
            <Link to="/" className="back-link">← 戻る</Link>
          </div>
        </div>
      );
}

export default ThreadDetail;