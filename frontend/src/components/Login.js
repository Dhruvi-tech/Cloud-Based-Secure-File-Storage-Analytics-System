import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Login() {
  const [name, setName] = useState('');

  const login = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    localStorage.setItem('user', trimmed);
    window.location.reload();
  };

  return (
    <div className="login-shell">
      <motion.div
        className="card login-card"
        initial={{ scale: 0.88, opacity: 0, y: 22 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <h2>🔐 Login</h2>
        <p>Enter your name to start the cloud dashboard.</p>
        <div className="upload-row login-row">
          <input value={name} onChange={event => setName(event.target.value)} placeholder="Enter name" />
          <button onClick={login}>Enter Dashboard</button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
