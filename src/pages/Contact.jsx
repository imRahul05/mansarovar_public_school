import React from 'react';
import ContactHeader from '../components/contact/ContactHeader';
import ContactMap from '../components/contact/ContactMap';
import ContactForm from '../components/contact/ContactForm';
import ContactInfoCards from '../components/contact/ContactInfoCards';
import SchoolHours from '../components/contact/SchoolHours';
import ContactFAQ from '../components/contact/ContactFAQ';
import ContactCTA from '../components/contact/ContactCTA';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <ContactHeader />

      {/* Map and Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <ContactMap />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <ContactInfoCards />

      {/* School Hours */}
      <SchoolHours />

      {/* FAQs */}
      <ContactFAQ />

      {/* Call to Action */}
      <ContactCTA />
    </div>
  );
};

export default Contact;