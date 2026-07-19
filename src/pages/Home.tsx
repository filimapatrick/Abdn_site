import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { seoConfig } from '../config/seo';
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
import FeaturedTools from '../components/FeaturedTools';

export default function Home() {
  const seo = seoConfig.home;
  
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
        <Hero />
        <Introduction />
        <Features />
        <FeaturedTools />
        <LocationHighlight />
        <FeaturedClass />
        {/* <PopularCourses /> */}
        <Stats />
        <ResearchStories />
        <SupportABDN />
        <CallToAction />
      </main>
    </Layout>
    </>
  );
}