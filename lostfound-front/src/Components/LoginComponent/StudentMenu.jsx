import React, { useState } from "react";
import {
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaComments,
  FaSignOutAlt,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import styles from "./StudentMenu.module.css";

const StudentMenu = () => {
  const navigate = useNavigate();
  const [lostMenuOpen, setLostMenuOpen] = useState(false);
  const [foundMenuOpen, setFoundMenuOpen] = useState(false);

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

            {/* Personal */}
            <button
              className={styles.menuBtn}
              onClick={() => navigate("/profile")}
            >
              <div className={styles.leftSec}>
                <FaUser className={styles.icon} /> Personal
              </div>
            </button>

            {/* Lost Item */}
            <div className={styles.menuItem}>
              <button
                className={styles.menuBtn}
                onClick={() => setLostMenuOpen(!lostMenuOpen)}
              >
                <div className={styles.leftSec}>
                  <FaBoxOpen className={styles.icon} /> Lost Item
                </div>
                {lostMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
              </button>

              {lostMenuOpen && (
                <div className={styles.subMenu}>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/lost-entry")}
                  >
                    Lost Item Form Submission
                  </button>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/lost-report")}
                  >
                    Lost Item List
                  </button>
                  {/* <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/lost-search")}
                  >
                    Lost Item Search
                  </button> */}
                </div>
              )}
            </div>

            {/* Found Item */}
            <div className={styles.menuItem}>
              <button
                className={styles.menuBtn}
                onClick={() => setFoundMenuOpen(!foundMenuOpen)}
              >
                <div className={styles.leftSec}>
                  <FaClipboardList className={styles.icon} /> Found Item
                </div>
                {foundMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
              </button>

              {foundMenuOpen && (
                <div className={styles.subMenu}>
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/found-entry")}
                  >
                    Found Item Form Submission
                  </button>
                  
                  <button
                    className={styles.subMenuBtn}
                    onClick={() => navigate("/found-report")}
                  >
                    Found Item List
                  </button>
                </div>
              )}
            </div>

            {/* ✅ Chat (ONLY FIX HERE) */}
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

      {/* FULL BODY RESTORED */}
      <div className={styles.StudentMenubody}>
        <div className={styles.leftCard}>
          <h2 className={styles.title}>WELCOME, UNIVERSITY STUDENTS!</h2>
          <p className={styles.description}>
            Our mission is simple: to help you find your lost items quickly and
            report items easily.
          </p>
          <div className={styles.buttonRow}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/lost-entry")}
            >
              REPORT A LOST ITEM
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => navigate("/found-report")}
            >
              BROWSE FOUND ITEMS
            </button>
          </div>
        </div>

        <div className={styles.rightImageBox}>
          <img src="gyc.jpg" alt="Lost & Found" className={styles.rightImage} />
        </div>
      </div>
    </div>
  );
};

export default StudentMenu;
