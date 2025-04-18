// Notice board categories
export const categories = [
  { id: 'all', name: 'All Notices' },
  { id: 'admission', name: 'Admission' },
  { id: 'academic', name: 'Academic' },
  { id: 'event', name: 'Events' },
  { id: 'holiday', name: 'Holidays' },
  { id: 'fee', name: 'Fees' },
  { id: 'transport', name: 'Transport' },
  { id: 'competition', name: 'Competitions' }
];

// Sample notice data in case API fails
export const fallbackNotices = [
  {
    _id: '1',
    title: 'Admission Open for 2025-26',
    category: 'admission',
    description: 'Applications are now being accepted for the next academic year. Apply before May 31st for priority consideration. Forms are available online and at the school reception.',
    date: '2025-04-10',
    important: true,
    attachments: [
      { name: 'Admission Form', fileUrl: '/documents/admission-form.pdf' }
    ]
  },
  {
    _id: '2',
    title: 'Annual Sports Day',
    category: 'event',
    description: 'Annual Sports Day will be held on April 25th, 2025. All students must participate in at least one event. Parents are cordially invited to attend and encourage the participants.',
    date: '2025-04-12',
    important: false,
    attachments: []
  },
  {
    _id: '3',
    title: 'Parent-Teacher Meeting',
    category: 'academic',
    description: 'PTM for classes 6-10 scheduled for April 30th from 10 AM to 1 PM. Attendance is mandatory for at least one parent. Student report cards will be distributed during the meeting.',
    date: '2025-04-15',
    important: true,
    attachments: []
  },
  {
    _id: '4',
    title: 'Summer Vacation Notice',
    category: 'holiday',
    description: 'School will remain closed for summer vacation from May 20th to June 30th, 2025. Classes will resume on July 1st. Holiday homework will be assigned before the vacation begins.',
    date: '2025-04-16',
    important: false,
    attachments: []
  },
  {
    _id: '5',
    title: 'Fee Payment Reminder',
    category: 'fee',
    description: 'This is to remind all parents that the fees for the first quarter of the academic year 2025-26 are due by April 30th. Late payment will attract a fine as per school policy.',
    date: '2025-04-17',
    important: true,
    attachments: [
      { name: 'Fee Structure', fileUrl: '/documents/fee-structure.pdf' }
    ]
  },
  {
    _id: '6',
    title: 'New School Bus Routes',
    category: 'transport',
    description: 'New bus routes will be effective from May 1st, 2025. Please check the attached document for details or contact the transport in-charge for any clarification.',
    date: '2025-04-18',
    important: false,
    attachments: [
      { name: 'Bus Routes', fileUrl: '/documents/bus-routes.pdf' }
    ]
  },
  {
    _id: '7',
    title: 'Inter-School Debate Competition',
    category: 'competition',
    description: 'Students interested in participating in the Inter-School Debate Competition should register with their English teacher by April 22nd. The competition will be held on May 5th.',
    date: '2025-04-18',
    important: false,
    attachments: []
  }
];