import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLostItemById } from "../../Services/LostItemService";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";
import "../../DisplayView.css";

const MatchItemSearch = () => {

  const { lostItemId } = useParams();

  const [lostItem, setLostItem] = useState({});
  const [foundItems, setFoundItems] = useState([]);
  const [selectedFoundItem, setSelectedFoundItem] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const lostRes = await getLostItemById(lostItemId);
        setLostItem(lostRes.data);

        const foundRes = await getFoundItemsByLostItem(lostItemId);
        console.log("FOUND ITEMS:", foundRes.data);   // Debug log
        setFoundItems(foundRes.data);
      } catch (error) {
        console.error("Error loading data", error);
      }
    }

    loadData();
  }, [lostItemId]);

  const confirmMatch = () => {
    const match = {
      lostItemId: lostItem.lostItemId,
      foundItemId: selectedFoundItem.foundItemId,
      itemName: lostItem.lostItemName,
      category: lostItem.category,
      lostUsername: lostItem.username,
      foundUsername: selectedFoundItem.username
    };

    saveMatchItem(match)
      .then(() => {
        alert("Match saved successfully");
        setSelectedFoundItem(null);
      })
      .catch(() => alert("Failed to save match"));
  };

  return (
    <div className="display-container">

      <h2>Smart Lost & Found Search</h2>

      <h4>Lost Item</h4>
      <p>{lostItem.lostItemName} | {lostItem.category}</p>

      <h4>Matching Found Items</h4>

      {foundItems.length === 0 && <p>No matching found items</p>}

      {foundItems.map((item) => (
        <div key={item.foundItemId} className="card">
          <p><b>Name:</b> {item.foundItemName}</p>
          <p><b>Category:</b> {item.category}</p>
          <p><b>Color:</b> {item.color}</p>
          <p><b>Found By:</b> {item.username}</p>

          <button onClick={() => setSelectedFoundItem(item)}>
            Select Match
          </button>
        </div>
      ))}

      {selectedFoundItem && (
        <button className="confirm-btn" onClick={confirmMatch}>
          Confirm Match
        </button>
      )}

    </div>
  );
};

export default MatchItemSearch;
