import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // In a real application, you would send the data to your backend
      // const response = await axios.post('/api/contact', formData);
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We're here to help. Reach out to us with any questions or concerns.
          </p>
        </div>
      </div>

      {/* Map and Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Map */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Find Us</h2>
              <div className="bg-white p-2 rounded-lg shadow-md h-96">
                {/* Replace with your Google Maps embed code */}
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

            {/* Contact Form */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Admission Inquiry">Admission Inquiry</option>
                    <option value="Fee Structure">Fee Structure</option>
                    <option value="Academic Information">Academic Information</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:bg-blue-400"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'success' && (
                  <p className="mt-4 text-green-600 text-center">
                    Your message has been sent successfully! We will get back to you soon.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="mt-4 text-red-600 text-center">
                    There was a problem sending your message. Please try again later.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
     
           {/* Contact Information */}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Address</h3>
              <p className="text-gray-600">
                123 School Road,<br />
                Education District,<br />
                City - 201301
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-1">Main Office: +91 1234567890</p>
              <p className="text-gray-600 mb-1">Admissions: +91 1234567891</p>
              <p className="text-gray-600">Principal: +91 1234567892</p>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-1">General: info@mansarovarschool.com</p>
              <p className="text-gray-600 mb-1">Admissions: admissions@mansarovarschool.com</p>
              <p className="text-gray-600">Principal: principal@mansarovarschool.com</p>
            </div>
          </div>
        </div>
      </section>



      {/* School Hours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">School Hours</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Office Hours</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium">Monday to Friday:</span>
                  <span>8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span>9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Class Hours</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium">Pre-Primary (Nursery to KG):</span>
                  <span>8:30 AM - 12:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Primary (Classes 1-5):</span>
                  <span>8:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Secondary (Classes 6-10):</span>
                  <span>8:00 AM - 3:00 PM</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Visiting Hours for Parents</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Principal:</span>
                  <span>Monday to Friday, 3:00 PM - 4:00 PM (By Appointment)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Teachers:</span>
                  <span>As per scheduled Parent-Teacher Meetings</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Administrative Staff:</span>
                  <span>Monday to Friday, 9:00 AM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">How can I schedule a campus tour?</h3>
                <p className="text-gray-600">
                  You can schedule a campus tour by filling out the contact form above or by calling our admissions office at +91 1234567891. Campus tours are available on weekdays from 10:00 AM to 2:00 PM.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">How do I check my child's academic progress?</h3>
                <p className="text-gray-600">
                  Parents can monitor their child's academic progress through our parent portal, regular report cards, and scheduled parent-teacher meetings. For immediate concerns, you can request an appointment with the respective class teacher.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">What is the school's policy for sick children?</h3>
                <p className="text-gray-600">
                  Children who are unwell should stay home until they have fully recovered. Please inform the school office about your child's absence. A medical certificate may be required if the absence extends beyond three days.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">How can I get involved as a parent?</h3>
                <p className="text-gray-600">
                  Parents can get involved through our Parent-Teacher Association (PTA), volunteering for school events, participating in parent workshops, and attending school functions. We value parent participation in our school community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
    </div>
  );
};

export default Contact;