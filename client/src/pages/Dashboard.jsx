import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar, Compass, PlusCircle, Map, ShieldCheck, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TripCard from '../components/TripCard';
import TripModal from '../components/TripModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

const Dashboard = () => {
  const { user, logoutUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch user trips on load
  const fetchTrips = async () => {
    try {
      setLoadingTrips(true);
      const res = await axios.get('/api/trips');
      setTrips(res.data.trips || []);
    } catch (err) {
      console.error('Error fetching trips:', err);
      setErrorMsg('Failed to load trips from server.');
    } finally {
      setLoadingTrips(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  // Modal Handlers
  const handleOpenCreateModal = () => {
    setEditingTrip(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (trip) => {
    setEditingTrip(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTrip(null);
  };

  // Submit Handler for Create & Edit
  const handleSaveTrip = async (formData) => {
    if (editingTrip) {
      // Edit mode
      await axios.put(`/api/trips/${editingTrip._id}`, formData);
    } else {
      // Create mode
      await axios.post('/api/trips', formData);
    }
    // Refresh list
    await fetchTrips();
  };

  // Delete Handler with Confirmation Prompt
  const handleDeleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this travel memory?')) {
      try {
        await axios.delete(`/api/trips/${tripId}`);
        await fetchTrips();
      } catch (err) {
        console.error('Error deleting trip:', err);
        alert(err.response?.data?.message || 'Failed to delete trip.');
      }
    }
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
        {/* Welcome Banner Card */}
        <motion.div variants={itemVariants} className="welcome-card">
          <div className="welcome-text">
            <span className="badge" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} color="#a5b4fc" />
              <span>JWT Authentication Verified</span>
            </span>
            <h1>Welcome back, {user?.name || 'Traveler'}! 👋</h1>
            <p>Manage your travel memories and log new adventures below.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpenCreateModal}
              className="btn-submit"
              style={{ width: 'auto', marginTop: 0, padding: '0.75rem 1.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <PlusCircle size={18} />
              <span>Create Trip</span>
            </motion.button>

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
          </div>
        </motion.div>

        {/* User Info & Stats Cards */}
        <motion.div variants={itemVariants} className="grid-cards" style={{ marginBottom: '2.5rem' }}>
          {/* User Profile Card */}
          <motion.div className="card" whileHover={{ y: -4 }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '0.8rem' }}>
              <User color="#818cf8" size={24} />
            </div>
            <h3>User Profile</h3>
            <p style={{ marginTop: '0.2rem', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>
              {user?.name}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
              <Mail size={15} color="#94a3b8" />
              <span>{user?.email}</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <Calendar size={15} color="#94a3b8" />
              <span>Joined: {formattedDate}</span>
            </p>
          </motion.div>

          {/* Session Status Card */}
          <motion.div className="card" whileHover={{ y: -4 }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '0.8rem' }}>
              <ShieldCheck color="#34d399" size={24} />
            </div>
            <h3>Session Status</h3>
            <p style={{ marginTop: '0.2rem', color: '#6ee7b7', fontWeight: 700, fontSize: '1.05rem' }}>
              JWT Bearer Token Active
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', wordBreak: 'break-all' }}>
              Token Preview: <code style={{ background: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.5rem', borderRadius: '6px', color: '#a5b4fc' }}>{token ? `${token.substring(0, 24)}...` : 'None'}</code>
            </p>
          </motion.div>

          {/* Dynamic Travel Stats Card (Increases 1, 2, 3...) */}
          <motion.div className="card" whileHover={{ y: -4 }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '0.8rem' }}>
              <Compass color="#38bdf8" size={24} />
            </div>
            <h3>Travel Memories</h3>
            <p style={{ marginTop: '0.2rem', fontWeight: 800, color: '#38bdf8', fontSize: '1.8rem' }}>
              {trips.length} {trips.length === 1 ? 'Trip' : 'Trips'} Logged
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Week 2 CRUD Operations Active
            </p>
          </motion.div>
        </motion.div>

        {/* Section Header */}
        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Your Travel Journal</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Create, view, edit, and delete your travel entries
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenCreateModal}
            className="btn-submit"
            style={{ width: 'auto', marginTop: 0, padding: '0.65rem 1.3rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <PlusCircle size={18} />
            <span>Add New Trip</span>
          </motion.button>
        </motion.div>

        {/* Trip List Grid / Loading / Empty State */}
        {loadingTrips ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
            <Loader2 size={36} className="spinner" color="#818cf8" />
          </div>
        ) : trips.length > 0 ? (
          <motion.div className="grid-cards" variants={containerVariants}>
            <AnimatePresence>
              {trips.map((trip) => (
                <TripCard
                  key={trip._id}
                  trip={trip}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteTrip}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="card"
            style={{ background: 'rgba(15, 23, 42, 0.55)', borderStyle: 'dashed', textAlign: 'center', padding: '3.5rem 2rem' }}
          >
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
              <Map size={50} color="#818cf8" style={{ margin: '0 auto 1.2rem auto' }} />
            </motion.div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 800 }}>No Travel Memories Yet</h3>
            <p style={{ maxWidth: '480px', margin: '0 auto 1.5rem auto', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              You haven't added any trips to your vault. Click below to add your first travel memory!
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-submit"
              style={{ width: 'auto', padding: '0.85rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
              onClick={handleOpenCreateModal}
            >
              <PlusCircle size={20} />
              <span>Create Your First Trip</span>
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Create / Edit Trip Modal Form */}
      <TripModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveTrip}
        initialData={editingTrip}
      />
    </div>
  );
};

export default Dashboard;
