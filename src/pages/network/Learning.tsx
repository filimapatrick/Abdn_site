import React from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { seoConfig } from '../../config/seo';

export default function Learning() {
  const seo = seoConfig.learning;
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
      />
      <Layout>
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Neuroimaging Learning Hub</h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Explore a curated collection of tutorials and resources for all types of neuroimaging data, including EEG, fMRI, DTI, and more. This page will be regularly updated with new learning materials, video walkthroughs, and downloadable datasets to support your neuroscience journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=300&h=300&fit=crop&crop=center" alt="EEG Tutorial" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">EEG Learning Space</h2>
            <p className="text-amber-700 mb-4 text-center">Step-by-step guides and video lessons on EEG data acquisition, preprocessing, and analysis.</p>
            <a 
              href="https://www.youtube.com/@fieldtriptoolbox" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-600 hover:underline font-medium"
            >
              Browse EEG Space
            </a>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&crop=center" alt="MRI Tutorial" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">MRI & fMRI Learning Space</h2>
            <p className="text-amber-700 mb-4 text-center">Comprehensive resources for structural MRI, functional MRI, DTI, and advanced neuroimaging techniques.</p>
            <a href="#" className="text-amber-600 hover:underline font-medium">Browse MRI Space</a>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=300&h=300&fit=crop&crop=center" alt="fNIRS Tutorial" className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">FNIRS Learning Space</h2>
            <p className="text-amber-700 mb-4 text-center">Comprehensive resources for functional near-infrared spectroscopy (fNIRS).</p>
            <a href="#" className="text-amber-600 hover:underline font-medium">Browse FNIRS Space</a>
          </div>
        </div>
        <div className="mt-16 text-center text-amber-700">
          <p>Have a tutorial or resource to share? <a href="#" className="text-amber-600 hover:underline font-medium">Contact us to contribute!</a></p>
        </div>
      </div>
    </section>
    </Layout>
    </>
  );
}
