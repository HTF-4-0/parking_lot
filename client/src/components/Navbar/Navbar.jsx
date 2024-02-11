import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assests/logo.jpg'

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [carNumber, setCarNumber] = useState('');
  const [hasCarNumber, setHasCarNumber] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCarNumberInput, setDeleteCarNumberInput] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCarNumberChange = (event) => {
    setCarNumber(event.target.value);
  };

  const saveCarNumber = () => {
    console.log('Car number saved:', carNumber);
    setHasCarNumber(true);
    setDropdownOpen(false);
    setAddModalOpen(false);
  };

  const deleteCarNumber = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log('Car number deleted');
    setHasCarNumber(false);
    setDropdownOpen(false);
    setDeleteModalOpen(false);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setDeleteModalOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="Number Plates">Car Number Plates</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
      <div className="account" onClick={toggleDropdown}>
        Account
        {isDropdownOpen && (
          <div className="dropdown">
            <div onClick={() => setAddModalOpen(true)}>Add Car Number</div>
            <div onClick={deleteCarNumber}>Delete Car Number</div>
          </div>
        )}
      </div>
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Car Number</h2>
            <input
              type="text"
              placeholder="Car Number"
              value={carNumber}
              onChange={handleCarNumberChange}
            />
            <button onClick={saveCarNumber}>Save</button>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Delete Car Number</h2>
            <input
              type="text"
              placeholder="Enter Car Number"
              value={deleteCarNumberInput}
              onChange={(e) => setDeleteCarNumberInput(e.target.value)}
            />
            <button onClick={confirmDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
