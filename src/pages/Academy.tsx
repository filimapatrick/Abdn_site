import React from 'react';
import AcademyHero from '../components/academy/AcademyHero';
import CoreOfferings from '../components/academy/CoreOfferings';
import SuccessStories from '../components/academy/SuccessStories';
import Resources from '../components/academy/Resources';
import AcademyFAQ from '../components/academy/AcademyFAQ';
import ContactSection from '../components/academy/ContactSection';

export default function Academy() {
  return (
    <main className="pt-20">
      <AcademyHero />
      <CoreOfferings />
      <SuccessStories />
      <Resources />
      <AcademyFAQ />
      <ContactSection />
    </main>
  );
}