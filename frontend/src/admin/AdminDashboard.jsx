import React, { useState } from 'react';
import UserManagement from './UserManagement';
import CategoryManagement from './CategoryManagement';
import './admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>
      <div className="admin-tabs">
        <button onClick={() => setActiveTab('users')}>User Management</button>
        <button onClick={() => setActiveTab('categories')}>Category Management</button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'categories' && <CategoryManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
