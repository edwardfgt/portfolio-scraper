import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletsDisplay from './components/walletsDisplay';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WalletsDisplay />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
