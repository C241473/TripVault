import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar, Compass, PlusCircle, Map, ShieldCheck, LogOut, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const Dashboard = () => {
  const { user, logoutUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently';

  return (
    <div className="main-content" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
      <motion.div 
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Welcome Banner Card */}
        <motion.div variants={itemVariants} className="welcome-card">
          <div className="welcome-text">
            <span className="badge" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} color="#a5b4fc" />
              <span>JWT Authentication Verified</span>
            </span>
            <h1>Welcome back, {user?.name || 'Traveler'}! 👋</h1>
            <p>Your TripVault profile is active and ready for travel memory logs.</p>
          </div>
          <div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout} 
              className="logout-btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* User Info & Security Grid */}
        <motion.div variants={itemVariants} className="grid-cards" style={{ marginBottom: '2.25rem' }}>
          {/* Profile Card */}
          <motion.div className="card" whileHover={{ y: -6 }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1rem' }}>
              <User color="#818cf8" size={24} />
            </div>
            <h3>User Profile</h3>
            <p style={{ marginTop: '0.4rem', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>
              {user?.name}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
              <Mail size={15} color="#94a3b8" />
              <span>{user?.email}</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
              <Calendar size={15} color="#94a3b8" />
              <span>Joined: {formattedDate}</span>
            </p>
          </motion.div>

          {/* Security Status Card */}
          <motion.div className="card" whileHover={{ y: -6 }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1rem' }}>
              <ShieldCheck color="#34d399" size={24} />
            </div>
            <h3>Session Status</h3>
            <p style={{ marginTop: '0.4rem', color: '#6ee7b7', fontWeight: 700, fontSize: '1.05rem' }}>
              JWT Bearer Token Active
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', wordBreak: 'break-all' }}>
              Token Preview: <code style={{ background: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.5rem', borderRadius: '6px', color: '#a5b4fc' }}>{token ? `${token.substring(0, 26)}...` : 'None'}</code>
            </p>
          </motion.div>

          {/* Travel Stats Teaser Card */}
          <motion.div className="card" whileHover={{ y: -6 }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1rem' }}>
              <Compass color="#38bdf8" size={24} />
            </div>
            <h3>Travel Memories</h3>
            <p style={{ marginTop: '0.4rem', fontWeight: 700, color: '#fff', fontSize: '1.2rem' }}>
              0 Trips Logged
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Week 1 Setup Complete! Prepared for Week 2 trip logs.
            </p>
          </motion.div>
        </motion.div>

        {/* Week 2 Teaser Feature Box */}
        <motion.div 
          variants={itemVariants}
          className="card" 
          style={{ background: 'rgba(15, 23, 42, 0.65)', borderStyle: 'dashed', textAlign: 'center', padding: '3.5rem 2rem' }}
        >
          <motion.div 
            animate={{ y: [0, -8, 0] }} 
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Map size={54} color="#818cf8" style={{ margin: '0 auto 1.25rem auto' }} />
          </motion.div>
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.6rem', fontWeight: 800 }}>Your Journal is Ready</h2>
          <p style={{ maxWidth: '540px', margin: '0 auto 1.75rem auto', color: 'var(--text-muted)', fontSize: '0.975rem' }}>
            Week 1 foundation setup is complete! In upcoming weeks, you will be able to add trip destinations, upload photo galleries, and organize your memory timeline here.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-submit" 
            style={{ width: 'auto', padding: '0.85rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }} 
            onClick={() => alert('✨ Week 1 Setup & Authentication Complete! Ready for Week 2 Trip Creation.')}
          >
            <PlusCircle size={20} />
            <span>Create New Trip (Coming Week 2)</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
