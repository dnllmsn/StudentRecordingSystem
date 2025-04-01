import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import img1 from "./public/ganda.jpg";
const App = () => {
  const [students, setStudents] = useState([]);

  // Fetch students on page load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents(); // Call the function to fetch students

    // Add the CSS dynamically when the component mounts
    const styles = `
      .app-container {
        background-color: beige;
        color: black;
        text-align: center;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 20px;
      }

      h1 {
        margin-top: 20px;
      }

      /* Center the image and add spacing */
      .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;  /* Add spacing between text and image */
      }

      .center-image {
        width: 300px;  /* Adjust the image size */
        height: auto;
      }
    `;

    // Create a style element and append it to the head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    
    // Cleanup when component unmounts
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Add student and update the list immediately
  const addStudent = async (name, course) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/students", {
        name,
        course,
      });
      setStudents((prevStudents) => [...prevStudents, response.data]); // Update state directly
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Student Recording System</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} />
      {/* Add your image here */}
      <div className="image-container">
        <img src= {img1} alt="" className="center-image" />
      </div>
    </div>
  );
};

export default App;

