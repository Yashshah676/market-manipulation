import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import CaseLibrary from './pages/CaseLibrary.jsx';
import Simulation from './pages/Simulation.jsx';
import Feedback from './pages/Feedback.jsx';
import News from './pages/News.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cases" element={<CaseLibrary />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
