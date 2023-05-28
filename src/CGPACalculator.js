import React, { useState } from 'react';
import './CGPACalculator.css';

const GradingSystem = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  F: 0,
};

const CGPACalculator = () => {
  const [courses, setCourses] = useState([]);
  const [totalGradePoints, setTotalGradePoints] = useState(0);
  const [totalCreditHours, setTotalCreditHours] = useState(0);
  const [cgpa, setCGPA] = useState(0);

  const handleCourseChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCourses = [...courses];
    updatedCourses[index][name] = value;
    setCourses(updatedCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { courseName: '', grade: '', creditHours: 0 }]);
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
      const { grade, creditHours } = courses[i];
      const gradePoint = GradingSystem[grade];
      const coursePoints = gradePoint * creditHours;
      totalPoints += coursePoints;
      totalCredits += creditHours;
    }

    const calculatedCGPA = totalPoints / totalCredits;
    setTotalGradePoints(totalPoints);
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
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={course.courseName}
              onChange={(e) => handleCourseChange(index, e)}
              className="course-input"
            />
            <input
              type="text"
              name="grade"
              placeholder="Grade (A, B, C, D, F)"
              value={course.grade}
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
        <h3>Total Grade Points: {totalGradePoints}</h3>
        <h3>Total Credit Hours: {totalCreditHours}</h3>
        <h3>CGPA: {cgpa.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CGPACalculator;