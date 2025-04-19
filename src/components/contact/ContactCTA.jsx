import React from 'react';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Visit Our School</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Experience our vibrant learning environment firsthand. Schedule a visit to our campus today and discover what makes Mansarovar Public School special.
        </p>
        <Link 
          to="/admissions" 
          className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded-md hover:bg-yellow-400 transition"
        >
          Apply for Admission
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;