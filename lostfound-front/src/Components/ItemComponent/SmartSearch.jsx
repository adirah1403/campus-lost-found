import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./SmartSearch.css";
import { getLostItemById } from "../../Services/LostItemService";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";

const SmartSearch = () => {

  const { lostItemId } = useParams();

  const [lostItem, setLostItem] = useState(null);
  const [foundItems, setFoundItems] = useState([]);
  const [noMatch, setNoMatch] = useState(false);

  const search = useCallback(async () => {
    try {
      setNoMatch(false);
      setLostItem(null);
      setFoundItems([]);

      const lostRes = await getLostItemById(lostItemId);
      setLostItem(lostRes.data);

      const foundRes = await getFoundItemsByLostItem(lostItemId);
      if (foundRes.data.length === 0) {
        setNoMatch(true);
      }
      setFoundItems(foundRes.data);

    } catch (error) {
      setNoMatch(true);
    }
  }, [lostItemId]);

  // 🚀 Auto-run when page loads
  useEffect(() => {
    if (lostItemId) search();
  }, [lostItemId, search]);

  const confirmMatch = async (found) => {
    const match = {
      lostItemId: lostItem.lostItemId,
      foundItemId: found.foundItemId,
      itemName: lostItem.lostItemName,
      category: lostItem.category,
      lostUsername: lostItem.username,
      foundUsername: found.username
    };

    await saveMatchItem(match);
    alert("Match saved successfully!");
    search();
  };

  return (
    <div className="smart-container">
      <div className="smart-card">

        <div className="smart-title">
          Smart Search — Lost & Found Items
        </div>

        {noMatch && (
          <h4 style={{ textAlign: "center", color: "red" }}>
            No matching found items available at the moment.
          </h4>
        )}

        {lostItem && (
          <>
            <h3 className="section-title">Lost Item</h3>
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Color</th>
                  <th>Brand</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{lostItem.lostItemId}</td>
                  <td>{lostItem.lostItemName}</td>
                  <td>{lostItem.category}</td>
                  <td>{lostItem.color}</td>
                  <td>{lostItem.brand}</td>
                  <td>{lostItem.location}</td>
                  <td>{lostItem.lostDate}</td>
                  <td>{lostItem.username}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {foundItems.length > 0 && (
          <>
            <h3 className="section-title">Matching Found Items</h3>
            <table className="table table-bordered">
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Color</th>
                  <th>Brand</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {foundItems.map((item) => (
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
                      <button
                        className="btn btn-success"
                        onClick={() => confirmMatch(item)}
                      >
                        Match
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      </div>
    </div>
  );
};

export default SmartSearch;
