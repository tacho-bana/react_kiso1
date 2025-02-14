import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThreadList from './ThreadList';
import NewThread from './NewThread';
import ThreadDetail from './ThreadDetail';

function App() {
  return (
    <BrowserRouter>
      {/* ここでヘッダーやフッターなどのレイアウトをまとめる */}
      <header>
        <h1>掲示板</h1>
      </header>
      <Routes>
        <Route path="/" element={<ThreadList />} />
        <Route path="/threads/new" element={<NewThread />} />
        <Route path="/threads/:id" element={<ThreadDetail />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;