import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { User, MapPin, Calendar, Compass, ShieldCheck, ArrowLeft, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import TripCard from '../components/TripCard';
import TripDetailModal from '../components/TripDetailModal';

const PublicProfile = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(`/api/users/${username}/profile`);
        setProfileUser(res.data.user);
        setTrips(res.data.trips || []);
      } catch (err) {
        console.error('Error loading public profile:', err);
        setError(err.response?.data?.message || 'Public profile not found');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPublicProfile();
    }
  }, [username]);

  const formattedDate = profileUser?.createdAt
    ? new Date(profileUser.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    : 'Recently';

  if (loading) {
    return (
      <div className="main-content">
        <Loader2 size={40} className="spinner" color="#818cf8" />
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="main-content">
        <div className="auth-card" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', padding: '1rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1rem auto' }}>
            <Compass size={40} color="#f43f5e" />
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Profile Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            The public traveller profile @{username} does not exist or has been removed.
          </p>
          <Link to="/" className="btn-submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'auto', padding: '0.75rem 1.5rem' }}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ justifyContent: 'flex-start', paddingTop: '2.5rem' }}>
      <div className="dashboard-container">
        {/* Back navigation */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Public Profile Header Banner */}
        <motion.div
          className="welcome-card"
          style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.2) 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)', padding: '1.2rem', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 25px rgba(99,102,241,0.4)' }}>
              <User size={40} color="#ffffff" />
            </div>

            <div className="welcome-text">
              <span className="badge" style={{ marginBottom: '0.5rem', background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                🌐 Public Traveller Profile
              </span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{profileUser.name}</h1>
              <p style={{ color: '#38bdf8', fontWeight: 700, fontSize: '1.05rem' }}>@{profileUser.username}</p>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '0.4rem', maxWidth: '600px' }}>
                {profileUser.bio || 'Passionate traveller logging memories on TripVault 🗺️'}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total Travels</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>{trips.length}</h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>Member since {formattedDate}</span>
          </div>
        </motion.div>

        {/* Public Trip Journal Grid */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Public Travel Memories ({trips.length})</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Browsing {profileUser.name}'s verified travel journal & photo gallery
          </p>
        </div>

        {trips.length > 0 ? (
          <div className="grid-cards">
            {trips.map((trip) => (
              <div key={trip._id} onClick={() => setSelectedTrip(trip)} style={{ cursor: 'pointer' }}>
                <TripCard
                  trip={trip}
                  onEdit={() => setSelectedTrip(trip)}
                  onDelete={() => setSelectedTrip(trip)}
                  isReadOnly={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlignment: 'center', padding: '3.5rem 2rem', background: 'rgba(15, 23, 42, 0.5)', borderStyle: 'dashed' }}>
            <Compass size={48} color="#818cf8" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem' }}>No Public Trips Yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>@{profileUser.username} has not posted any travel memories yet.</p>
          </div>
        )}
      </div>

      {/* Single Trip Detail Photo Gallery Modal */}
      {selectedTrip && (
        <TripDetailModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
};

export default PublicProfile;
