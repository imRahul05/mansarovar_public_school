import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { eventData, eventCategories } from '../data/eventsData';

// Import component files
import EventsHeader from '../components/events/EventsHeader';
import EventsFilter from '../components/events/EventsFilter';
import EventGrid from '../components/events/EventGrid';
import EventCalendar from '../components/events/EventCalendar';
import CalendarDownload from '../components/events/CalendarDownload';
import FeaturedEventPreview from '../components/events/FeaturedEventPreview';
import EventsCallToAction from '../components/events/EventsCallToAction';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid'); // grid or calendar

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(eventData);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setFilter(categoryId);
  };

  const handleViewModeChange = (mode) => {
    setView(mode);
  };

  const filteredEvents = Array.isArray(events) 
    ? (filter === 'all' 
        ? [...events].sort((a, b) => new Date(a.date) - new Date(b.date))
        : [...events]
            .filter(event => event.category === filter)
            .sort((a, b) => new Date(a.date) - new Date(b.date)))
    : [];

  const isUpcoming = (date) => {
    return new Date(date) >= new Date();
  };

  // Get featured upcoming event (if any)
  const featuredUpcomingEvent = filteredEvents.find(e => e.featured && isUpcoming(e.date));

  return (
    <div className="min-h-screen">
      {/* Page Header Component */}
      <EventsHeader />

      {/* Filters Component */}
      <div className="bg-gray-100 py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <EventsFilter 
            categories={eventCategories.map(cat => cat.name)} 
            activeCategory={filter} 
            onCategoryChange={handleCategoryChange}
            viewMode={view}
            onViewModeChange={handleViewModeChange}
          />
        </div>
      </div>

      {/* Events Display */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <LoadingSpinner message="Loading events..." />
          ) : filteredEvents.length > 0 ? (
            view === 'grid' ? (
              <EventGrid events={filteredEvents} />
            ) : (
              <EventCalendar events={filteredEvents} />
            )
          ) : (
            <EmptyState message="No events found in this category." />
          )}
        </div>
      </section>

      {/* School Calendar Download */}
      <CalendarDownload />

      {/* Featured Upcoming Event */}
      {featuredUpcomingEvent && (
        <FeaturedEventPreview event={featuredUpcomingEvent} />
      )}

      {/* Call to Action */}
      <EventsCallToAction />
    </div>
  );
};

export default Events;