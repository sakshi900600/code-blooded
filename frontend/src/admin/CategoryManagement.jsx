import React, { useState } from 'react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState(['Hardware', 'Software', 'Billing']);
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleDelete = (cat) => {
    setCategories(categories.filter(c => c !== cat));
  };

  return (
    <div>
      <h2>Category Management</h2>
      <input
        placeholder="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {categories.map((cat, idx) => (
          <li key={idx}>
            {cat} <button onClick={() => handleDelete(cat)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
