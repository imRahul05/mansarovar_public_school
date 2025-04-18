import React from 'react';
import { Link } from 'react-router-dom';

const Academics = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Academics</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover our comprehensive academic programs designed to nurture intellectual growth and prepare students for future success.
          </p>
        </div>
      </div>

      {/* Curriculum Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Curriculum</h2>
              <p className="text-gray-600 mb-4">
                At Mansarovar Public School, we follow the Central Board of Secondary Education (CBSE) curriculum, which is designed to provide a balanced education focusing on academic excellence, physical development, and character formation.
              </p>
              <p className="text-gray-600 mb-4">
                Our curriculum emphasizes experiential learning, critical thinking, and creativity. We ensure that students not only gain knowledge but also develop skills that will help them succeed in their future endeavors.
              </p>
              <p className="text-gray-600">
                Regular assessments, both formative and summative, help us monitor student progress and provide timely feedback to improve learning outcomes.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/src/assets/images/academics/curriculum.jpg" 
                alt="Students in classroom" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Academic Levels</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Nursery to KG */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Pre-Primary (Nursery to KG)</h3>
              <p className="text-gray-600 mb-4">
                Our pre-primary program focuses on developing foundational skills through play-based learning. Children are introduced to basic concepts in language, mathematics, and environmental awareness.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Play-based learning approach</li>
                <li>Development of motor skills</li>
                <li>Introduction to letters and numbers</li>
                <li>Social skills and emotional development</li>
                <li>Creative expression through art and music</li>
              </ul>
            </div>
            
            {/* Primary */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Primary (Classes 1-5)</h3>
              <p className="text-gray-600 mb-4">
                The primary section builds upon the foundation with a structured curriculum in language, mathematics, science, social studies, computers, art, and physical education.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Focus on reading and writing skills</li>
                <li>Introduction to scientific concepts</li>
                <li>Basic mathematics and problem-solving</li>
                <li>Environmental and social awareness</li>
                <li>Computer literacy fundamentals</li>
                <li>Co-curricular activities for holistic development</li>
              </ul>
            </div>
            
            {/* Middle & Secondary */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Middle & Secondary (Classes 6-10)</h3>
              <p className="text-gray-600 mb-4">
                Our middle and secondary sections offer a comprehensive curriculum following CBSE guidelines, preparing students for board examinations and future academic pursuits.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Specialized subject teachers</li>
                <li>Advanced concepts in science and mathematics</li>
                <li>Language proficiency development</li>
                <li>Social sciences and humanities</li>
                <li>Information technology education</li>
                <li>Career guidance and counseling</li>
                <li>Preparation for CBSE board examinations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Offered */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Subjects Offered</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our comprehensive curriculum includes a wide range of subjects to provide students with a well-rounded education and prepare them for future academic and professional pursuits.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Languages</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• English</li>
                <li>• Hindi</li>
                <li>• Sanskrit (Optional)</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Mathematics</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• General Mathematics</li>
                <li>• Advanced Mathematics (Classes 9-10)</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sciences</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• General Science (Classes 1-8)</li>
                <li>• Physics (Classes 9-10)</li>
                <li>• Chemistry (Classes 9-10)</li>
                <li>• Biology (Classes 9-10)</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Social Sciences</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Environmental Studies (Classes 1-5)</li>
                <li>• History</li>
                <li>• Geography</li>
                <li>• Civics</li>
                <li>• Economics (Classes 9-10)</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Computer Education</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Computer Basics</li>
                <li>• Programming Fundamentals</li>
                <li>• Information Technology (Classes 9-10)</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Co-Curricular</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Art Education</li>
                <li>• Physical Education</li>
                <li>• Music</li>
                <li>• Dance</li>
                <li>• Yoga</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Teaching Methodology</h2>
              <p className="text-gray-600 mb-4">
                At Mansarovar Public School, we believe in a student-centered approach to education. Our teaching methodologies combine traditional classroom learning with modern interactive techniques.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Interactive Learning</h4>
                    <p className="text-gray-600">Group discussions, debates, and peer teaching to encourage active participation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Project-Based Learning</h4>
                    <p className="text-gray-600">Hands-on projects that connect theoretical knowledge with real-world applications.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Technology Integration</h4>
                    <p className="text-gray-600">Smart classrooms and digital resources to enhance learning experiences.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Personalized Attention</h4>
                    <p className="text-gray-600">Maintaining optimal teacher-student ratio to ensure individual attention.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/src/assets/images/academics/teaching.jpg" 
                alt="Teacher with students" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Assessment System */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Assessment System</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our comprehensive assessment system is designed to evaluate students' academic progress, identify areas for improvement, and provide constructive feedback.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Formative Assessment</h3>
              <p className="text-gray-600 mb-4">
                Continuous evaluation throughout the academic year to monitor progress and provide timely feedback.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Class participation and discussions</li>
                <li>Homework and assignments</li>
                <li>Quizzes and unit tests</li>
                <li>Projects and practical work</li>
                <li>Oral assessments</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Summative Assessment</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive evaluation at the end of each term to assess overall understanding and achievement.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Mid-term examinations</li>
                <li>Term-end examinations</li>
                <li>Annual examinations</li>
                <li>Pre-board examinations (for Classes 9-10)</li>
                <li>CBSE Board Examinations (Class 10)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-gray-800 mb-3">Report Cards and Parent-Teacher Meetings</h4>
            <p className="text-gray-600 mb-2">
              Report cards are issued at the end of each term, providing detailed feedback on academic performance and areas for improvement. Regular parent-teacher meetings are scheduled to discuss student progress and address any concerns.
            </p>
            <p className="text-gray-600">
              Our assessment system follows the guidelines set by CBSE, emphasizing a balance between scholastic and co-scholastic areas to ensure holistic evaluation of students.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Academic Calendar</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our academic year is divided into two terms, with a comprehensive schedule of academic and co-curricular activities.
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-3 px-4 font-bold text-gray-800">Month</th>
                    <th className="py-3 px-4 font-bold text-gray-800">Academic Activities</th>
                    <th className="py-3 px-4 font-bold text-gray-800">Events & Celebrations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">April</td>
                    <td className="py-3 px-4 text-gray-600">New academic session begins, Books distribution</td>
                    <td className="py-3 px-4 text-gray-600">Orientation for new students, World Earth Day</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">May</td>
                    <td className="py-3 px-4 text-gray-600">First unit test, Summer assignments</td>
                    <td className="py-3 px-4 text-gray-600">Mother's Day celebration</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">June</td>
                    <td className="py-3 px-4 text-gray-600">Summer vacation</td>
                    <td className="py-3 px-4 text-gray-600">World Environment Day (online activities)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">July</td>
                    <td className="py-3 px-4 text-gray-600">School reopens, Submission of summer assignments</td>
                    <td className="py-3 px-4 text-gray-600">Inter-house competitions</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">August</td>
                    <td className="py-3 px-4 text-gray-600">Periodic Test-1, Parent-Teacher Meeting</td>
                    <td className="py-3 px-4 text-gray-600">Independence Day celebration</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">September</td>
                    <td className="py-3 px-4 text-gray-600">Half-yearly examinations</td>
                    <td className="py-3 px-4 text-gray-600">Teacher's Day celebration</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">October</td>
                    <td className="py-3 px-4 text-gray-600">Result declaration, Autumn break</td>
                    <td className="py-3 px-4 text-gray-600">Gandhi Jayanti celebration</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                to="/downloads/academic-calendar.pdf" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Full Academic Calendar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Academic Achievements</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We take pride in the outstanding academic accomplishments of our students, which reflect our commitment to excellence in education.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Board Examination Results</h3>
              <p className="text-gray-600 mb-4">
                Our students consistently achieve excellent results in CBSE Board Examinations, with many securing top ranks.
              </p>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-semibold">2024:</span> 98% students scored above 75%</p>
                <p className="text-gray-700"><span className="font-semibold">2023:</span> 95% students scored above 75%</p>
                <p className="text-gray-700"><span className="font-semibold">2022:</span> 94% students scored above 75%</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Olympiads & Competitions</h3>
              <p className="text-gray-600 mb-4">
                Our students regularly participate and excel in various national and international academic competitions.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>National Science Olympiad</li>
                <li>International Mathematics Olympiad</li>
                <li>English Language & Literature Competitions</li>
                <li>Spelling Bee Championships</li>
                <li>NTSE Scholars</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Special Recognitions</h3>
              <p className="text-gray-600 mb-4">
                Our school has received numerous accolades for academic excellence and innovative teaching practices.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Best CBSE School Award (Regional Level)</li>
                <li>Excellence in Science Education Award</li>
                <li>Innovation in Teaching Methodology Recognition</li>
                <li>Outstanding Academic Performance Award</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">What is the student-teacher ratio in classrooms?</h3>
                <p className="text-gray-600">
                  We maintain a student-teacher ratio of approximately 25:1 to ensure personalized attention and effective classroom management.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">How does the school support students who need extra help?</h3>
                <p className="text-gray-600">
                  We provide remedial classes, one-on-one tutoring sessions, and personalized learning plans for students who need additional academic support. Our teachers are available for consultations after school hours.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">What languages are taught in the school?</h3>
                <p className="text-gray-600">
                  English is our primary medium of instruction. Hindi is taught as a second language, and Sanskrit is offered as an optional third language from Class 6 onwards.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">How does the school prepare students for competitive examinations?</h3>
                <p className="text-gray-600">
                  We offer special coaching and preparation classes for various competitive examinations. Our curriculum is designed to build a strong foundation in core subjects, which helps students excel in competitive exams.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Does the school offer any scholarship programs?</h3>
                <p className="text-gray-600">
                  Yes, we offer merit-based scholarships to academically outstanding students and need-based financial aid to deserving students from economically disadvantaged backgrounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Mansarovar Public School?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience excellence in education with our comprehensive academic programs. Apply today and give your child the foundation for a successful future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/admissions" 
              className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded-md hover:bg-yellow-400 transition"
            >
              Apply for Admission
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-white text-blue-800 font-bold rounded-md hover:bg-gray-100 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;