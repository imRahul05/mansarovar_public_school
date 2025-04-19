import React, { useState } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { Link } from 'react-router-dom';

const EventCalendar = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Create calendar days for current view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  // Get all days in the current calendar view
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = event.date.split('T')[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 bg-blue-600 text-white flex items-center justify-between">
        <button onClick={prevMonth} className="p-1 hover:bg-blue-700 rounded">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-1 hover:bg-blue-700 rounded">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="px-2 py-3 text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 h-full">
        {calendarDays.map((day, i) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const dayEvents = eventsByDate[dateKey] || [];
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <div 
              key={i} 
              className={`min-h-[100px] border p-1 ${
                !isCurrentMonth ? 'bg-gray-100' : ''
              } ${isToday(day) ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <div className={`text-right text-sm mb-1 ${!isCurrentMonth ? 'text-gray-400' : 'font-semibold'}`}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayEvents.map(event => (
                  <Link 
                    key={event._id} 
                    to={`/events/${event._id}`}
                    className="block p-1 text-xs rounded bg-blue-100 hover:bg-blue-200 truncate"
                  >
                    <div className="font-medium text-blue-800 truncate">
                      {event.title}
                    </div>
                    <div className="text-blue-600">
                      {event.time}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;