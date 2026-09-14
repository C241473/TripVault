import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Camera, Lock, ArrowRight, Sparkles, Globe, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const sampleDestinations = [
  { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', tag: 'Tropical Paradise' },
  { name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', tag: 'Mountain Trek' },
  { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', tag: 'City Architecture' }
];

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="main-content">
      <motion.div
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Badge Tag */}
        <motion.div variants={itemVariants} className="pill-tag">
          <Sparkles size={16} color="#818cf8" />
          <span>CodGen Virtual Internship • MERN Full Stack</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 variants={itemVariants} className="hero-title">
          Your Personal Vault for Every Unforgettable Journey
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p variants={itemVariants} className="hero-subtitle">
          TripVault is a modern MERN-stack travel journal. Securely log your trips, attach cover photos, preserve ratings, and manage memories with full CRUD operations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="hero-buttons">
          {isAuthenticated ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/dashboard" className="btn-submit" style={{ width: 'auto', padding: '0.9rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <span>Go to Dashboard</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register" className="btn-submit" style={{ width: 'auto', padding: '0.9rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span>Get Started Free</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="nav-btn-primary" style={{ padding: '0.9rem 2rem', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border-glass)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Sign In</span>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Featured Photo Showcase Grid */}
      <motion.div
        className="grid-cards"
        style={{ maxWidth: '1000px', width: '100%', marginTop: '1.5rem', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {sampleDestinations.map((dest, idx) => (
          <motion.div
            key={idx}
            className="card"
            style={{ padding: 0, overflow: 'hidden' }}
            whileHover={{ y: -8 }}
          >
            <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
              <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }} />
              <span className="badge" style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(9, 13, 22, 0.8)', borderColor: 'rgba(255,255,255,0.2)' }}>
                {dest.tag}
              </span>
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{dest.name}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Cards Grid */}
      <motion.div
        className="grid-cards"
        style={{ maxWidth: '1000px', width: '100%' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <motion.div
          className="card"
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <div style={{ background: 'rgba(56, 189, 248, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1rem' }}>
            <MapPin color="#38bdf8" size={24} />
          </div>
          <h3>Log Memories</h3>
          <p>Document travel locations, trip dates, detailed itineraries, and stories from every destination you visit.</p>
        </motion.div>

        <motion.div
          className="card"
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <div style={{ background: 'rgba(129, 140, 248, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1rem' }}>
            <Camera color="#818cf8" size={24} />
          </div>
          <h3>Photo Covers</h3>
          <p>Attach high-resolution photos and memories to your private travel journal entries effortlessly.</p>
        </motion.div>

        <motion.div
          className="card"
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <div style={{ background: 'rgba(52, 211, 153, 0.12)', padding: '0.7rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1rem' }}>
            <ShieldCheck color="#34d399" size={24} />
          </div>
          <h3>JWT Security</h3>
          <p>Protected by password hashing (bcryptjs) and JWT token session authorization for ultimate privacy.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
