import React, {useEffect, useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './App.css'

function ThreadDetail() {
    const location = useLocation();
    const [thread, setThread] = useState(null);
    const {id} = useParams();
    const [offset, setOffset] = useState(0);
    const [error, setError] = useState("");
    const {title} =location.state || {};


    async function fetchThread(threadId, Offset){
        try{
        const api = import.meta.env.VITE_API_URL;
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
        return <p>スレッドを読み込み中。</p>;
      }
    
    return (
        <div>
          <h2>{title}</h2>
            <ul>
              {thread.posts.map((p) => (
              <li key={p.id}>
                {p.post}
              </li>
                ))}
            </ul>
          <div className="button-group">
            <button onClick={handlePrev} disabled={offset === 0} className="paging-button">＜</button>
            <button onClick={handleNext} disabled={thread.posts.length < 10}  className="paging-button">＞</button>
          </div>
        </div>
      );
}

export default ThreadDetail;