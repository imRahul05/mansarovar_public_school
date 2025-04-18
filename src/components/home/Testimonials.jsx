import React from 'react';
import { testimonials } from '../../data/homeData';

const Testimonials = () => {
  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What People Say About Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-blue-700 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-blue-200">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic">"{testimonial.text}"</p>
              <div className="mt-4 text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;