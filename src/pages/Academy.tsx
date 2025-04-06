import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import AcademyHero from '../components/academy/AcademyHero';
import CoreOfferings from '../components/academy/CoreOfferings';
import SuccessStories from '../components/academy/SuccessStories';
import Resources from '../components/academy/Resources';
import AcademyFAQ from '../components/academy/AcademyFAQ';
import ContactSection from '../components/academy/ContactSection';
import AcademyGalleryImages from '../components/academy/AcademyGalleryImages'
import FacultyGallery from '../components/academy/FacultyGallery';
import TeachingAssistants from '../components/academy/TeachingAssistants';
import AboutABDNProgram from '../components/academy/AboutABDNProgram';

export default function Academy() {
  return (
    <Layout>
      <main className="pt-20">
        <AcademyHero />
        <AboutABDNProgram/>
        <CoreOfferings />
        <AcademyGalleryImages />
        <FacultyGallery/>
        <TeachingAssistants />
        <SuccessStories />
        <Resources />
        <AcademyFAQ />
        <ContactSection />
      </main>
    </Layout>
  );
}