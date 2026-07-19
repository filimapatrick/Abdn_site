import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight, ExternalLink, Globe, Video, Book, ChevronRight, X } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { seoConfig } from '../../config/seo';
import { Event } from '../../services/eventsService';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';

const formatDate = (startDate: string, endDate: string) => {
  return {
    start: startDate,
    end: endDate
  };
};

export default function Events() {
  const [showAllPastEvents, setShowAllPastEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, orderBy('startDate', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const events = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Event[];

        console.log('Raw Events Data:', events.map(event => ({
          id: event.id,
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          hasRegistrationLink: !!event.registrationLink
        })));

        const now = new Date();
        
        // Split events into past and upcoming based on endDate or startDate (for single-day events)
        const past = events.filter(event => {
          const eventDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
          return eventDate < now;
        });
        const upcoming = events.filter(event => {
          const eventDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
          return eventDate >= now;
        });
        
        console.log('Past Events:', past);
        console.log('Upcoming Events:', upcoming);
        
        setPastEvents(past);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const displayedPastEvents = showAllPastEvents ? pastEvents : pastEvents.slice(0, 3);

  // Update calendar events mapping
  const allEvents = [...upcomingEvents, ...pastEvents].map(event => {
    const dates = formatDate(event.startDate, event.endDate);
    return {
      title: event.title,
      start: dates.start,
      end: dates.end,
      allDay: true,
      backgroundColor: '#d97706', // amber-600
      borderColor: 'transparent',
      textColor: '#ffffff',
      extendedProps: {
        location: event.location,
        description: event.description,
        descriptionTitle: event.descriptionTitle,
        ...(event.registrationLink && { registrationLink: event.registrationLink })
      }
    };
  });

  console.log('All Events for Calendar:', allEvents);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </Layout>
    );
  }

  const seo = seoConfig.events;
  
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
      {/* Hero Section */}
        <section className="relative py-48 bg-gradient-to-br from-amber-950 to-amber-800 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-amber-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                  ABDN Events & Activities
                </span>
              </h1>
              <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
                Making African Brain Data Findable, Accessible, Interoperable and Reusable (FAIR) in a socially acceptable, ethically responsible and legally compliant way.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center"
                >
                  Upcoming Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center backdrop-blur-sm"
                >
                  Past Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
      </section>

        {/* Upcoming Events Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Upcoming Events</h2>
              <p className="text-xl text-amber-700">
                Join our upcoming events and be part of the African neuroscience community
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-amber-50 flex items-center justify-center p-4">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl font-semibold text-amber-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-amber-700 mb-4 line-clamp-2">{event.descriptionTitle}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-amber-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>
                          {!event.endDate 
                            ? event.startDate 
                            : event.startDate === event.endDate 
                              ? event.startDate 
                              : `${event.startDate} - ${event.endDate}`
                          }
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-amber-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <Link 
                      to={`/academy/events/${event.id}`}
                      className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
      </section>

      {/* Calendar Section */}
        <section className="py-24 bg-gradient-to-br from-white to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Event Calendar</h2>
              <p className="text-xl text-amber-700">
                Plan ahead with our comprehensive event schedule
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="fc-custom-styles">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  events={allEvents}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth'
                  }}
                  height="auto"
                  eventClick={(info) => {
                    const event = info.event;
                    const time = event.extendedProps.time ? `\nTime: ${event.extendedProps.time}` : '';
                    const location = event.extendedProps.location ? `\nLocation: ${event.extendedProps.location}` : '';
                    const description = event.extendedProps.description ? `\n\n${event.extendedProps.description}` : '';
                    
                    alert(
                      `${event.title}\nType: ${event.extendedProps.type}${time}${location}${description}`
                    );
                  }}
                  eventContent={(arg) => {
                    return (
                      <div className="p-1">
                        <div className="font-semibold text-sm">{arg.event.title}</div>
                        {arg.event.extendedProps.time && (
                          <div className="text-xs opacity-90">{arg.event.extendedProps.time}</div>
                        )}
                      </div>
                    );
                  }}
                  eventClassNames="rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  dayMaxEvents={3}
                  moreLinkContent={(args) => `+${args.num} more`}
                  moreLinkClassNames="text-amber-700 font-medium"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Past Events Section */}
        <section className="py-24 bg-gradient-to-br from-amber-100/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Past Events</h2>
              <p className="text-xl text-amber-700">
                Explore our previous events and their impact on neuroscience research
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPastEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="relative h-48 bg-amber-50 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-amber-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>
                          {!event.endDate 
                            ? event.startDate 
                            : event.startDate === event.endDate 
                              ? event.startDate 
                              : `${event.startDate} - ${event.endDate}`
                          }
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-amber-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/academy/events/${event.id}`}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center group"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image Modal */}
            <AnimatePresence>
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                  onClick={() => setSelectedEvent(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      <X className="h-6 w-6 text-amber-900" />
                    </button>
                    <div className="relative h-[60vh] bg-amber-50 flex items-center justify-center p-8">
                      <img
                        src={selectedEvent.imageUrl}
                        alt={selectedEvent.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-amber-900 mb-3">
                        {selectedEvent.title}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-amber-600">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span>
                            {!selectedEvent.endDate 
                              ? selectedEvent.startDate 
                              : selectedEvent.startDate === selectedEvent.endDate 
                                ? selectedEvent.startDate 
                                : `${selectedEvent.startDate} - ${selectedEvent.endDate}`
                            }
                          </span>
                        </div>
                        {selectedEvent.location && (
                          <div className="flex items-center text-amber-600">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span>{selectedEvent.location}</span>
                          </div>
                        )}
                        <div className="mt-4">
                          <p className="text-amber-800">{selectedEvent.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {pastEvents.length > 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <button
                  onClick={() => setShowAllPastEvents(!showAllPastEvents)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center mx-auto"
                >
                  {showAllPastEvents ? 'Show Less' : 'View More Events'}
                  <ChevronRight className={`ml-2 h-5 w-5 transition-transform ${showAllPastEvents ? 'rotate-90' : ''}`} />
                </button>
              </motion.div>
            )}
          </div>
      </section>
    </main>
    </Layout>
    </>
  );
}