import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import Selection from './pages/selection';

import 'antd/dist/antd.min.css';
import './index.css';

const Entries = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selection" element={<Selection />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<Entries />, document.getElementById('root'));
