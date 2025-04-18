import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Facilities = () => {
  const [activeTab, setActiveTab] = useState('academic');

  const facilities = {
    academic: [
      {
        id: 1,
        title: 'Smart Classrooms',
        description: 'All our classrooms are equipped with interactive smartboards, projectors, and audio systems to facilitate digital learning experiences. Teachers use multimedia resources to make lessons engaging and effective.',
        image: '/src/assets/images/facilities/smart-classroom.jpg'
      },
      {
        id: 2,
        title: 'Science Laboratories',
        description: 'Our state-of-the-art science labs for Physics, Chemistry, and Biology are designed to encourage hands-on learning and scientific inquiry. Students perform experiments under expert guidance to enhance their understanding of scientific concepts.',
        image: '/src/assets/images/facilities/science-lab.jpg'
      },
      {
        id: 3,
        title: 'Computer Lab',
        description: 'The computer lab features the latest hardware and software resources, providing students with opportunities to develop digital literacy and programming skills. Regular practical sessions ensure that students keep pace with technological advancements.',
        image: '/src/assets/images/facilities/computer-lab.jpg'
      },
      {
        id: 4,
        title: 'Library',
        description: 'Our extensive library houses a vast collection of books, periodicals, reference materials, and digital resources. It provides a quiet and comfortable environment for research, reading, and study. Regular library periods are scheduled for all classes.',
        image: '/src/assets/images/facilities/library.jpg'
      },
      {
        id: 5,
        title: 'Language Lab',
        description: 'The language lab is designed to improve students\' communication skills in English and other languages. It is equipped with audio-visual tools and interactive software to enhance listening, speaking, reading, and writing abilities.',
        image: '/src/assets/images/facilities/language-lab.jpg'
      }
    ],
    sports: [
      {
        id: 1,
        title: 'Main Playground',
        description: 'Our spacious main playground accommodates various field sports including cricket, football, and athletics. Regular physical education classes and sports activities are conducted here under the supervision of qualified coaches.',
        image: '/src/assets/images/facilities/playground.jpg'
      },
      {
        id: 2,
        title: 'Basketball Court',
        description: 'The standard-sized basketball court with high-quality flooring and professional-grade hoops provides an excellent facility for practice and competitions. Our school basketball teams regularly participate in inter-school tournaments.',
        image: '/src/assets/images/facilities/basketball-court.jpg'
      },
      {
        id: 3,
        title: 'Indoor Sports Complex',
        description: 'The indoor sports complex houses facilities for badminton, table tennis, chess, carrom, and other indoor games. It allows students to engage in sports activities regardless of weather conditions.',
        image: '/src/assets/images/facilities/indoor-sports.jpg'
      },
      {
        id: 4,
        title: 'Swimming Pool',
        description: 'Our temperature-controlled swimming pool is maintained with the highest safety standards. Qualified swimming instructors conduct regular classes for different skill levels, from beginners to advanced swimmers.',
        image: '/src/assets/images/facilities/swimming-pool.jpg'
      },
      {
        id: 5,
        title: 'Yoga and Fitness Center',
        description: 'The dedicated space for yoga, aerobics, and fitness activities promotes physical well-being and mental relaxation. Regular yoga sessions are conducted for all age groups to encourage a healthy lifestyle.',
        image: '/src/assets/images/facilities/yoga-center.jpg'
      }
    ],
    arts: [
      {
        id: 1,
        title: 'Music Room',
        description: 'Our well-equipped music room features a variety of instruments, sound systems, and recording equipment. Students receive training in vocal and instrumental music under the guidance of experienced music teachers.',
        image: '/src/assets/images/facilities/music-room.jpg'
      },
      {
        id: 2,
        title: 'Dance Studio',
        description: 'The spacious dance studio with mirrored walls, wooden flooring, and sound systems provides an ideal space for learning various dance forms. Regular classes are conducted for classical, folk, and contemporary dance styles.',
        image: '/src/assets/images/facilities/dance-studio.jpg'
      },
      {
        id: 3,
        title: 'Art Studio',
        description: 'The art studio is designed to nurture creativity and artistic skills. It is equipped with easels, pottery wheels, and various art supplies to support different forms of visual arts, including painting, sketching, and pottery.',
        image: '/src/assets/images/facilities/art-studio.jpg'
      },
      {
        id: 4,
        title: 'Theater and Auditorium',
        description: 'Our 500-seat auditorium features professional lighting, sound systems, and stage equipment. It hosts various school events, performances, competitions, and serves as a venue for drama classes and rehearsals.',
        image: '/src/assets/images/facilities/auditorium.jpg'
      }
    ],
    infrastructure: [
      {
        id: 1,
        title: 'Cafeteria',
        description: 'Our spacious cafeteria serves nutritious and balanced meals prepared under hygienic conditions. The menu is designed by nutritionists to cater to the dietary requirements of growing children while ensuring taste and variety.',
        image: '/src/assets/images/facilities/cafeteria.jpg'
      },
      {
        id: 2,
        title: 'Medical Facility',
        description: 'The school infirmary is staffed with qualified medical personnel and equipped with essential medical supplies and facilities for first aid and emergency care. Regular health check-ups are conducted for all students.',
        image: '/src/assets/images/facilities/infirmary.jpg'
      },
      {
        id: 3,
        title: 'Transport',
        description: 'Our fleet of school buses ensures safe and comfortable transportation for students from various parts of the city. All buses are equipped with GPS tracking, first aid kits, and are maintained as per safety standards.',
        image: '/src/assets/images/facilities/transport.jpg'
      },
      {
        id: 4,
        title: 'Eco-Friendly Campus',
        description: 'Our green campus features rainwater harvesting systems, solar panels, and a waste management unit. The school garden and plantation areas serve as outdoor classrooms for environmental education and awareness.',
        image: '/src/assets/images/facilities/eco-campus.jpg'
      },
      {
        id: 5,
        title: 'Safety and Security',
        description: 'The entire campus is under CCTV surveillance with controlled access points. Regular safety drills are conducted, and security personnel are stationed at strategic locations to ensure a safe learning environment.',
        image: '/src/assets/images/facilities/security.jpg'
      }
    ]
  };

  const tabs = [
    { id: 'academic', label: 'Academic Facilities' },
    { id: 'sports', label: 'Sports Facilities' },
    { id: 'arts', label: 'Arts & Culture' },
    { id: 'infrastructure', label: 'Infrastructure' }
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Facilities</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover the world-class facilities and infrastructure that create an ideal learning environment for our students.
          </p>
        </div>
      </div>

      {/* Facilities Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">State-of-the-Art Facilities</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Mansarovar Public School, we provide excellent facilities to support academic, sports, and cultural activities. Our infrastructure is designed to create a safe, stimulating, and nurturing environment for students.
            </p>
          </div>

          {/* Facilities Tabs */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities[activeTab].map((facility) => (
              <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Virtual Tour</h2>
            <p className="text-gray-600 mb-8">
              Explore our campus from the comfort of your home with our interactive virtual tour.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-0 pb-[56.25%] relative bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-4 text-gray-500">Virtual Tour Video</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
              Start Virtual Tour
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">What People Say About Our Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Rahul Kumar</h4>
                  <p className="text-gray-500">Parent</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The school's infrastructure is outstanding. My child particularly enjoys the science labs and the library. The focus on both academics and sports creates a balanced environment for learning."
              </p>
              <div className="mt-4 text-yellow-400">
                ★★★★★
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Priya Sharma</h4>
                  <p className="text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I love our school's art studio and dance room. The teachers encourage us to express ourselves creatively, and we have all the resources we need. The sports facilities are also really good!"
              </p>
              <div className="mt-4 text-yellow-400">
                ★★★★★
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Dr. Akash Verma</h4>
                  <p className="text-gray-500">Education Expert</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Mansarovar Public School sets a high standard with its modern facilities and infrastructure. The balance of academic, sports, and cultural amenities creates an ideal environment for holistic development."
              </p>
              <div className="mt-4 text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Experience Our Facilities in Person</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a campus visit to explore our state-of-the-art facilities and see how we provide an enriching environment for learning and growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Schedule a Visit
            </Link>
            <Link 
              to="/admissions" 
              className="px-6 py-3 bg-yellow-500 text-blue-900 font-medium rounded-md hover:bg-yellow-400 transition"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;