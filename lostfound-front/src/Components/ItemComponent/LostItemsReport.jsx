import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLostItems, getLostItemsByUsername } from "../../Services/LostItemService";
import "./LostItemsReport.css";
import { getRole } from "../../Services/LoginService";

const LostItemsReport = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const r = await getRole();
    setRole(r.data);

    if (r.data === "Admin") {
      const res = await getAllLostItems();
      setItems(res.data);
    } else {
      const res = await getLostItemsByUsername();
      setItems(res.data);
    }
  };

  const goBack = () => {
    navigate(role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  const openSmartMatch = (id) => {
    navigate(`/smart-search/${id}`);
  };

  const total = items.length;
  const found = items.filter(i => i.status).length;
  const notFound = total - found;

  return (
    <div className="report-container">
      <div className="report-card">

        <h2 className="report-title">Lost Items Report</h2>

        <div className="summary-bar">
          <span>Total: {total}</span>
          <span className="badge found">Found: {found}</span>
          <span className="badge not-found">Not Found: {notFound}</span>
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Date</th>
              <th>User</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr key={item.lostItemId}>
                <td>{item.lostItemId}</td>
                <td>{item.lostItemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.location}</td>
                <td>{item.lostDate}</td>
                <td>{item.username}</td>

                <td>
                  <span className={`badge ${item.status ? "found" : "not-found"}`}>
                    {item.status ? "Found" : "Not Found"}
                  </span>
                </td>

                <td>
                  {!item.status && (
                    <button className="smart-btn" onClick={() => openSmartMatch(item.lostItemId)}>
                      Smart Match
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="return-btn" onClick={goBack}>Return</button>

      </div>
    </div>
  );
};

export default LostItemsReport;
