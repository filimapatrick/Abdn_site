import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import Features from '../components/Features';
import LocationHighlight from '../components/LocationHighlight';
import FeaturedClass from '../components/FeaturedClass';
import PopularCourses from '../components/PopularCourses';
import Stats from '../components/Stats';
import ResearchStories from '../components/ResearchStories';
import CallToAction from '../components/CallToAction';
import SupportABDN from '../components/SupportABDN';

export default function Home() {
  return (
    <Layout>
      <main className="pt-20">
        <Hero />
        <Introduction />
        <Features />
        <LocationHighlight />
        <FeaturedClass />
        {/* <PopularCourses /> */}
        <Stats />
        <ResearchStories />
        <SupportABDN />
        <CallToAction />
      </main>
    </Layout>
  );
}