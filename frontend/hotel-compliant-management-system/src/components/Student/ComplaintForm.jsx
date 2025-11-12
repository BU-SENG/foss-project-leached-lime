import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    block: '',
    type: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/complaints', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setSuccess('✅ Complaint submitted successfully!');
      setFormData({ name: '', roomNumber: '', block: '', type: '', description: '' });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error(err);
      setError('❌ Error submitting complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Submit a Complaint</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Full Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          style={styles.input}
        />

        <label style={styles.label}>Room Number</label>
        <input
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="E.g., 202"
          required
          style={styles.input}
        />

        <label style={styles.label}>Block</label>
        <input
          name="block"
          value={formData.block}
          onChange={handleChange}
          placeholder="E.g., A, B, or C"
          required
          style={styles.input}
        />

        <label style={styles.label}>Complaint Type</label>
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="E.g., Plumbing, Electrical..."
          required
          style={styles.input}
        />

        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue in detail"
          required
          rows="4"
          style={styles.textarea}
        />

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
};

// ✅ Updated styles with visible black text
const styles = {
  container: {
    maxWidth: '450px',
    margin: '1rem auto',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#1f2937',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  label: {
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#f9fafb', // light gray input background
    color: '#111827', // black text
    outline: 'none',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#f9fafb',
    color: '#111827',
    resize: 'none',
    outline: 'none',
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#0d9488',
    color: '#fff',
    fontWeight: '600',
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
  },
  success: {
    color: '#16a34a',
    fontSize: '14px',
  },
};

// Optional hover/focus styling using CSS-in-JS
styles.input[':focus'] = styles.textarea[':focus'] = {
  borderColor: '#0d9488',
  backgroundColor: '#ffffff',
};

export default ComplaintForm;
