const academicsData = {
  header: {
    title: "Academics",
    description: "Discover our comprehensive academic programs designed to nurture intellectual growth and prepare students for future success."
  },
  curriculum: {
    title: "Our Curriculum",
    description: [
      "At Mansarovar Public School, we follow the Central Board of Secondary Education (CBSE) curriculum, which is designed to provide a balanced education focusing on academic excellence, physical development, and character formation.",
      "Our curriculum emphasizes experiential learning, critical thinking, and creativity. We ensure that students not only gain knowledge but also develop skills that will help them succeed in their future endeavors.",
      "Regular assessments, both formative and summative, help us monitor student progress and provide timely feedback to improve learning outcomes."
    ],
    image: "/src/assets/images/academics/curriculum.jpg",
    imageAlt: "Students in classroom"
  },
  academicLevels: {
    title: "Academic Levels",
    description: "Our comprehensive academic structure is designed to meet the learning needs of students at different stages of development.",
    levels: [
      {
        title: "Pre-Primary (Nursery to KG)",
        icon: "home",
        description: "Our pre-primary program focuses on developing foundational skills through play-based learning. Children are introduced to basic concepts in language, mathematics, and environmental awareness.",
        features: [
          "Play-based learning approach",
          "Development of motor skills",
          "Introduction to letters and numbers",
          "Social skills and emotional development",
          "Creative expression through art and music"
        ]
      },
      {
        title: "Primary (Classes 1-5)",
        icon: "book",
        description: "The primary section builds upon the foundation with a structured curriculum in language, mathematics, science, social studies, computers, art, and physical education.",
        features: [
          "Focus on reading and writing skills",
          "Introduction to scientific concepts",
          "Basic mathematics and problem-solving",
          "Environmental and social awareness",
          "Computer literacy fundamentals",
          "Co-curricular activities for holistic development"
        ]
      },
      {
        title: "Middle & Secondary (Classes 6-10)",
        icon: "flask",
        description: "Our middle and secondary sections offer a comprehensive curriculum following CBSE guidelines, preparing students for board examinations and future academic pursuits.",
        features: [
          "Specialized subject teachers",
          "Advanced concepts in science and mathematics",
          "Language proficiency development",
          "Social sciences and humanities",
          "Information technology education",
          "Career guidance and counseling",
          "Preparation for CBSE board examinations"
        ]
      }
    ]
  },
  subjects: {
    title: "Subjects Offered",
    description: "Our comprehensive curriculum includes a wide range of subjects to provide students with a well-rounded education and prepare them for future academic and professional pursuits.",
    subjectCategories: [
      {
        name: "Languages",
        borderColor: "blue",
        subjects: ["English", "Hindi", "Sanskrit (Optional)"]
      },
      {
        name: "Mathematics",
        borderColor: "green",
        subjects: ["General Mathematics", "Advanced Mathematics (Classes 9-10)"]
      },
      {
        name: "Sciences",
        borderColor: "purple",
        subjects: [
          "General Science (Classes 1-8)", 
          "Physics (Classes 9-10)", 
          "Chemistry (Classes 9-10)", 
          "Biology (Classes 9-10)"
        ]
      },
      {
        name: "Social Sciences",
        borderColor: "yellow",
        subjects: [
          "Environmental Studies (Classes 1-5)", 
          "History", 
          "Geography", 
          "Civics", 
          "Economics (Classes 9-10)"
        ]
      },
      {
        name: "Computer Education",
        borderColor: "red",
        subjects: [
          "Computer Basics",
          "Programming Fundamentals",
          "Information Technology (Classes 9-10)"
        ]
      },
      {
        name: "Co-Curricular",
        borderColor: "indigo",
        subjects: [
          "Art Education", 
          "Physical Education", 
          "Music", 
          "Dance", 
          "Yoga"
        ]
      }
    ]
  },
  teachingMethodology: {
    title: "Our Teaching Methodology",
    description: "At Mansarovar Public School, we believe in a student-centered approach to education. Our teaching methodologies combine traditional classroom learning with modern interactive techniques.",
    methods: [
      {
        title: "Interactive Learning",
        description: "Group discussions, debates, and peer teaching to encourage active participation."
      },
      {
        title: "Project-Based Learning",
        description: "Hands-on projects that connect theoretical knowledge with real-world applications."
      },
      {
        title: "Technology Integration",
        description: "Smart classrooms and digital resources to enhance learning experiences."
      },
      {
        title: "Personalized Attention",
        description: "Maintaining optimal teacher-student ratio to ensure individual attention."
      }
    ],
    image: "/src/assets/images/academics/teaching.jpg",
    imageAlt: "Teacher with students"
  },
  assessment: {
    title: "Assessment System",
    description: "Our comprehensive assessment system is designed to evaluate students' academic progress, identify areas for improvement, and provide constructive feedback.",
    types: [
      {
        title: "Formative Assessment",
        description: "Continuous evaluation throughout the academic year to monitor progress and provide timely feedback.",
        methods: [
          "Class participation and discussions",
          "Homework and assignments",
          "Quizzes and unit tests",
          "Projects and practical work",
          "Oral assessments"
        ]
      },
      {
        title: "Summative Assessment",
        description: "Comprehensive evaluation at the end of each term to assess overall understanding and achievement.",
        methods: [
          "Mid-term examinations",
          "Term-end examinations",
          "Annual examinations",
          "Pre-board examinations (for Classes 9-10)",
          "CBSE Board Examinations (Class 10)"
        ]
      }
    ],
    reportCards: {
      title: "Report Cards and Parent-Teacher Meetings",
      description: [
        "Report cards are issued at the end of each term, providing detailed feedback on academic performance and areas for improvement. Regular parent-teacher meetings are scheduled to discuss student progress and address any concerns.",
        "Our assessment system follows the guidelines set by CBSE, emphasizing a balance between scholastic and co-scholastic areas to ensure holistic evaluation of students."
      ]
    }
  },
  calendar: {
    title: "Academic Calendar",
    description: "Our academic year is divided into two terms, with a comprehensive schedule of academic and co-curricular activities.",
    months: [
      {
        month: "April",
        academic: "New academic session begins, Books distribution",
        events: "Orientation for new students, World Earth Day"
      },
      {
        month: "May",
        academic: "First unit test, Summer assignments",
        events: "Mother's Day celebration"
      },
      {
        month: "June",
        academic: "Summer vacation",
        events: "World Environment Day (online activities)"
      },
      {
        month: "July",
        academic: "School reopens, Submission of summer assignments",
        events: "Inter-house competitions"
      },
      {
        month: "August",
        academic: "Periodic Test-1, Parent-Teacher Meeting",
        events: "Independence Day celebration"
      },
      {
        month: "September",
        academic: "Half-yearly examinations",
        events: "Teacher's Day celebration"
      },
      {
        month: "October",
        academic: "Result declaration, Autumn break",
        events: "Gandhi Jayanti celebration"
      }
    ],
    calendarDownloadUrl: "/downloads/academic-calendar.pdf"
  },
  achievements: {
    title: "Academic Achievements",
    description: "We take pride in the outstanding academic accomplishments of our students, which reflect our commitment to excellence in education.",
    categories: [
      {
        title: "Board Examination Results",
        description: "Our students consistently achieve excellent results in CBSE Board Examinations, with many securing top ranks.",
        highlights: [
          { year: "2024", achievement: "98% students scored above 75%" },
          { year: "2023", achievement: "95% students scored above 75%" },
          { year: "2022", achievement: "94% students scored above 75%" }
        ]
      },
      {
        title: "Olympiads & Competitions",
        description: "Our students regularly participate and excel in various national and international academic competitions.",
        items: [
          "National Science Olympiad",
          "International Mathematics Olympiad",
          "English Language & Literature Competitions",
          "Spelling Bee Championships",
          "NTSE Scholars"
        ]
      },
      {
        title: "Special Recognitions",
        description: "Our school has received numerous accolades for academic excellence and innovative teaching practices.",
        items: [
          "Best CBSE School Award (Regional Level)",
          "Excellence in Science Education Award",
          "Innovation in Teaching Methodology Recognition",
          "Outstanding Academic Performance Award"
        ]
      }
    ]
  },
  faqs: {
    title: "Frequently Asked Questions",
    questions: [
      {
        question: "What is the student-teacher ratio in classrooms?",
        answer: "We maintain a student-teacher ratio of approximately 25:1 to ensure personalized attention and effective classroom management."
      },
      {
        question: "How does the school support students who need extra help?",
        answer: "We provide remedial classes, one-on-one tutoring sessions, and personalized learning plans for students who need additional academic support. Our teachers are available for consultations after school hours."
      },
      {
        question: "What languages are taught in the school?",
        answer: "English is our primary medium of instruction. Hindi is taught as a second language, and Sanskrit is offered as an optional third language from Class 6 onwards."
      },
      {
        question: "How does the school prepare students for competitive examinations?",
        answer: "We offer special coaching and preparation classes for various competitive examinations. Our curriculum is designed to build a strong foundation in core subjects, which helps students excel in competitive exams."
      },
      {
        question: "Does the school offer any scholarship programs?",
        answer: "Yes, we offer merit-based scholarships to academically outstanding students and need-based financial aid to deserving students from economically disadvantaged backgrounds."
      }
    ]
  },
  cta: {
    title: "Ready to Join Mansarovar Public School?",
    description: "Experience excellence in education with our comprehensive academic programs. Apply today and give your child the foundation for a successful future.",
    buttons: [
      {
        text: "Apply for Admission",
        link: "/admissions",
        primary: true
      },
      {
        text: "Contact Us",
        link: "/contact",
        primary: false
      }
    ]
  }
};

export default academicsData;