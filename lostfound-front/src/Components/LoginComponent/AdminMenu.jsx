import React, { useState } from "react";
import {
  FaUserShield,
  FaBoxOpen,
  FaChartBar,
  FaComments,
  FaSignOutAlt,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import styles from "./AdminMenu.module.css";

const AdminMenu = () => {
  const navigate = useNavigate();

  const [studentMenuOpen, setStudentMenuOpen] = useState(false);
  const [lostMenuOpen, setLostMenuOpen] = useState(false);
  const [reportMenuOpen, setReportMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className={styles.pagebody}>
      <div className={styles.page}>
        <div className={styles.menuContainer}>

          <div className={styles.menuRow}>

            <div className={styles.logoBox}>
              <img src="/img.jpg" alt="App Logo" className={styles.logo} />
            </div>

            {/* Students */}
            <div className={styles.menuItem}>
              <button
                className={styles.menuBtn}
                onClick={() => setStudentMenuOpen(!studentMenuOpen)}
              >
                <div className={styles.leftSec}>
                  <FaUserShield className={styles.icon} /> Students
                </div>
                {studentMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
              </button>

              {studentMenuOpen && (
                <div className={styles.subMenu}>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/student-list")}
                  >
                    Student List
                  </button>
                </div>
              )}
            </div>

            {/* Lost & Found */}
            <div className={styles.menuItem}>
              <button
                className={styles.menuBtn}
                onClick={() => setLostMenuOpen(!lostMenuOpen)}
              >
                <div className={styles.leftSec}>
                  <FaBoxOpen className={styles.icon} /> Lost - Found
                </div>
                {lostMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
              </button>

              {lostMenuOpen && (
                <div className={styles.subMenu}>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/found-report")}
                  >
                    Found Item List
                  </button>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/lost-report")}
                  >
                    Lost Item List
                  </button>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/match-list")}
                  >
                    Match Item List
                  </button>
                </div>
              )}
            </div>

            {/* Reports */}
            <div className={styles.menuItem}>
              <button
                className={styles.menuBtn}
                onClick={() => setReportMenuOpen(!reportMenuOpen)}
              >
                <div className={styles.leftSec}>
                  <FaChartBar className={styles.icon} /> Reports
                </div>
                {reportMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
              </button>

              {reportMenuOpen && (
                <div className={styles.subMenu}>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/found-report")}
                  >
                    Found Item Report
                  </button>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/lost-report")}
                  >
                    Lost Item Report
                  </button>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/analysis-dashboard")}
                  >
                    Lost + Found Analysis
                  </button>
                </div>
              )}
            </div>

            {/* Chat */}
            <button
              className={styles.menuBtn}
              onClick={() => navigate("/chat-msg")}
            >
              <div className={styles.leftSec}>
                <FaComments className={styles.icon} /> Chat
              </div>
            </button>

            {/* Logout */}
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>

          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className={styles.AdminMenubody}>
        <div className={styles.leftCard}>
          <h2 className={styles.title}>ADMIN DASHBOARD</h2>
          <p className={styles.description}>
            Manage students, lost & found items, verify reports, and monitor system analytics.
          </p>
          <div className={styles.buttonRow}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/lost-report")}
            >
              REVIEW LOST ITEMS
            </button>

            <button
              className={styles.secondaryBtn}
              onClick={() => navigate("/found-report")}
            >
              REVIEW FOUND ITEMS
            </button>
          </div>
        </div>

        <div className={styles.rightImageBox}>
          <img src="gyc.jpg" alt="Admin" className={styles.rightImage} />
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
