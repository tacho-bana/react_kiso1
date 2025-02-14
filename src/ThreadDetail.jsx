import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function ThreadDetail() {
    const [thread, setThread] = useState();
    const {id} = useParams();
    const [error, setError] = useState("");

    async function fetchThread(threadId){
        try{
        const api = import.meta.env.VITE_API_URL;
        const response = await fetch(`${api}/threads/${threadId}/posts`);
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
            fetchThread(id);
        }
    }, [id]);
    return(
        <div>
          <h2>a</h2>
        </div>
      );
}

export default ThreadDetail;