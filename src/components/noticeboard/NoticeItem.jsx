import React from 'react';

const NoticeItem = ({ notice }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
        notice.important ? 'border-red-500' : 'border-blue-500'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
              {notice.category}
            </span>
            {notice.important && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                Important
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(notice.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{notice.title}</h3>
        <p className="text-gray-600 mb-4">{notice.description}</p>
        
        {Array.isArray(notice.attachments) && notice.attachments.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Attachments:</h4>
            <div className="space-y-2">
              {notice.attachments.map((attachment, index) => (
                <a 
                  key={index} 
                  href={attachment.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  {attachment.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeItem;