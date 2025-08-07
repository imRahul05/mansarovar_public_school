export const teacherFields = {
  // Basic User fields (inherited)
  name: '',
  email: '',
  password: '',
  contactNumber: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: ''
  },
  
  // Teacher specific fields
  employeeId: '',
  designation: '',
  subjectsSpecialization: [],
  classTeacherOf: {
    class: '',
    section: ''
  },
  qualification: '',
  experience: [
    {
      position: '',
      organization: '',
      fromDate: '',
      toDate: '',
      isCurrent: false,
      description: ''
    }
  ],
  dateOfJoining: new Date().toISOString().split('T')[0], // Today's date as default
  dateOfBirth: '',
  gender: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  emergencyContactRelation: ''
};

export const teacherFieldValidations = {
  required: [
    'name', 'email', 'password', 'employeeId', 'designation', 
    'subjectsSpecialization', 'qualification', 'gender'
  ],
  
  options: {
    designation: [
      'Principal', 'Vice Principal', 'Head Teacher', 'Senior Teacher',
      'Teacher', 'Assistant Teacher', 'Subject Teacher', 'Trainee Teacher'
    ],
    subjectsSpecialization: [
      'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies',
      'Computer Science', 'Physics', 'Chemistry', 'Biology',
      'History', 'Geography', 'Economics', 'Political Science',
      'Physical Education', 'Art', 'Music', 'Dance'
    ],
    gender: ['Male', 'Female', 'Other'],
    emergencyContactRelation: ['Spouse', 'Parent', 'Sibling', 'Friend', 'Other'],
    classOptions: ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    sectionOptions: ['A', 'B', 'C', 'D']
  }
};

export const teacherFormSections = [
  {
    title: 'Basic Information',
    fields: ['name', 'email', 'password', 'contactNumber']
  },
  {
    title: 'Address',
    fields: ['address.street', 'address.city', 'address.state', 'address.zipCode']
  },
  {
    title: 'Professional Information',
    fields: ['employeeId', 'designation', 'subjectsSpecialization', 'qualification', 'dateOfJoining']
  },
  {
    title: 'Assign Teacher to Class (Optional)',
    fields: ['classTeacherOf.class', 'classTeacherOf.section']
  },
  {
    title: 'Work Experience',
    fields: ['experience'], // Special handling for experience array
    isExperience: true
  },
  {
    title: 'Personal Information',
    fields: ['dateOfBirth', 'gender']
  },
  {
    title: 'Emergency Contact',
    fields: ['emergencyContactName', 'emergencyContactNumber', 'emergencyContactRelation']
  }
];
