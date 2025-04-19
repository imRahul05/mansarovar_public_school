import React from 'react';
import { Link } from 'react-router-dom';

const EventsCallToAction = () => {
  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Want to Organize an Event?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Are you a student or a parent who wants to organize an event at our school? Submit your proposal and our team will get back to you.
        </p>
        <Link 
          to="/contact" 
          className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded-md hover:bg-yellow-400 transition"
        >
          Submit Event Proposal
        </Link>
      </div>
    </section>
  );
};

export default EventsCallToAction;