import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../Services/LoginService";
import styles from "./MyProfile.module.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetails().then((res) => {
      setUser(res.data);
    });
  }, []);

  if (!user) return <p style={{ color: "black" }}>Loading profile...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            {user.personalName?.charAt(0).toUpperCase()}
          </div>
          <div className={styles.title}>My Profile</div>
          <div className={styles.subTitle}>Student Account</div>
        </div>

        <ProfileRow label="Username / Student ID" value={user.username} />
        <ProfileRow label="Full Name" value={user.personalName} />
        <ProfileRow label="Email" value={user.email} />
        <ProfileRow label="Role" value={user.role} />

        <div className={styles.infoRow}>
          <div className={styles.label}>Account Status</div>
          <span className={styles.status}>Active</span>
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className={styles.infoRow}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value || "-"}</div>
  </div>
);

export default MyProfile;
