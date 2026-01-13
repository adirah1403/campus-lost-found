import React, { useEffect, useState } from "react";
import { getAllLostItems } from "../../Services/LostItemService";
import { getAllFoundItems } from "../../Services/FoundItemService";
import { getAllMatchItems } from "../../Services/MatchItemService";
import "./AnalysisDashboard.css";

const AnalysisDashboard = () => {
  const [lost, setLost] = useState(0);
  const [found, setFound] = useState(0);
  const [matched, setMatched] = useState(0);

  useEffect(() => {
    getAllLostItems().then(res => setLost(res.data.length));
    getAllFoundItems().then(res => setFound(res.data.length));
    getAllMatchItems().then(res => setMatched(res.data.length));
  }, []);

  return (
    <div className="analysis-container">
      <div className="analysis-card">
        <h2>Lost & Found System Analytics</h2>

        <div className="stats-grid">
          <div className="stat-box lost">
            <h3>{lost}</h3>
            <p>Lost Items</p>
          </div>

          <div className="stat-box found">
            <h3>{found}</h3>
            <p>Found Items</p>
          </div>

          <div className="stat-box matched">
            <h3>{matched}</h3>
            <p>Successfully Matched</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
