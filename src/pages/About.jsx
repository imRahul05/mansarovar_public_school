import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const About = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/staff');
        setStaff(response.data.staff);
      } catch (error) {
        console.error('Error fetching staff:', error);
        // Sample data in case API fails
        setStaff([
          {
            _id: '1',
            name: 'Dr. Anand Sharma',
            position: 'Principal',
            qualification: 'Ph.D., M.Ed.',
            experience: '25 years',
            image: '/src/assets/images/staff/principal.jpg',
            bio: 'Dr. Sharma has been leading Mansarovar Public School for 10 years with a vision to provide quality education and holistic development to all students.'
          },
          {
            _id: '2',
            name: 'Mrs. Priya Gupta',
            position: 'Vice Principal',
            qualification: 'M.Sc., B.Ed.',
            experience: '18 years',
            image: '/src/assets/images/staff/vice-principal.jpg',
            bio: 'Mrs. Gupta oversees academic excellence and student discipline, ensuring high standards are maintained throughout the school.'
          },
          {
            _id: '3',
            name: 'Mr. Rajesh Kumar',
            position: 'Head of Sciences',
            qualification: 'M.Sc. Physics',
            experience: '15 years',
            image: '/src/assets/images/staff/science-head.jpg',
            bio: 'Mr. Kumar brings innovation to science education with his practical approach and engaging teaching methods.'
          },
          {
            _id: '4',
            name: 'Mrs. Sunita Patel',
            position: 'Head of Languages',
            qualification: 'M.A. English Literature',
            experience: '17 years',
            image: '/src/assets/images/staff/language-head.jpg',
            bio: 'Mrs. Patel is passionate about literature and encourages creative writing among students.'
          },
          {
            _id: '5',
            name: 'Mr. Vikas Malhotra',
            position: 'Mathematics Department',
            qualification: 'M.Sc. Mathematics',
            experience: '12 years',
            image: '/src/assets/images/staff/maths-teacher.jpg',
            bio: 'Mr. Malhotra makes mathematics accessible and enjoyable for all students with his unique teaching strategies.'
          },
          {
            _id: '6',
            name: 'Mrs. Deepa Singh',
            position: 'Primary Section Coordinator',
            qualification: 'B.Ed., M.A. Education',
            experience: '14 years',
            image: '/src/assets/images/staff/primary-coordinator.jpg',
            bio: 'Mrs. Singh ensures that our youngest students receive age-appropriate education in a nurturing environment.'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Our School</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover our journey, mission, and the dedicated team that makes Mansarovar Public School a center of excellence in education.
          </p>
        </div>
      </div>

      {/* School Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">School Overview</h2>
              <p className="text-gray-600 mb-4">
                Founded in 1995, Mansarovar Public School has grown to become one of the most respected educational institutions in the region. Starting with just a handful of students, we now have a vibrant community of over 1,500 students and 100 staff members.
              </p>
              <p className="text-gray-600 mb-4">
                Our school is affiliated with the Central Board of Secondary Education (CBSE) and offers education from Nursery to Class 10. We take pride in providing quality education that balances academic rigor with holistic development.
              </p>
              <p className="text-gray-600">
                The school campus spans over 5 acres with modern infrastructure including smart classrooms, well-equipped laboratories, a comprehensive library, and extensive sports facilities. We believe in creating an environment that fosters learning, creativity, and personal growth.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/src/assets/images/school-building.jpg" 
                alt="Mansarovar Public School Building" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision & Mission</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 ml-4">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To be a premier educational institution that nurtures global citizens with strong values, innovative thinking, and a commitment to positive change. We envision our students as future leaders who are intellectually competent, morally upright, socially conscious, and emotionally balanced.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 ml-4">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                Our mission is to provide holistic education that empowers students to excel academically while developing essential life skills. We are committed to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Providing excellent academic education that encourages critical thinking</li>
                <li>Fostering character development and ethical values</li>
                <li>Creating a supportive and inclusive learning environment</li>
                <li>Encouraging creativity and innovation</li>
                <li>Building a strong partnership between school, parents, and community</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <img 
                src="/src/assets/images/staff/principal.jpg" 
                alt="School Principal" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Message from the Principal</h2>
              <div className="mb-6 text-gray-500">
                <p className="font-semibold">Dr. Anand Sharma, Ph.D., M.Ed.</p>
                <p>Principal, Mansarovar Public School</p>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Dear Parents and Students,
                </p>
                <p>
                  It gives me immense pleasure to welcome you to Mansarovar Public School. Our institution stands as a beacon of academic excellence and character development for over two decades.
                </p>
                <p>
                  At Mansarovar, we believe that education goes beyond textbooks and classrooms. Our goal is to nurture young minds to become responsible citizens who can contribute positively to society. We strive to create an environment where students can discover their potential, pursue their passions, and develop into well-rounded individuals.
                </p>
                <p>
                  Our dedicated faculty, state-of-the-art infrastructure, and comprehensive curriculum ensure that every child receives personalized attention and quality education. We emphasize on values like integrity, respect, and perseverance that shape the character of our students.
                </p>
                <p>
                  As we navigate the rapidly changing world, we are committed to equipping our students with the skills needed for the future while preserving our rich cultural heritage. The blend of tradition and modernity is what makes Mansarovar Public School unique.
                </p>
                <p>
                  I invite you to explore our school and join us in this enriching educational journey. Together, let us shape the future of our children.
                </p>
                <p className="font-semibold">
                  Warm regards,<br />
                  Dr. Anand Sharma
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School History */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Journey Through the Years</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto mb-12"></div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {/* 1995 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-2xl font-bold text-blue-800">1995</h3>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Foundation</h4>
                  <p className="text-gray-600">
                    Mansarovar Public School was founded by educational visionary Mr. Rakesh Sharma with just 120 students and 15 teachers in a small rented building.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  <img 
                    src="/src/assets/images/history/founding.jpg" 
                    alt="School Founding" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>

              {/* 2000 */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-bold text-blue-800">2000</h3>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Expansion</h4>
                  <p className="text-gray-600">
                    The school moved to its current 5-acre campus with expanded facilities including a library, science labs, and sports fields. Student strength grew to over 500.
                  </p>
                </div>
                <div className="md:w-1/2 md:pr-8 mt-4 md:mt-0 md:text-right">
                  <img 
                    src="/src/assets/images/history/expansion.jpg" 
                    alt="School Expansion" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>

              {/* 2005 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-2xl font-bold text-blue-800">2005</h3>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">CBSE Affiliation</h4>
                  <p className="text-gray-600">
                    Mansarovar Public School received CBSE affiliation, marking a significant milestone in its academic journey. The first batch of Class 10 students graduated with excellent results.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  <img 
                    src="/src/assets/images/history/affiliation.jpg" 
                    alt="CBSE Affiliation" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>

              {/* 2010 */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-bold text-blue-800">2010</h3>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Innovation & Technology</h4>
                  <p className="text-gray-600">
                    The school embraced digital education with smart classrooms and computer labs. A new modern building block was inaugurated with state-of-the-art facilities.
                  </p>
                </div>
                <div className="md:w-1/2 md:pr-8 mt-4 md:mt-0 md:text-right">
                  <img 
                    src="/src/assets/images/history/technology.jpg" 
                    alt="Technology Integration" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>

              {/* 2020 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <h3 className="text-2xl font-bold text-blue-800">2020</h3>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Silver Jubilee</h4>
                  <p className="text-gray-600">
                    Celebrated 25 years of excellence in education. The school was recognized for its academic achievements and contribution to the community.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  <img 
                    src="/src/assets/images/history/silver-jubilee.jpg" 
                    alt="Silver Jubilee Celebration" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>

              {/* Present */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-8">
                  <h3 className="text-2xl font-bold text-blue-800">Present Day</h3>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Forward Looking</h4>
                  <p className="text-gray-600">
                    Today, Mansarovar Public School stands as a premier educational institution with over 1,500 students and 100 staff members, continuously evolving to meet future challenges.
                  </p>
                </div>
                <div className="md:w-1/2 md:pr-8 mt-4 md:mt-0 md:text-right">
                  <img 
                    src="/src/assets/images/history/present-day.jpg" 
                    alt="School Present Day" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Directory */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Staff</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Meet the dedicated team of educators and administrators who make Mansarovar Public School a center of excellence. Our staff brings experience, passion, and expertise to guide students on their educational journey.
          </p>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-700">Loading staff information...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff?.map((member) => (
                <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 mb-2">{member.position}</p>
                    <div className="text-sm text-gray-500 mb-3">
                      <p><span className="font-medium">Qualification:</span> {member.qualification}</p>
                      <p><span className="font-medium">Experience:</span> {member.experience}</p>
                    </div>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-blue-100">
            These principles guide our approach to education and form the foundation of our school's culture.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-700 p-6 rounded-lg">
              <div className="text-yellow-400 text-4xl mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-blue-100">
                We uphold honesty, truth, and moral uprightness in all actions and decisions. We encourage students to be principled individuals who take responsibility for their actions.
              </p>
            </div>
            
            <div className="bg-blue-700 p-6 rounded-lg">
              <div className="text-yellow-400 text-4xl mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-blue-100">
                We strive for the highest standards in everything we do. We encourage students to pursue excellence not just in academics but in all their endeavors.
              </p>
            </div>
            
            <div className="bg-blue-700 p-6 rounded-lg">
              <div className="text-yellow-400 text-4xl mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Respect</h3>
              <p className="text-blue-100">
                We foster respect for oneself, others, and the environment. We celebrate diversity and create an inclusive community where everyone feels valued and heard.
              </p>
            </div>
            
            <div className="bg-blue-700 p-6 rounded-lg">
              <div className="text-yellow-400 text-4xl mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-blue-100">
                We encourage creative thinking, problem-solving, and adaptation to change. We prepare students to thrive in a rapidly evolving world through innovative approaches to learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Code of Conduct</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Our school code of conduct establishes guidelines for creating a positive learning environment that supports academic achievement and character development.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">For Students</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Attend school regularly and punctually</li>
                  <li>Wear the proper school uniform and maintain neat appearance</li>
                  <li>Treat all members of the school community with respect and courtesy</li>
                  <li>Complete all assignments and homework on time</li>
                  <li>Take care of school property and environment</li>
                  <li>Participate actively in school activities</li>
                  <li>Adhere to the school's discipline and behavior guidelines</li>
                  <li>Use technology responsibly and appropriately</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">For Parents</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Support your child's education and be involved in school activities</li>
                  <li>Ensure regular attendance and punctuality</li>
                  <li>Maintain open communication with teachers and school administration</li>
                  <li>Attend parent-teacher meetings regularly</li>
                  <li>Provide a supportive environment for homework and studies</li>
                  <li>Inform the school about any concerns affecting your child's education</li>
                  <li>Be familiar with and support school policies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">For Staff</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Demonstrate professional behavior and ethical standards</li>
                  <li>Provide quality education and mentorship to students</li>
                  <li>Maintain confidentiality regarding student information</li>
                  <li>Create an inclusive and positive learning environment</li>
                  <li>Continuously improve professional knowledge and skills</li>
                  <li>Collaborate with colleagues and parents for student success</li>
                  <li>Model the values and behaviors expected of students</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Community</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Become a part of Mansarovar Public School and give your child the gift of quality education in a nurturing environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
            <Link 
              to="/admissions" 
              className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded-md hover:bg-yellow-400 transition"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;