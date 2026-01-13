import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../Services/LoginService';
import { generateId, saveFoundItem } from '../../Services/FoundItemService';
import './FoundItemEntry.css';

const FoundItemEntry = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: new Date(),
    status: false,
  });

  const [newId, setNewId] = useState("");
  const [fdate, setFdate] = useState(new Date().toISOString().split("T")[0]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    generateId().then(response => setNewId(response.data));
    getUserId().then(response => setUserId(response.data));
  }, []);

  const onChangeHandler = (event) => {
    setFlag(false);
    const { name, value } = event.target;
    setFoundItem(prev => ({ ...prev, [name]: value }));
  };

  const foundItemSubmit = () => {
    const updatedItem = {
      ...foundItem,
      foundItemId: newId,
      username: userId,
      foundDate: fdate
    };

    saveFoundItem(updatedItem).then(() => {
      setFlag(true);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }
    if (!foundItem.category.trim()) {
      tempErrors.category = "Item Category is required";
      isValid = false;
    }
    if (!foundItem.color.trim()) {
      tempErrors.color = "Item Color is required";
      isValid = false;
    }
    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Item Brand is required";
      isValid = false;
    }
    if (!foundItem.location.trim()) {
      tempErrors.location = "Found Location is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      foundItemSubmit();
    }
  };

  const returnBack = () => navigate('/StudentMenu');
  const nextItem = () => navigate('/dummy/2');

  return (
    <div className="page-background">
      <div className="form-card">
        <h2><u>Found Item Form Submission</u></h2>

        <form onSubmit={handleValidation}>

          {/* Generated Item ID */}
          <label className="input-label">Generated Item ID:</label>
          <input className="form-control" value={newId} readOnly />

          {/* Name */}
          <label className="input-label" style={{ color: '#ff3b3b' }}>Name of Found Item:</label>
          <input
            name="foundItemName"
            className="form-control"
            value={foundItem.foundItemName}
            onChange={onChangeHandler}
          />
          {errors.foundItemName && <p className="error-text">{errors.foundItemName}</p>}

          {/* Category */}
          <label className="input-label" style={{ color: '#1c7ed6' }}>Category of Item:</label>
          <input
            name="category"
            className="form-control"
            value={foundItem.category}
            onChange={onChangeHandler}
          />
          {errors.category && <p className="error-text">{errors.category}</p>}

          {/* Color */}
          <label className="input-label" style={{ color: '#2b8a3e' }}>Color of Item:</label>
          <input
            name="color"
            className="form-control"
            value={foundItem.color}
            onChange={onChangeHandler}
          />
          {errors.color && <p className="error-text">{errors.color}</p>}

          {/* Brand */}
          <label className="input-label" style={{ color: '#e67700' }}>Brand of Item:</label>
          <input
            name="brand"
            className="form-control"
            value={foundItem.brand}
            onChange={onChangeHandler}
          />
          {errors.brand && <p className="error-text">{errors.brand}</p>}

          {/* Location */}
          <label className="input-label" style={{ color: '#5f3dc4' }}>Location Where Item Was Found:</label>
          <input
            name="location"
            className="form-control"
            value={foundItem.location}
            onChange={onChangeHandler}
          />
          {errors.location && <p className="error-text">{errors.location}</p>}

          {/* Date */}
          <label className="input-label" style={{ color: '#d6336c' }}>Date When Item Was Found:</label>
          <input
            type="date"
            className="form-control"
            value={fdate}
            onChange={(e) => setFdate(e.target.value)}
          />

          {/* Buttons */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button className="btn btn-primary" type="submit">Submit</button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-success" type="button" onClick={returnBack}>Return</button>
          </div>
        </form>

        <br />
        {flag && (
          <p style={{ color: "blue" }}>
            Found Item Form Submitted.....
            <button className="btn btn-warning" onClick={nextItem}>
              New Form Submission
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default FoundItemEntry;
