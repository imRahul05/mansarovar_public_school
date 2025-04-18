import React from 'react';

const NoticeHeader = () => {
  return (
    <div className="bg-blue-800 py-16 text-white text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Notice Board</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Stay updated with the latest announcements, events, and important information.
        </p>
      </div>
    </div>
  );
};

export default NoticeHeader;