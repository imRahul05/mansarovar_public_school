import { useState, useEffect } from 'react';
import axios from 'axios';

import HeroBanner from '../components/home/HeroBanner';
import AboutPreview from '../components/home/AboutPreview';
import AcademicsPreview from '../components/home/AcademicsPreview';
import FacilitiesHighlights from '../components/home/FacilitiesHighlights';
import LatestAnnouncements from '../components/home/LatestAnnouncements';
import EventsPreview from '../components/home/EventsPreview';
import GalleryPreview from '../components/home/GalleryPreview';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

// Import fallback data
import { 
  fallbackAnnouncements, 
  fallbackEvents, 
  fallbackGalleryImages 
} from '../data/homeData';

const Home = () => {
  // Initialize arrays with empty arrays to prevent undefined errors
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [announcementsRes, eventsRes, galleryRes] = await Promise.all([
          axios.get('/api/announcements?limit=3'),
          axios.get('/api/events?limit=3&upcoming=true'),
          axios.get('/api/gallery?limit=6')
        ]);

        // Set data from API responses
        setAnnouncements(announcementsRes.data.announcements || []);
        setEvents(eventsRes.data.events || []);
        setGalleryImages(galleryRes.data.images || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
        // Set defaults if API fails
        setAnnouncements(fallbackAnnouncements);
        setEvents(fallbackEvents);
        setGalleryImages(fallbackGalleryImages);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroBanner />
      <AboutPreview />
      <AcademicsPreview />
      <FacilitiesHighlights />
      <LatestAnnouncements announcements={announcements} loading={loading} />
      <EventsPreview events={events} loading={loading} />
      <GalleryPreview galleryImages={galleryImages} loading={loading} />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;