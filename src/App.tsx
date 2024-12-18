import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Academy from './pages/Academy';
import Training from './pages/academy/Training';
import Curriculum from './pages/academy/Curriculum';
import Mentorship from './pages/academy/Mentorship';
import Infrastructure from './pages/academy/Infrastructure';
import ResearchGroups from './pages/academy/ResearchGroups';
import Events from './pages/academy/Events';
import Centers from './pages/network/Centers';
import Collaborations from './pages/network/Collaborations';
import DataSharing from './pages/network/DataSharing';
import Publications from './pages/network/Publications';
import ContactDrawer from './components/ContactDrawer';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onContactClick={() => setIsContactOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/training" element={<Training />} />
        <Route path="/academy/curriculum" element={<Curriculum />} />
        <Route path="/academy/mentorship" element={<Mentorship />} />
        <Route path="/academy/infrastructure" element={<Infrastructure />} />
        <Route path="/academy/research-groups" element={<ResearchGroups />} />
        <Route path="/academy/events" element={<Events />} />
        <Route path="/network/centers" element={<Centers />} />
        <Route path="/network/collaborations" element={<Collaborations />} />
        <Route path="/network/data" element={<DataSharing />} />
        <Route path="/network/publications" element={<Publications />} />
      </Routes>
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;