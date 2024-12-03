import React, { useState } from 'react';

const PopupForm = ({ isOpen, handleClose, handleSave, budgetItems, setBudgetItems }) => {
 

  // Handle expense changes
  const handleExpenseChange = (index, field, value) => {
    const updatedBudgetItems = [...budgetItems];
    updatedBudgetItems[index][field] = value;
    setBudgetItems(updatedBudgetItems);
  };

  // Add a new budget item
  const handleAddItem = () => {
    setBudgetItems([...budgetItems, { expense: '', value: '' }]);
  };

  // Remove a budget item
  const handleRemoveItem = (index) => {
    const updatedBudgetItems = budgetItems.filter((_, i) => i !== index);
    setBudgetItems(updatedBudgetItems);
  };

  // Submit the data
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(budgetItems); // Pass the budgetItems to the parent save function
  };


  const totalValue = budgetItems.reduce((total, item) => total + (parseFloat(item.value) || 0), 0);

  if (!isOpen) return null;




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Accept Job</h2>
        <form onSubmit={handleSubmit}>
          {budgetItems.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Expense</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={item.expense}
                onChange={(e) => handleExpenseChange(index, 'expense', e.target.value)}
                placeholder="Expense name"
                required
              />
              <label className="block text-lg font-medium text-gray-700 mt-2">Value (LKR)</label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={item.value}
                onChange={(e) => handleExpenseChange(index, 'value', e.target.value)}
                placeholder="3000"
                required
              />
              {budgetItems.length > 1 && (
                <button
                  type="button"
                  className="text-red-600 text-sm mt-2"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleAddItem}
          >
            Add Expense
          </button>



       

          {/* Display the total value */}
          <div className="mt-4">
            <h3 className="text-xl font-bold">Total: LKR {totalValue.toFixed(2)}</h3>
          </div>

          
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
