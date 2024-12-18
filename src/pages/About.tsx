import React from 'react';
import AboutHero from '../components/about/AboutHero';
import MissionImpact from '../components/about/MissionImpact';
import AboutContent from '../components/about/AboutContent';
import Timeline from '../components/about/Timeline';
import CoreTeam from '../components/about/CoreTeam';
import Partners from '../components/about/Partners';
import AboutTestimonials from '../components/about/AboutTestimonials';

function About() {
  return (
    <main className="pt-20">
      <AboutHero />
      <MissionImpact />
      <AboutContent />
      <Timeline />
      <CoreTeam />
      <Partners />
      <AboutTestimonials />
    </main>
  );
}

export default About;