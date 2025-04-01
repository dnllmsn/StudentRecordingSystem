import React from "react";

const StudentList = ({ students }) => {
  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.course}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudentList;
