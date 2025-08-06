export const studentFields = {
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
  
  // Student specific fields
  admissionNumber: '',
  class: '',
  section: '',
  rollNumber: '',
  dateOfBirth: '',
  gender: '',
  bloodGroup: '',
  fatherName: '',
  motherName: '',
  parentContactNumber: '',
  parentEmail: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  emergencyContactRelation: '',
  admissionDate: new Date().toISOString().split('T')[0], // Today's date as default
  previousSchool: '',
  academicYear: '2024-2025', // Current academic year as default
  medicalConditions: ''
};

export const studentFieldValidations = {
  required: [
    'name', 'email', 'password', 'admissionNumber', 'class', 
    'section', 'rollNumber', 'dateOfBirth', 'gender', 
    'fatherName', 'motherName', 'parentContactNumber', 'academicYear'
  ],
  
  options: {
    class: ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    section: ['A', 'B', 'C', 'D'],
    gender: ['Male', 'Female', 'Other'],
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    emergencyContactRelation: ['Father', 'Mother', 'Guardian', 'Uncle', 'Aunt', 'Grandparent', 'Other']
  }
};

export const studentFormSections = [
  {
    title: 'Basic Information',
    fields: ['name', 'email', 'password', 'contactNumber']
  },
  {
    title: 'Address',
    fields: ['address.street', 'address.city', 'address.state', 'address.zipCode']
  },
  {
    title: 'Academic Information',
    fields: ['admissionNumber', 'class', 'section', 'rollNumber', 'academicYear', 'admissionDate', 'previousSchool']
  },
  {
    title: 'Personal Information',
    fields: ['dateOfBirth', 'gender', 'bloodGroup', 'medicalConditions']
  },
  {
    title: 'Parent/Guardian Information',
    fields: ['fatherName', 'motherName', 'parentContactNumber', 'parentEmail']
  },
  {
    title: 'Emergency Contact',
    fields: ['emergencyContactName', 'emergencyContactNumber', 'emergencyContactRelation']
  }
];
