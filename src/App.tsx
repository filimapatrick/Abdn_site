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
import EventDetail from './pages/academy/EventDetail';
import Centers from './pages/network/Centers';
import Collaborations from './pages/network/Collaborations';
import DataSharing from './pages/network/DataSharing';
import Publications from './pages/network/Publications';
import People from './pages/network/People';
import Alumni from './pages/network/Alumni';
import Learning from './pages/network/Learning';
import ContactDrawer from './components/ContactDrawer';
import CookiePolicy from './pages/CookiePolicy';
import NotFound from './pages/NotFound';

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
        <Route path="/academy/events/:id" element={<EventDetail />} />
        <Route path="/network/people" element={<People />} />
        <Route path="/network/centers" element={<Centers />} />
        <Route path="/network/collaborations" element={<Collaborations />} />
        <Route path="/network/data" element={<DataSharing />} />
        <Route path="/network/publications" element={<Publications />} />
        <Route path="/network/alumni" element={<Alumni />} />
        <Route path="/network/learning" element={<Learning />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;