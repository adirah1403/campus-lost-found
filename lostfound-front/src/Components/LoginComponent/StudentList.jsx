import React, { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "../../Services/LoginService";
import "./StudentList.css";

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setLoading(true);
    getAllStudents()
      .then((res) => {
        setStudentList(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load students");
        setLoading(false);
      });
  };

  const handleDelete = (username) => {
    if (!window.confirm(`Delete student ${username}?`)) return;

    console.log("Deleting username:", username);

    deleteStudent(username)
      .then(() => {
        alert("Student deleted successfully ✅");
        setStudentList((prev) =>
          prev.filter((student) => student.username !== username)
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Delete failed ❌");
      });
  };

  return (
    <div className="student-list-container">
      <div className="student-card">
        <h3 className="student-title">Student List</h3>

        {loading && <p className="loading">Loading students...</p>}
        {!loading && error && <p className="no-data">{error}</p>}

        {!loading && !error && (
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {studentList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">
                    No students found
                  </td>
                </tr>
              ) : (
                studentList.map((student) => (
                  <tr key={student.username}>
                    <td>{student.id}</td>
                    <td>{student.username}</td>
                    <td>{student.email}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(student.username)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentList;