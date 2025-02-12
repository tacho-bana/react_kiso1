import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThreadList from './ThreadList';
import NewThread from './NewThread';

function App() {
  return (
    <BrowserRouter>
      {/* ここでヘッダーやフッターなどのレイアウトをまとめる */}
      <header>
        <h1>掲示板</h1>
      </header>
      <Routes>
        <Route path="/" element={<ThreadList />} />
        <Route path="/new" element={<NewThread />} />
      </Routes>
      <footer>© 2023 MyBulletinApp</footer>
    </BrowserRouter>
  );
}

export default App;