import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LocationHighlight from '../components/LocationHighlight';
import FeaturedClass from '../components/FeaturedClass';
import PopularCourses from '../components/PopularCourses';
import Stats from '../components/Stats';
import ResearchStories from '../components/ResearchStories';
import CallToAction from '../components/CallToAction';

function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <LocationHighlight />
      <FeaturedClass />
      <PopularCourses />
      <Stats />
      <ResearchStories />
      <CallToAction />
    </main>
  );
}

export default Home;