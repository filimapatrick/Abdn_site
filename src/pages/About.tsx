import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { seoConfig } from '../config/seo';
import AboutHero from '../components/about/AboutHero';
import MissionImpact from '../components/about/MissionImpact';
import AboutContent from '../components/about/AboutContent';
import Timeline from '../components/about/Timeline';
import CoreTeam from '../components/about/CoreTeam';
import Partners from '../components/about/Partners';
import AboutTestimonials from '../components/about/AboutTestimonials';

export default function About() {
  const seo = seoConfig.about;
  
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
        <AboutHero />
        <MissionImpact />
        {/* <AboutContent /> */}
        {/* <Timeline /> */}
        <CoreTeam />
        <Partners />
        <AboutTestimonials />
      </main>
    </Layout>
    </>
  );
}