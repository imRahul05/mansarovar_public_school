import React from 'react';

// Import components
import AcademicsHeader from '../components/academics/AcademicsHeader';
import CurriculumOverview from '../components/academics/CurriculumOverview';
import AcademicLevels from '../components/academics/AcademicLevels';
import SubjectsOffered from '../components/academics/SubjectsOffered';
import TeachingMethodology from '../components/academics/TeachingMethodology';
import AssessmentSystem from '../components/academics/AssessmentSystem';
import AcademicCalendar from '../components/academics/AcademicCalendar';
import AcademicAchievements from '../components/academics/AcademicAchievements';
import AcademicsFAQ from '../components/academics/AcademicsFAQ';
import AcademicsCallToAction from '../components/academics/AcademicsCallToAction';

// Import data
import academicsData from '../data/academicsData';

const Academics = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <AcademicsHeader 
        title={academicsData.header.title} 
        description={academicsData.header.description} 
      />

      {/* Curriculum Overview */}
      <CurriculumOverview 
        title={academicsData.curriculum.title} 
        description={academicsData.curriculum.description}
        image={academicsData.curriculum.image}
        imageAlt={academicsData.curriculum.imageAlt}
      />

      {/* Academic Levels */}
      <AcademicLevels 
        title={academicsData.academicLevels.title}
        description={academicsData.academicLevels.description}
        levels={academicsData.academicLevels.levels}
      />

      {/* Subjects Offered */}
      <SubjectsOffered 
        title={academicsData.subjects.title}
        description={academicsData.subjects.description}
        subjectCategories={academicsData.subjects.subjectCategories}
      />

      {/* Teaching Methodology */}
      <TeachingMethodology 
        title={academicsData.teachingMethodology.title}
        description={academicsData.teachingMethodology.description}
        methods={academicsData.teachingMethodology.methods}
        image={academicsData.teachingMethodology.image}
        imageAlt={academicsData.teachingMethodology.imageAlt}
      />

      {/* Assessment System */}
      <AssessmentSystem 
        title={academicsData.assessment.title}
        description={academicsData.assessment.description}
        types={academicsData.assessment.types}
        reportCards={academicsData.assessment.reportCards}
      />

      {/* Academic Calendar */}
      <AcademicCalendar 
        title={academicsData.calendar.title}
        description={academicsData.calendar.description}
        months={academicsData.calendar.months}
        calendarDownloadUrl={academicsData.calendar.calendarDownloadUrl}
      />

      {/* Academic Achievements */}
      <AcademicAchievements 
        title={academicsData.achievements.title}
        description={academicsData.achievements.description}
        categories={academicsData.achievements.categories}
      />

      {/* FAQ Section */}
      <AcademicsFAQ 
        title={academicsData.faqs.title}
        questions={academicsData.faqs.questions}
      />

      {/* Call to Action */}
      <AcademicsCallToAction 
        title={academicsData.cta.title}
        description={academicsData.cta.description}
        buttons={academicsData.cta.buttons}
      />
    </div>
  );
};

export default Academics;