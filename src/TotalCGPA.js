import React, { useState } from 'react';
import './TotalCGPA.css';

const courseOptions = [
  { value: 'BIO 1101', label: 'BIO 1101' },
  { value: 'CHM 1101', label: 'CHM 1101' },
  { value: 'CSC 1101', label: 'CSC 1101' },
  { value: 'GSS 1101', label: 'GSS 1101' },
  { value: 'GSS 1102', label: 'GSS 1102' },
  { value: 'GSS 1103', label: 'GSS 1103' },
  { value: 'MTH 1101', label: 'MTH 1101' },
  { value: 'PHY 1101', label: 'PHY 1101' },
  { value: 'PHY 1104', label: 'PHY 1104' },
  // Add more course options as needed
];

const TotalCGPA = () => {
  const [years, setYears] = useState([
    { semesters: [{ courses: [] }, { courses: [] }] },
    { semesters: [{ courses: [] }, { courses: [] }] },
    { semesters: [{ courses: [] }, { courses: [] }] },
    { semesters: [{ courses: [] }, { courses: [] }] },
  ]);
  const [cgpa, setCGPA] = useState(0);
  const handleCourseChange = (yearIndex, semesterIndex, courseIndex, event) => {
    const { name, value } = event.target;
    const updatedYears = [...years];
    updatedYears[yearIndex].semesters[semesterIndex].courses[courseIndex][name] = value;
    setYears(updatedYears);
  };

  const handleAddCourse = (yearIndex, semesterIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].semesters[semesterIndex].courses.push({
      courseName: '',
      creditPoints: '',
      creditHours: 0,
    });
    setYears(updatedYears);
  };

  const handleRemoveCourse = (yearIndex, semesterIndex, courseIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].semesters[semesterIndex].courses.splice(courseIndex, 1);
    setYears(updatedYears);
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < years.length; i++) {
      const year = years[i];

      for (let j = 0; j < year.semesters.length; j++) {
        const semester = year.semesters[j];

        for (let k = 0; k < semester.courses.length; k++) {
          const { creditPoints, creditHours } = semester.courses[k];
          const coursePoints = creditPoints * parseFloat(creditHours);
          totalPoints += coursePoints;
          totalCredits += parseFloat(creditHours);
        }
      }
    }

    const calculatedCGPA = totalPoints / totalCredits;
    // Perform further calculations or display the calculated CGPA as needed
    setCGPA(calculatedCGPA);
  };


  return (
    <div className="cgpa-container">
      <div className="her">
        <h2 className="cgpa-title">CGPA Calculator</h2>
      </div>
      <div className="all">
        {years.map((year, yearIndex) => (
          <div key={yearIndex} className="year-container">
            <h3>Year {yearIndex + 1}</h3>

            {year.semesters.map((semester, semesterIndex) => (
              <div key={semesterIndex} className="semester-container">
                <h4>Semester {semesterIndex + 1}</h4>

                {semester.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="course-item">
                    <select
                      name="courseName"
                      value={course.courseName}
                      onChange={(e) => handleCourseChange(yearIndex, semesterIndex, courseIndex, e)}
                      className="course-select"
                    >
                      <option value="">Select Course</option>
                      {courseOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="creditPoints"
                      placeholder="Credit Points"
                      value={course.creditPoints}
                      onChange={(e) => handleCourseChange(yearIndex, semesterIndex, courseIndex, e)}
                      className="course-input"
                    />
                    <input
                      type="number"
                      name="creditHours"
                      placeholder="Credit Hours"
                      value={course.creditHours}
                      onChange={(e) => handleCourseChange(yearIndex, semesterIndex, courseIndex, e)}
                      className="course-input"
                    />
                    <button
                      className="remove-course-button"
                      onClick={() => handleRemoveCourse(yearIndex, semesterIndex, courseIndex)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  className="add-course-button"
                  onClick={() => handleAddCourse(yearIndex, semesterIndex)}
                >
                  Add Course
                </button>
              </div>
            ))}

          </div>
        ))}
      </div>
      <div className="calc">
        <button className="calculate-button" onClick={calculateCGPA}>
          Calculate CGPA
        </button>
        <div className="calculated">
          <h3>CGPA: {cgpa}</h3>
        </div>
      </div>
    </div>
  );
};

export default TotalCGPA;