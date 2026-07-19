import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { seoConfig } from '../config/seo';
import AcademyHero from '../components/academy/AcademyHero';
import ProgramCall from '../components/academy/ProgramCall';
import CoreOfferings from '../components/academy/CoreOfferings';
import SuccessStories from '../components/academy/SuccessStories';
import Resources from '../components/academy/Resources';
import AcademyFAQ from '../components/academy/AcademyFAQ';
import ContactSection from '../components/academy/ContactSection';
import AcademyGalleryImages from '../components/academy/AcademyGalleryImages'
import FacultyGallery from '../components/academy/FacultyGallery';
import AboutABDNProgram from '../components/academy/AboutABDNProgram';

export default function Academy() {
  const seo = seoConfig.academy;
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
      />
      <Layout>
      <main className="pt-20">
        <AcademyHero />
        {/* <ProgramCall /> */}
        <AboutABDNProgram/>
        <CoreOfferings />
        <AcademyGalleryImages />
        <FacultyGallery/>
        <SuccessStories />
        <Resources />
        <AcademyFAQ />
        <ContactSection />
      </main>
    </Layout>
    </>
  );
}