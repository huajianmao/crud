import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DictList from './pages/dicts';
import Home from './pages/home';
import PackageList from './pages/packages';
import Selection from './pages/selection';

import 'antd/dist/antd.min.css';
import './index.css';

const Entries = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/dicts" element={<DictList />} />

        <Route
          path="/packages"
          element={
            <div className="p-4">
              <PackageList />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<Entries />, document.getElementById('root'));
