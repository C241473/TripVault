import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Compass, LogOut, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link to="/" className="nav-brand">
        <div className="brand-icon-wrapper">
          <Compass size={24} color="#38bdf8" />
        </div>
        <span className="brand-gradient">TripVault</span>
      </Link>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/dashboard" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserIcon size={18} color="#818cf8" />
                <span>{user?.name || 'Dashboard'}</span>
              </Link>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout} 
              className="logout-btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </motion.button>
          </>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="nav-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
