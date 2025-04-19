import React from 'react';

const ContactMap = () => {
  return (
    <div className="lg:w-1/2">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Find Us</h2>
      <div className="bg-white p-2 rounded-lg shadow-md h-96">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2231320555616!2d77.0401!3d28.4601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM2LjQiTiA3N8KwMDInMjQuNCJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="School Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;