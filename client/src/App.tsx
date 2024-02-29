import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletsDisplay from './components/walletsDisplay';
import Navbar from './components/navBar';
import AddWallets from './components/addWallets';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<WalletsDisplay />} />
          <Route path="/wallets" element={<AddWallets />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
