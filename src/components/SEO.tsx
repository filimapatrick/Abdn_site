import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object | object[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

const defaultSEO = {
  siteName: 'African Brain Data Network',
  defaultTitle: 'African Brain Data Network (ABDN) - Neuroscience Research & Training in Africa',
  defaultDescription: 'Building capacity for neuroscience research and data science across Africa through training, mentorship, and collaboration. Join our network of 300+ researchers across 20+ African countries.',
  defaultKeywords: 'African Brain Data Network, ABDN, neuroscience research Africa, brain imaging Africa, MRI training Africa, EEG research Africa, fNIRS Africa, neuroimaging education, brain data sharing, neuroscience capacity building, African brain research, neuroimaging collaboration, brain science education, neuroscience training programs, brain research infrastructure Africa, FAIR data, neuroethics, brain data network',
  defaultImage: 'https://africanbraindatanetwork.com/Assets/lagos_group_picture.jpeg',
  siteUrl: 'https://africanbraindatanetwork.com',
  twitterHandle: '@africanbraindn',
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'African Brain Data Network',
  publishedTime,
  modifiedTime,
  structuredData,
  noindex = false,
  nofollow = false,
  canonical,
}: SEOProps) {
  const fullTitle = title 
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle;
  
  const metaDescription = description || defaultSEO.defaultDescription;
  const metaKeywords = keywords || defaultSEO.defaultKeywords;
  const metaImage = image || defaultSEO.defaultImage;
  const pageUrl = url || defaultSEO.siteUrl;
  const canonicalUrl = canonical || pageUrl;
  
  const robotsContent = noindex 
    ? (nofollow ? 'noindex, nofollow' : 'noindex, follow')
    : (nofollow ? 'index, nofollow' : 'index, follow');

  // Default structured data
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultSEO.siteName,
    alternateName: 'ABDN',
    url: defaultSEO.siteUrl,
    logo: `${defaultSEO.siteUrl}/Assets/logo.png`,
    description: defaultSEO.defaultDescription,
    foundingDate: '2018',
    areaServed: {
      '@type': 'Place',
      name: 'Africa',
    },
    knowsAbout: [
      'Neuroscience',
      'Brain Imaging',
      'MRI',
      'EEG',
      'fNIRS',
      'Data Science',
      'Research Training',
      'Neuroimaging',
      'FAIR Data',
      'Neuroethics',
    ],
    sameAs: [
      'https://twitter.com/africanbraindn',
      'https://www.linkedin.com/company/african-brain-data-network',
      'https://www.facebook.com/africanbraindatanetwork',
      'https://www.instagram.com/africanbraindatanetwork',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'General Inquiry',
      email: 'info@africanbraindatanetwork.com',
    },
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    url: defaultSEO.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultSEO.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Combine structured data
  const allStructuredData = Array.isArray(structuredData)
    ? [defaultStructuredData, websiteStructuredData, ...structuredData]
    : structuredData
    ? [defaultStructuredData, websiteStructuredData, structuredData]
    : [defaultStructuredData, websiteStructuredData];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="geo.region" content="AF" />
      <meta name="geo.placename" content="Africa" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && type === 'article' && <meta property="article:author" content={author} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      <meta name="twitter:creator" content={defaultSEO.twitterHandle} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#d97706" />
      <meta name="msapplication-navbutton-color" content="#d97706" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="ABDN" />
      
      {/* Structured Data (JSON-LD) */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Helmet>
  );
}

