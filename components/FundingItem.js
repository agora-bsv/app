// components/FundingItem.js
import React, { useState } from 'react';

function FundingItem({ title, description, initialCollectedAmount = 30, targetAmount = 50 }) {
  // Initialize state for collectedAmount, starting with the initialCollectedAmount prop.
  const [collectedAmount, setCollectedAmount] = useState(initialCollectedAmount);

  // Calculate the progress percentage.
  const progressPercentage = Math.min((collectedAmount / targetAmount) * 100, 100);

  // Styles for the progress bar container.
  const progressBarStyle = {
    height: '20px',
    width: '100%',
    backgroundColor: '#ddd',
    marginBottom: '20px', // Spacing between the progress bar and the next element.
  };

  // Styles for the progress bar fill.
  const fillStyle = {
    height: '100%',
    width: `${progressPercentage}%`, // This width is a percentage of the total bar.
    backgroundColor: '#62ca8e',
    textAlign: 'right', // To align the text (if any) inside the progress bar to the right.
  };

  // Function to handle clicking on the "Donate" button.
  const handleDonateClick = () => {
    // Add 5 to the current collectedAmount.
    setCollectedAmount(prevAmount => prevAmount + 5);
  };

  // Style for the "Donate" button.
  const donateButtonStyle = {
    position: 'absolute', 
    top: '0px', 
    right: '0px', 
    backgroundColor: 'rgb(98, 202, 142)', 
    color: 'white', 
    border: 'none', 
    padding: '20px 5px', 
    borderRadius: '0 5px 0 0',
    cursor: 'pointer', 
  };

  // Style for the button 2 container, to help position it correctly
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative', 
    marginTop: '20px', 
  };

  // Style 2 for the "Donate" button.
  const donateButtonStyle2 = {
    padding: '10px 20px', 
    backgroundColor: 'rgb(98, 202, 142)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '0px', 
    cursor: 'pointer', 
    position: 'absolute', 
    bottom: '-20px', 
  };

  return (
    <div className="funding-item" style={{ position: 'relative' }}> {/* Relative positioning for the container. */}
      <div className="funding-feature-title">{title}</div>
      <div className="funding-feature-description">{description}</div>
      <div style={progressBarStyle}>
        <div style={fillStyle}></div> {/* This div represents the filled part of the progress bar. */}
      </div>
      <div className="funding-amount">
        <div className="collected-amount">{collectedAmount} BSV</div>
        <div>{targetAmount} BSV</div>
      </div>
      {/* <button style={donateButtonStyle} onClick={handleDonateClick}>Contribute</button> */}
      <div style={buttonContainerStyle}>
        <button style={donateButtonStyle2} onClick={handleDonateClick}>Contribute</button>
      </div>
    </div>
  );
}

export default FundingItem;
