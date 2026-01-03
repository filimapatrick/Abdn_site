import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, ExternalLink, Clock, Users, Globe, Share2, Bookmark, Tag } from 'lucide-react';
import Layout from '../../components/Layout';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Event } from '../../services/eventsService';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const eventDoc = await getDoc(doc(db, 'events', id));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() } as Event);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-amber-900 mb-4">Event not found</h1>
          <button
            onClick={() => navigate('/academy/events')}
            className="flex items-center text-amber-600 hover:text-amber-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-amber-950 to-amber-800 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={event.imageUrl} 
              alt="" 
              className="w-full h-full object-cover opacity-10 blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/90 to-amber-800/90" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => navigate('/academy/events')}
              className="mb-8 flex items-center text-amber-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Events
            </motion.button>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-amber-100 mb-8"
            >
              {event.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-amber-300" />
                <div>
                  <p className="text-amber-200 text-sm">Date</p>
                  <p className="text-white">
                    {event.startDate === event.endDate 
                      ? event.startDate 
                      : `${event.startDate} - ${event.endDate}`
                    }
                  </p>
                </div>
              </div>
              
              {event.location && (
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-amber-300" />
                  <div>
                    <p className="text-amber-200 text-sm">Location</p>
                    <p className="text-white">{event.location}</p>
                  </div>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center space-x-3">
                <Globe className="h-6 w-6 text-amber-300" />
                <div>
                  <p className="text-amber-200 text-sm">Format</p>
                  <p className="text-white">Hybrid Event</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-amber-50 rounded-xl p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-amber-900 mb-4">
                    {event.descriptionTitle}
                  </h2>
                  <div className="prose prose-amber max-w-none">
                    <p className="text-amber-800 whitespace-pre-wrap">
                      {event.description}
                    </p>
                  </div>
                </motion.div>

                {/* Tags Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Neuroscience
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Data Science
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Workshop
                  </span>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="sticky top-24 space-y-6"
                >
                  <div className="bg-amber-50 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      {event.registrationLink && (
                        <motion.a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Register for Event
                          <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                      )}
                      
                      <div className="mt-6 space-y-4">
                        {new Date(event.endDate || event.startDate) >= new Date() ? (
                          <>
                            <div className="flex items-center text-amber-700">
                              <Clock className="h-5 w-5 mr-3" />
                              <span>Registration deadline approaching</span>
                            </div>
                            <div className="flex items-center text-amber-700">
                              <Users className="h-5 w-5 mr-3" />
                              <span>Limited spots available</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center text-amber-700">
                              <Clock className="h-5 w-5 mr-3" />
                              <span>Event completed</span>
                            </div>
                            <div className="flex items-center text-amber-700">
                              <Users className="h-5 w-5 mr-3" />
                              <span>View event materials</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-white border border-amber-200 text-amber-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-50 transition-colors"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-white border border-amber-200 text-amber-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-50 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                      Share
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
} 