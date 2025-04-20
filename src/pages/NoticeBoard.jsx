import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NoticeHeader from '../components/noticeboard/NoticeHeader';
import CategoryFilter from '../components/noticeboard/CategoryFilter';
import NoticeList from '../components/noticeboard/NoticeList';
import SubscribeSection from '../components/noticeboard/SubscribeSection';

// Import data from separated file
import { categories, fallbackNotices } from '../data/noticeboardData';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/notices');
        setNotices(response.data.notices);
      } catch (error) {
        console.error('Error fetching notices:', error);
        // Use fallback data from the imported file
        setNotices(fallbackNotices);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen">
      <NoticeHeader />
      <CategoryFilter 
        categories={categories} 
        activeFilter={filter} 
        onFilterChange={handleFilterChange} 
      />
      <NoticeList 
        notices={notices} 
        loading={loading} 
        filter={filter} 
        categories={categories} 
      />
      <SubscribeSection />
    </div>
  );
};

export default NoticeBoard;