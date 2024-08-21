import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "./services/api";
const TransactionForm = () => {
  const [formData, setFormData] = useState({
    customer: "",
    age: "",
    gender: "",
    zipcodeOri: "",
    merchant: "",
    zipMerchant: "",
    category: "",
    amount: "",
    fraud: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/addData/transactions`,
        formData
      );
      if (response.status === 201) {
        alert("Transaction added successfully!");
        setFormData({
          customer: "",
          age: "",
          gender: "",
          zipcodeOri: "",
          merchant: "",
          zipMerchant: "",
          category: "",
          amount: "",
          fraud: false,
        });
      }
    } catch (error) {
      console.error("There was an error adding the transaction!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer</label>
        <input
          type="text"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Zipcode (Origin)</label>
        <input
          type="text"
          name="zipcodeOri"
          value={formData.zipcodeOri}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Merchant</label>
        <input
          type="text"
          name="merchant"
          value={formData.merchant}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Zipcode (Merchant)</label>
        <input
          type="text"
          name="zipMerchant"
          value={formData.zipMerchant}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fraud</label>
        <input
          type="checkbox"
          name="fraud"
          checked={formData.fraud}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionForm;
