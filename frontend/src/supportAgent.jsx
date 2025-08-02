import React, { useState, useEffect } from 'react';
import './supportAgent.css'; // optional for styling

const dummyTickets = [
  {
    id: 1,
    title: 'Login not working',
    description: 'User unable to login to portal',
    status: 'Open',
    createdAt: '2025-08-01',
  },
  {
    id: 2,
    title: 'Page not loading',
    description: 'Dashboard page stuck on loading',
    status: 'In Progress',
    createdAt: '2025-08-01',
  },
];

function SupportAgent() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    setTickets(dummyTickets);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = tickets.map(ticket =>
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updated);
    setSelectedTicket({ ...selectedTicket, status: newStatus });
  };

  return (
    <div className="support-agent">
      <h2>Support Agent Dashboard</h2>
      <div className="ticket-list">
        <h3>All Tickets</h3>
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id} onClick={() => setSelectedTicket(ticket)}>
              <strong>{ticket.title}</strong> – {ticket.status}
            </li>
          ))}
        </ul>
      </div>

      {selectedTicket && (
        <div className="ticket-details">
          <h3>Ticket #{selectedTicket.id}</h3>
          <p><strong>Title:</strong> {selectedTicket.title}</p>
          <p><strong>Description:</strong> {selectedTicket.description}</p>
          <p><strong>Status:</strong> {selectedTicket.status}</p>

          <div className="status-update">
            <label htmlFor="status">Update Status:</label>
            <select
              value={selectedTicket.status}
              onChange={(e) => updateStatus(selectedTicket.id, e.target.value)}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default supportAgent;
