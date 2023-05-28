import React, { useState } from 'react';
import './CGPACalculator.css';

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

const CGPACalc = () => {
  const [courses, setCourses] = useState([]);
  const [totalCreditPoints, setTotalCreditPoints] = useState(0);
  const [totalCreditHours, setTotalCreditHours] = useState(0);
  const [cgpa, setCGPA] = useState(0);

  const handleCourseChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCourses = [...courses];
    updatedCourses[index][name] = value;
    setCourses(updatedCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { courseName: '', creditPoints: '', creditHours: 0 }]);
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < courses.length; i++) {
      const { creditPoints, creditHours } = courses[i];
    //   const coursePoints = creditPoints * parseFloat(creditHours);
      totalPoints += parseFloat(creditPoints);
      totalCredits += parseFloat(creditHours);
    }

    const calculatedCGPA = totalPoints / totalCredits;
    setTotalCreditPoints(totalPoints);
    setTotalCreditHours(totalCredits);
    setCGPA(calculatedCGPA);
  };

  return (
    <div className="cgpa-container">
      <h2 className="cgpa-title">CGPA Calculator</h2>
      <button className="add-course-button" onClick={handleAddCourse}>
        Add Course
      </button>
      <div className="course-list">
        {courses.map((course, index) => (
          <div key={index} className="course-item">
            <select
              name="courseName"
              value={course.courseName}
              onChange={(e) => handleCourseChange(index, e)}
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
              onChange={(e) => handleCourseChange(index, e)}
              className="course-input"
            />
            <input
              type="number"
              name="creditHours"
              placeholder="Credit Hours"
              value={course.creditHours}
              onChange={(e) => handleCourseChange(index, e)}
              className="course-input"
            />
            <button
              className="remove-course-button"
              onClick={() => handleRemoveCourse(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button className="calculate-button" onClick={calculateCGPA}>
        Calculate CGPA
      </button>
      <div className="result-container">
        <h3>Total Credit Points: {totalCreditPoints}</h3>
        <h3>Total Credit Hours: {totalCreditHours}</h3>
        <h3>CGPA: {cgpa.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CGPACalc;