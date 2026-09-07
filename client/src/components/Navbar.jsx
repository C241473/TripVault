import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Compass, LogOut, User as UserIcon, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Compass size={26} color="#38bdf8" />
        <span>TripVault</span>
      </Link>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <UserIcon size={18} />
              <span>{user?.name || 'Dashboard'}</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            <Link to="/register" className="nav-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <UserPlus size={18} />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
