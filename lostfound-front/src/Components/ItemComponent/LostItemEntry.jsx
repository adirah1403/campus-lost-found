import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../Services/LoginService';
import { generateId, saveLostItem } from '../../Services/LostItemService';
import './LostItemEntry.css';

const LostItemEntry = () => {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false,
  });

  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState(new Date());
  const [userId, setUserId] = useState("");

  // 🔥 FIXED — Load both ID & user BEFORE allowing submit
  useEffect(() => {
    const init = async () => {
      try {
        const idRes = await generateId();
        const userRes = await getUserId();

        setNewId(idRes.data);
        setUserId(userRes.data);
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFlag(false);
    setLostItem(values => ({ ...values, [name]: value }));
  };

  const lostItemSubmit = () => {
    if (!userId) {
      alert("User session not loaded yet. Please wait a moment and try again.");
      return;
    }

    const submitData = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: ldate,
    };

    saveLostItem(submitData).then(() => {
      setFlag(true);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) { tempErrors.lostItemName = "Item Name is required"; isValid = false; }
    if (!lostItem.category.trim()) { tempErrors.category = "Item category is required"; isValid = false; }
    if (!lostItem.color.trim()) { tempErrors.color = "Item color is required"; isValid = false; }
    if (!lostItem.brand.trim()) { tempErrors.brand = "Item brand is required"; isValid = false; }
    if (!lostItem.location.trim()) { tempErrors.location = "Lost Location is required"; isValid = false; }

    setErrors(tempErrors);

    if (isValid) lostItemSubmit();
  };

  const returnBack = () => navigate('/StudentMenu');
  const nextItem = () => navigate('/dummy/1');

  if (loading) {
    return <h3 style={{ color: "black", textAlign: "center" }}>Loading session...</h3>;
  }

  return (
    <div className="page-background">
      <div className="form-card">
        <h2><u>Lost Item Form Submission</u></h2>

        <form>
          <label className="input-label">Generated Item ID:</label>
          <input className="form-control" value={newId} readOnly />

          <label className="input-label">Name of Lost Item:</label>
          <input name="lostItemName" className="form-control" value={lostItem.lostItemName} onChange={onChangeHandler} />
          {errors.lostItemName && <p className="error-text">{errors.lostItemName}</p>}

          <label className="input-label">Category:</label>
          <input name="category" className="form-control" value={lostItem.category} onChange={onChangeHandler} />
          {errors.category && <p className="error-text">{errors.category}</p>}

          <label className="input-label">Color:</label>
          <input name="color" className="form-control" value={lostItem.color} onChange={onChangeHandler} />
          {errors.color && <p className="error-text">{errors.color}</p>}

          <label className="input-label">Brand:</label>
          <input name="brand" className="form-control" value={lostItem.brand} onChange={onChangeHandler} />
          {errors.brand && <p className="error-text">{errors.brand}</p>}

          <label className="input-label">Location:</label>
          <input name="location" className="form-control" value={lostItem.location} onChange={onChangeHandler} />
          {errors.location && <p className="error-text">{errors.location}</p>}

          <label className="input-label">Date:</label>
          <input type="date" className="form-control" value={ldate} onChange={(e) => setLdate(e.target.value)} />

          <div style={{ marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={handleValidation}>Submit</button>
            &nbsp;&nbsp;
            <button className="btn btn-success" type="button" onClick={returnBack}>Return</button>
          </div>
        </form>

        {flag && (
          <p style={{ color: "blue", marginTop: "15px" }}>
            Lost Item Form Submitted ✔
            <button className="btn btn-warning" onClick={nextItem}>New Entry</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LostItemEntry;
