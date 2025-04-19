export const eventData =[
    {
      _id: '1',
      title: 'Annual Day Celebration',
      description: 'Join us for a day of performances and celebration showcasing the talents of our students across all grades. Parents are cordially invited to attend this special event that marks the culmination of our academic year.',
      shortDescription: 'A showcase of student performances and achievements.',
      date: '2025-05-15',
      time: '9:00 AM - 3:00 PM',
      location: 'School Auditorium',
      category: 'cultural',
      featured: true,
      image: '/src/assets/images/events/annual-day.jpg',
      registerBy: '2025-05-10'
    },
    {
      _id: '2',
      title: 'Science Exhibition',
      description: 'Students will showcase their innovative science projects covering various fields including physics, chemistry, biology, and environmental science. The exhibition aims to foster scientific thinking and creativity among students.',
      shortDescription: 'Innovative projects by our young scientists.',
      date: '2025-04-28',
      time: '10:00 AM - 2:00 PM',
      location: 'School Science Labs',
      category: 'academic',
      featured: false,
      image: '/src/assets/images/events/science-exhibition.jpg',
      registerBy: '2025-04-20'
    },
    {
      _id: '3',
      title: 'Inter-School Debate Competition',
      description: 'Our school is hosting the annual inter-school debate competition with participation from 10 schools in the region. Students will debate on current social and environmental issues, showcasing their research and oratory skills.',
      shortDescription: 'Showcasing oratory skills and critical thinking.',
      date: '2025-05-10',
      time: '11:00 AM - 4:00 PM',
      location: 'School Conference Hall',
      category: 'competition',
      featured: true,
      image: '/src/assets/images/events/debate.jpg',
      registerBy: '2025-05-05'
    },
    {
      _id: '4',
      title: 'Parent-Teacher Meeting',
      description: 'A scheduled meeting between parents and teachers to discuss student progress, academic performance, and other concerns. Please arrive on time for your allocated slot.',
      shortDescription: 'Discussion on student progress and development.',
      date: '2025-04-20',
      time: '9:00 AM - 1:00 PM',
      location: 'Respective Classrooms',
      category: 'academic',
      featured: false,
      image: '/src/assets/images/events/ptm.jpg',
      registerBy: null
    },
    {
      _id: '5',
      title: 'Annual Sports Day',
      description: 'A full day of athletic competitions including track and field events, team sports, and special displays. Students participate based on age groups, and winners will be awarded medals and certificates.',
      shortDescription: 'Celebrating sportsmanship and athletic excellence.',
      date: '2025-05-05',
      time: '8:00 AM - 4:00 PM',
      location: 'School Sports Ground',
      category: 'sports',
      featured: true,
      image: '/src/assets/images/events/sports-day.jpg',
      registerBy: '2025-04-25'
    },
    {
      _id: '6',
      title: 'Career Counseling Workshop',
      description: 'A workshop designed for students of classes 9 and 10, featuring career experts and professionals from various fields who will provide guidance on career choices, required skills, and educational pathways.',
      shortDescription: 'Guidance for future educational and career choices.',
      date: '2025-04-22',
      time: '11:00 AM - 2:00 PM',
      location: 'School Library',
      category: 'workshop',
      featured: false,
      image: '/src/assets/images/events/career-workshop.jpg',
      registerBy: '2025-04-20'
    },
    {
      _id: '7',
      title: 'Art and Craft Exhibition',
      description: 'An exhibition showcasing the artistic talents of our students across all age groups. Artwork includes paintings, handicrafts, pottery, and digital art created throughout the academic year.',
      shortDescription: 'Displaying creative expressions through various art forms.',
      date: '2025-05-18',
      time: '10:00 AM - 3:00 PM',
      location: 'School Art Gallery',
      category: 'cultural',
      featured: false,
      image: '/src/assets/images/events/art-exhibition.jpg',
      registerBy: null
    },
    {
      _id: '8',
      title: 'Environmental Awareness Campaign',
      description: 'A student-led campaign to raise awareness about environmental conservation. Activities include tree plantation, waste management workshops, and presentations on sustainable practices.',
      shortDescription: 'Student initiatives for a greener future.',
      date: '2025-04-25',
      time: '9:00 AM - 12:00 PM',
      location: 'School Campus',
      category: 'other',
      featured: false,
      image: '/src/assets/images/events/environment-campaign.jpg',
      registerBy: '2025-04-23'
    }
  ]

export const eventCategories = [
    { id: 'all', name: 'All Events' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'sports', name: 'Sports' },
    { id: 'academic', name: 'Academic' },
    { id: 'competition', name: 'Competition' },
    { id: 'workshop', name: 'Workshop' },
    { id: 'other', name: 'Other' }
  ]