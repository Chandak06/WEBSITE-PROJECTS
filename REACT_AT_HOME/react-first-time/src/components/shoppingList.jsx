import React, { useState } from 'react';

export const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(''); // ✅ fixed spelling

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantity) return;

    const newItem = { name, quantity: parseInt(quantity) }; // ✅ spelling fixed
    setItems((prevItems) => [...prevItems, newItem]);
    setName('');
    setQuantity('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Item"
            value={name}
          />
        </label>

        <label>
          Quantity:
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            placeholder="Enter quantity"
            value={quantity} // ✅ spelling fixed
          />
        </label>

        <button>Add Item</button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} — Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
