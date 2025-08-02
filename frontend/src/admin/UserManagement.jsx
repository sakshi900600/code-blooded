import React from 'react';

const dummyUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'user' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'agent' },
];

const UserManagement = () => {
  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {dummyUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
              <td>
                <button>Edit Role</button>
                <button style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
