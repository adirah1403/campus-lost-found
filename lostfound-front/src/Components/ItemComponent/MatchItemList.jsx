import React, { useEffect, useState } from "react";
import { getAllMatchItems } from "../../Services/MatchItemService";
import "./MatchItemList.css";

const MatchItemList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getAllMatchItems().then(res => setMatches(res.data));
  }, []);

  return (
    <div className="match-container">
      <div className="match-card">
        <h2>Matched Items</h2>

        <table>
          <thead>
            <tr>
              <th>Lost Item ID</th>
              <th>Found Item ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Lost User</th>
              <th>Found User</th>
            </tr>
          </thead>

          <tbody>
            {matches.map((m, i) => (
              <tr key={i}>
                <td>{m.matchItemId.lostItemId}</td>
                <td>{m.matchItemId.foundItemId}</td>
                <td>{m.itemName}</td>
                <td>{m.category}</td>
                <td>{m.lostUsername}</td>
                <td>{m.foundUsername}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchItemList;
