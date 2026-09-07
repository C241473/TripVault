import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Camera, Lock, ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="main-content">
      <div className="hero-section">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, color: '#818cf8', marginBottom: '1.5rem' }}>
          <Sparkles size={16} />
          <span>CodGen Virtual Internship • Week 1</span>
        </div>
        <h1 className="hero-title">Your Personal Vault for Every Unforgettable Journey</h1>
        <p className="hero-subtitle">
          TripVault is a secure travel memory journal. Save your favorite trips, upload photos, log memories, and share your adventures with the world.
        </p>

        <div className="hero-buttons">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-submit" style={{ width: 'auto', padding: '0.8rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Go to Dashboard</span>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-submit" style={{ width: 'auto', padding: '0.8rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="nav-btn-primary" style={{ padding: '0.8rem 1.8rem', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border)' }}>
                <span>Sign In</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="grid-cards" style={{ maxWidth: '960px', width: '100%', marginTop: '2rem' }}>
        <div className="card">
          <h3>
            <MapPin color="#38bdf8" size={20} /> Log Memories
          </h3>
          <p>Document travel locations, trip dates, itineraries, and highlight stories from every destination you visit.</p>
        </div>
        <div className="card">
          <h3>
            <Camera color="#818cf8" size={20} /> Photo Gallery
          </h3>
          <p>Attach photos and high-resolution memories to your private travel journal entries effortlessly.</p>
        </div>
        <div className="card">
          <h3>
            <Lock color="#34d399" size={20} /> JWT Auth & Security
          </h3>
          <p>Protected by password hashing (bcryptjs) and JWT token session authorization for maximum security.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
