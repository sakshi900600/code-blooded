

// import React, { useState } from 'react';
// import './Register.css';

// export default function Register() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     reEnterPassword: '',
//     role: 'User',
//     language: 'English',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);

//     // Here, you would:
//     // - send data to backend (Express, Firebase, etc.)
//     // - backend sends confirmation email (using nodemailer or similar)
//   };

//   return (
//     <div className="register-page">
//       <div className="register-card">
//         <h2 className="register-heading">Create Your QuickDesk Account</h2>
//         <form onSubmit={handleSubmit} className="register-form">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="reEnterPassword"
//             placeholder="Re-enter Password"
//             value={formData.reEnterPassword}
//             onChange={handleChange}
//             required
//           />

//           <select name="role" value={formData.role} onChange={handleChange}>
//             <option value="User">User</option>
//             <option value="Agent">Agent</option>
//             <option value="Admin">Admin</option>
//           </select>

//           <select name="language" value={formData.language} onChange={handleChange}>
//             <option value="English">English</option>
//             <option value="Hindi">Hindi</option>
//             <option value="Other">Other</option>
//           </select>

//           <button type="submit">Register</button>
//         </form>

//         <p className="register-description">
//           By creating an account, you agree to QuickDesk's Conditions of Use and Privacy Notice.
//         </p>
//         <p className="register-footer">
//           Already have an account? <a href="#" className="register-link">Sign in</a>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import './Register.css';

/**
 * Register component handles user registration inputs and submission.
 * @returns JSX.Element
 */
export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    reEnterPassword: '',
    role: 'User',
    language: 'English',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Add backend integration (Firebase, Express, etc.)
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-heading">Create Your QuickDesk Account</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="reEnterPassword"
            placeholder="Re-enter Password"
            value={formData.reEnterPassword}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="User">User</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>

          <select name="language" value={formData.language} onChange={handleChange} required>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">Register</button>
        </form>

        <p className="register-description">
          By creating an account, you agree to QuickDesk's Conditions of Use and Privacy Notice.
        </p>

        <p className="register-footer">
          Already have an account? <a href="#" className="register-link">Sign in</a>
        </p>
      </div>
    </div>
  );
}
