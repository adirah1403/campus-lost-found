import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFoundItems, getFoundItemsByUsername } from "../../Services/FoundItemService";
import "./FoundItemsReport.css";
import { getRole } from "../../Services/LoginService";

const FoundItemsReport = () => {
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
      const res = await getAllFoundItems();
      setItems(res.data);
    } else {
      const res = await getFoundItemsByUsername();
      setItems(res.data);
    }
  };

  const goBack = () => {
    navigate(role === "Admin" ? "/AdminMenu" : "/StudentMenu");
  };

  const total = items.length;
  const returned = items.filter(i => i.status).length;
  const notReturned = total - returned;

  return (
    <div className="report-container">
      <div className="report-card">

        <h2 className="report-title">Found Items Report</h2>

        <div className="summary-bar">
          <span>Total: {total}</span>
          <span className="badge found">Returned: {returned}</span>
          <span className="badge not-found">Not Returned: {notReturned}</span>
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
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr key={item.foundItemId}>
                <td>{item.foundItemId}</td>
                <td>{item.foundItemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.location}</td>
                <td>{item.foundDate}</td>
                <td>{item.username}</td>

                <td>
                  <span className={`badge ${item.status ? "found" : "not-found"}`}>
                    {item.status ? "Returned" : "Not Returned"}
                  </span>
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

export default FoundItemsReport;
