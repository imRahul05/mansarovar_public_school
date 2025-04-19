import React from 'react';
import NoticeItem from './NoticeItem';

const NoticeList = ({ notices = [], loading, filter, categories = [] }) => {
  const filteredNotices = filter === 'all' ? 
    notices : 
    (notices && Array.isArray(notices) ? notices.filter(notice => notice.category === filter) : []);

  const categoryTitle = filter === 'all' ? 'All Notices' : 
    (categories && categories.find(c => c.id === filter)?.name || 'Category') + ' Notices';

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{categoryTitle}</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-gray-700">Loading notices...</p>
          </div>
        ) : filteredNotices && filteredNotices.length > 0 ? (
          <div className="space-y-6">
            {filteredNotices.map(notice => (
              <NoticeItem key={notice._id} notice={notice} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg text-gray-600">No notices found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NoticeList;