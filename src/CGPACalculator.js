import React, { useState } from 'react';
import './CGPACalculator.css'; // Import the CSS file for styling

const CGPACalculator = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    grade: '',
    creditHours: '',
    creditPoints: '',
  });
  const [cgpa, setCGPA] = useState(null);

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const addCourse = () => {
    setCourses([...courses, newCourse]);
    setNewCourse({ title: '', grade: '', creditHours: '', creditPoints: '' });
  };

  const calculateCGPA = () => {
    let totalQualityPoints = 0;
    let totalCreditHours = 0;

    for (let i = 0; i < courses.length; i++) {
      const { grade, creditHours, creditPoints } = courses[i];
      const gradePoints = getGradePoints(grade);
      const qualityPoints = gradePoints * parseFloat(creditPoints);
      totalQualityPoints += qualityPoints;
      totalCreditHours += parseInt(creditHours);
    }

    const calculatedCGPA = totalQualityPoints / totalCreditHours;
    setCGPA(calculatedCGPA.toFixed(2));
  };

  const getGradePoints = (grade) => {
    // Define your grading scale and corresponding grade points here
    // Example: A = 70% to 100%, B = 60% to 69%, C = 50% to 59%, D = 45% to 49%, E = 40% to 44%, F = 0% to 39%
    switch (grade) {
      case 'A':
        return 4;
      case 'B':
        return 3;
      case 'C':
        return 2;
      case 'D':
        return 1;
      case 'F':
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="cgpa-calculator">
      <h2>CGPA Calculator</h2>
      <table className="course-table">
      <thead>
          <tr>
            <th>Course</th>
            <th>Grade</th>
            <th>Credit Hours</th>
            <th>Credit Points</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.title}</td>
              <td>{course.grade}</td>
              <td>{course.creditHours}</td>
              <td>{course.creditPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input-group">
        <label>Course Title:</label>
        <select
          name="title"
          value={newCourse.title}
          onChange={handleInputChange}
        >
          <option value="">Select a course</option>
          <option value="BIO 1101">BIO 1101</option>
          <option value="CHM 1101">CHM 1101</option>
          <option value="CSC 1101">CSC 1101</option>
          <option value="GSS 1101">GSS 1101</option>
          <option value="GSS 1102">GSS 1102</option>
          <option value="GSS 1103">GSS 1103</option>
          <option value="MTH 1101">MTH 1101</option>
          <option value="PHY 1101">PHY 1101</option>
          <option value="PHY 1104">PHY 1104</option>
          <option value="CSC 1201">CSC 1201</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="input-group">
        <label>Grade:</label>
        <select
          name="grade"
          value={newCourse.grade}
          onChange={handleInputChange}
        >
          <option value="">Select a grade</option>
          <option value="A">A (70% - 100%)</option>
          <option value="B">B (60% - 69%)</option>
          <option value="C">C (50% - 59%)</option>
          <option value="D">D (45% - 49%)</option>
          <option value="E">E (40% - 44%)</option>
          <option value="F">F (0% - 39%)</option>
        </select>
      </div>
      <div className="input-group">
        <label>Credit Hours:</label>
        <input
          type="text"
          name="creditHours"
          value={newCourse.creditHours}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label>Credit Points:</label>
        <input
          type="text"
          name="creditPoints"
          value={newCourse.creditPoints}
          onChange={handleInputChange}
        />
      </div>
      <div className="button-group">
        <button onClick={addCourse}>Add Course</button>
        <button onClick={calculateCGPA}>Calculate CGPA</button>
      </div>
      {cgpa && <p className="result">CGPA: {cgpa}</p>}
    </div>
  );
};

export default CGPACalculator;