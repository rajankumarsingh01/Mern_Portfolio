



import React from "react";

const PurchaseButton = ({ onClick, loading, project }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-yellow-500 px-6 py-3 rounded-xl text-white"
    >
      {loading ? "Processing..." : `Buy Source Code ₹${project.price}`}
    </button>
  );
};

export default PurchaseButton;