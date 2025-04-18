// Gallery sample data

const galleryImages = [
  { 
    _id: '1', 
    title: 'Annual Day Celebration', 
    category: 'events', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Students performing at the Annual Day function 2025.',
    date: '2025-02-15' 
  },
  { 
    _id: '2', 
    title: 'Science Exhibition', 
    category: 'academics', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Students showcasing their innovative science projects.',
    date: '2025-03-10' 
  },
  { 
    _id: '3', 
    title: 'Inter-School Cricket Tournament', 
    category: 'sports', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Our school cricket team winning the inter-school tournament.',
    date: '2025-01-25' 
  },
  { 
    _id: '4', 
    title: 'Independence Day Celebration', 
    category: 'events', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Students and staff celebrating Independence Day with patriotic fervor.',
    date: '2024-08-15' 
  },
  { 
    _id: '5', 
    title: 'School Building', 
    category: 'campus', 
    url: '/src/assets/images/gallery/school-building.jpg', 
    description: 'Front view of our main school building.',
    date: '2024-07-05' 
  },
  { 
    _id: '6', 
    title: 'Computer Lab', 
    category: 'facilities', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Students working in our state-of-the-art computer laboratory.',
    date: '2024-09-20' 
  },
  { 
    _id: '7', 
    title: 'Annual Sports Day', 
    category: 'sports', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Students participating in various athletic events during Sports Day.',
    date: '2024-12-12' 
  },
  { 
    _id: '8', 
    title: 'Art Exhibition', 
    category: 'activities', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Creative artwork by our talented students on display.',
    date: '2025-02-28' 
  },
  { 
    _id: '9', 
    title: 'Library', 
    category: 'facilities', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Our well-stocked library with a wide range of books and reference materials.',
    date: '2024-10-15' 
  },
  { 
    _id: '10', 
    title: 'Cultural Dance Performance', 
    category: 'events', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Students showcasing classical dance forms during the cultural fest.',
    date: '2025-01-20' 
  },
  { 
    _id: '11', 
    title: 'Science Laboratory', 
    category: 'facilities', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Well-equipped science laboratory for practical learning.',
    date: '2024-11-05' 
  },
  { 
    _id: '12', 
    title: 'Eco Club Tree Plantation', 
    category: 'activities', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Students engaged in environmental conservation activities.',
    date: '2025-03-21' 
  },
  { 
    _id: '13', 
    title: 'Basketball Match', 
    category: 'sports', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Intense action during an inter-house basketball tournament.',
    date: '2025-02-10' 
  },
  { 
    _id: '14', 
    title: 'School Assembly', 
    category: 'campus', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Morning assembly in progress with students lined up in the amphitheater.',
    date: '2025-03-01' 
  },
  { 
    _id: '15', 
    title: 'Classroom Teaching', 
    category: 'academics', 
    url: 'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8=', 
    description: 'Interactive teaching session in a smart classroom.',
    date: '2025-01-15' 
  }
];

export const galleryCategories = [
  { id: 'all', name: 'All Photos' },
  { id: 'events', name: 'Events' },
  { id: 'academics', name: 'Academics' },
  { id: 'sports', name: 'Sports' },
  { id: 'activities', name: 'Activities' },
  { id: 'facilities', name: 'Facilities' },
  { id: 'campus', name: 'Campus' }
];

export default galleryImages;