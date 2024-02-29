import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletsDisplay from './components/walletsDisplay';
import Navbar from './components/navBar';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<WalletsDisplay />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
