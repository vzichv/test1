import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Index />} />
    </Routes>
  </BrowserRouter>,
);
