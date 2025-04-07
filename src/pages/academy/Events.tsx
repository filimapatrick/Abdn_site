import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight, ExternalLink, Globe, Video, Book, ChevronRight } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Layout from '../../components/Layout';

// Add interface before the upcomingEvents array
interface Event {
  title: string;
  date: string;
  location?: string;
  description?: string;
  type: string;
  image: string;
  time?: string;
  isVirtual?: boolean;
}

const formatDate = (dateStr: string) => {
  // Handle date ranges (e.g., "June 9-14, 2025")
  if (dateStr.includes('-')) {
    const [start, end] = dateStr.split('-');
    const [month, day] = start.trim().split(' ');
    const [endDay, year] = end.trim().split(', ');
    return {
      start: `${year}-${String(new Date(`${month} 1, 2000`).getMonth() + 1).padStart(2, '0')}-${day.padStart(2, '0')}`,
      end: `${year}-${String(new Date(`${month} 1, 2000`).getMonth() + 1).padStart(2, '0')}-${endDay.padStart(2, '0')}`
    };
  }
  
  // Handle single dates (e.g., "September 5, 2024")
  const date = new Date(dateStr);
  return {
    start: date.toISOString().split('T')[0],
    end: date.toISOString().split('T')[0]
  };
};

const upcomingEvents: Event[] = [
  {
    title: "African Brain Data Science Academy EEG Workshop",
    date: "June 9-14, 2025",
    location: "Nigeria",
    description: "Comprehensive workshop on EEG data analysis and interpretation techniques.",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80",
    isVirtual: false
  }
];

const pastEvents = [
  {
    title: "Brain Awareness Week",
    date: "March 11-15, 2024",
    location: "Port-Harcourt, Nigeria",
    description: "Engaging the public in brain science through interactive sessions, workshops, and educational activities.",
    type: "Outreach",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80"
  },
  {
    title: "21st Annual Scientific Conference Of The Neuroscience Society Of Nigeria",
    date: "September 5, 2024",
    time: "3:00 PM",
    location: "Nassarawa State, Nigeria",
    type: "Conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
  },
  {
    title: "African Brain Data Science Academy 2024",
    date: "December 2-14, 2024",
    type: "Academy",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80"
  },
  {
    title: "FENS Forum 2024",
    date: "June 25-29, 2024",
    location: "Vienna, Austria",
    type: "Forum",
    image: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?auto=format&fit=crop&q=80"
  },
  {
    title: "Neuroinformatics Assembly",
    date: "September 26-27, 2024",
    location: "Austin, Texas",
    type: "Assembly",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80"
  },
  {
    title: "NeuroImaging For Research In Africa",
    date: "December 2, 2023",
    time: "9:30 AM - 12:30 PM",
    location: "Lagos, Nigeria",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
  },
  {
    title: "Integrating Data Science Into Neuroscience Curriculum",
    date: "December 2, 2023",
    time: "1:30 PM - 3:30 PM",
    location: "Lagos, Nigeria",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80"
  }
];

export default function Events() {
  const [showAllPastEvents, setShowAllPastEvents] = useState(false);
  const displayedPastEvents = showAllPastEvents ? pastEvents : pastEvents.slice(0, 3);

  // Combine upcoming and past events for the calendar with proper date formatting
  const allEvents = [...upcomingEvents, ...pastEvents].map(event => {
    const dates = formatDate(event.date);
    return {
      title: event.title,
      start: dates.start,
      end: dates.end,
      allDay: !event.time,
      backgroundColor: event.type === 'Workshop' ? '#d97706' : // amber-600
                      event.type === 'Conference' ? '#b45309' : // amber-700
                      event.type === 'Academy' ? '#92400e' : // amber-800
                      '#78350f', // amber-900
      borderColor: 'transparent',
      textColor: '#ffffff',
      extendedProps: {
        location: event.location,
        type: event.type,
        description: event.description,
        time: event.time
      }
    };
  });

  return (
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
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl font-semibold text-amber-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-amber-700 mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-amber-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-amber-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <button className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center group">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
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

            <div className="grid gap-8">
              {displayedPastEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="relative h-full min-h-[200px] md:min-h-[unset]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-amber-900/60 to-transparent md:bg-gradient-to-t md:from-amber-900/80 md:via-amber-900/60 md:to-transparent" />
                      <div className="absolute bottom-4 left-4 md:top-4 md:left-4">
                        <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 md:col-span-2 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-amber-900 mb-3">
                          {event.title}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-amber-600">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span>{event.date}</span>
                            {event.time && (
                              <>
                                <Clock className="h-5 w-5 ml-4 mr-2" />
                                <span>{event.time}</span>
                              </>
                            )}
                          </div>
                          {event.location && (
                            <div className="flex items-center text-amber-600">
                              <MapPin className="h-5 w-5 mr-2" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button className="self-start bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center group">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

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
  );
}