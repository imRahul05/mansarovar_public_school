// Facility Tabs Data
export const tabs = [
  { id: 'academic', label: 'Academic' },
  { id: 'sports', label: 'Sports' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'extracurricular', label: 'Extra-curricular' },
];

// Facilities Data
export const facilities = {
  academic: [
    {
      id: 'library',
      title: 'Modern Library',
      description: 'Our well-stocked library houses over 10,000 books, digital resources, and comfortable reading spaces.',
      image: '/src/assets/images/facilities/library.jpg',
    },
    {
      id: 'science-labs',
      title: 'Science Laboratories',
      description: 'State-of-the-art physics, chemistry and biology labs equipped with the latest equipment.',
      image: '/src/assets/images/facilities/science-lab.jpg',
    },
    {
      id: 'computer-lab',
      title: 'Computer Laboratory',
      description: 'Modern computer labs with high-speed internet access and the latest software for digital learning.',
      image: '/src/assets/images/facilities/computer-lab.jpg',
    },
    {
      id: 'smart-classrooms',
      title: 'Smart Classrooms',
      description: 'Interactive digital boards and multimedia tools enhance the learning experience.',
      image: '/src/assets/images/facilities/smart-classroom.jpg',
    },
  ],
  sports: [
    {
      id: 'playground',
      title: 'Expansive Playground',
      description: 'Large athletic field for various outdoor sports and physical education activities.',
      image: '/src/assets/images/facilities/playground.jpg',
    },
    {
      id: 'indoor-sports',
      title: 'Indoor Sports Complex',
      description: 'Facilities for table tennis, chess, carom, badminton and other indoor games.',
      image: '/src/assets/images/facilities/indoor-sports.jpg',
    },
    {
      id: 'swimming-pool',
      title: 'Swimming Pool',
      description: 'Temperature-controlled swimming pool with trained instructors and safety equipment.',
      image: '/src/assets/images/facilities/swimming-pool.jpg',
    },
    {
      id: 'cricket-academy',
      title: 'Cricket Academy',
      description: 'Professional training for aspiring cricketers with experienced coaches.',
      image: '/src/assets/images/facilities/cricket-academy.jpg',
    },
  ],
  infrastructure: [
    {
      id: 'auditorium',
      title: 'Multipurpose Auditorium',
      description: 'Modern auditorium for school events, performances, and assemblies.',
      image: '/src/assets/images/facilities/auditorium.jpg',
    },
    {
      id: 'cafeteria',
      title: 'Cafeteria',
      description: 'Spacious dining area serving nutritious meals prepared in our hygenic kitchen.',
      image: '/src/assets/images/facilities/cafeteria.jpg',
    },
    {
      id: 'transport',
      title: 'Transportation',
      description: 'Fleet of school buses providing safe transportation with GPS tracking.',
      image: '/src/assets/images/facilities/transport.jpg',
    },
    {
      id: 'medical-center',
      title: 'Medical Center',
      description: 'On-campus medical facility with qualified healthcare professionals.',
      image: '/src/assets/images/facilities/medical.jpg',
    },
  ],
  extracurricular: [
    {
      id: 'music-room',
      title: 'Music Room',
      description: 'Well-equipped music room with various instruments for vocal and instrumental training.',
      image: '/src/assets/images/facilities/music-room.jpg',
    },
    {
      id: 'art-studio',
      title: 'Art Studio',
      description: 'Creative space for students to explore various art forms and develop artistic skills.',
      image: '/src/assets/images/facilities/art-studio.jpg',
    },
    {
      id: 'dance-studio',
      title: 'Dance Studio',
      description: 'Professional dance studio with mirrors and proper flooring for various dance forms.',
      image: '/src/assets/images/facilities/dance-studio.jpg',
    },
    {
      id: 'robotics-lab',
      title: 'Robotics Lab',
      description: 'Cutting-edge robotics laboratory for hands-on learning and innovation.',
      image: '/src/assets/images/facilities/robotics-lab.jpg',
    },
  ],
};

// Virtual Tour Data
export const virtualTourData = {
  title: "Take a Virtual Tour",
  description: "Explore our campus from the comfort of your home through our interactive virtual tour. Get a 360° view of our classrooms, laboratories, playgrounds, and other facilities.",
  videoUrl: "https://www.youtube.com/embed/your-video-id",
  thumbnail: "/src/assets/images/facilities/virtual-tour-thumbnail.jpg"
};

// Testimonials Data
export const testimonialsData = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Parent",
    quote: "The facilities at Mansarovar Public School are truly impressive. The science laboratories and smart classrooms have greatly enhanced my child's learning experience.",
    image: "/src/assets/images/testimonials/parent1.jpg",
    rating:["★","★","★","★"]
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Student",
    quote: "I love our library and sports facilities. The swimming pool and cricket academy have helped me develop my athletic abilities alongside my academic pursuits.",
    image: "/src/assets/images/testimonials/student1.jpg"
  },
  {
    id: 3,
    name: "Dr. Anand Verma",
    role: "Education Expert",
    quote: "Mansarovar Public School sets a high standard with its world-class infrastructure. The integration of technology in classrooms prepares students for the future.",
    image: "/src/assets/images/testimonials/expert1.jpg"
  }
];