import React from 'react';
import { MapPin, Calendar, Star, Edit3, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TripCard = ({ trip, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const startFormatted = formatDate(trip.startDate);
  const endFormatted = formatDate(trip.endDate);

  // Render Star Rating (1 to 5)
  const renderStars = (rating) => {
    const stars = [];
    const num = Math.min(5, Math.max(1, rating || 5));
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i <= num ? '#f59e0b' : 'none'}
          color={i <= num ? '#f59e0b' : '#64748b'}
          style={{ transition: 'all 0.2s ease' }}
        />
      );
    }
    return stars;
  };

  return (
    <motion.div
      className="card trip-card"
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
        <div>
          <span className="badge" style={{ marginBottom: '0.4rem', background: 'rgba(6, 182, 212, 0.15)', borderColor: 'rgba(6, 182, 212, 0.3)', color: '#38bdf8' }}>
            <MapPin size={12} style={{ marginRight: '4px' }} />
            {trip.destination}
          </span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '0.2rem', color: '#ffffff' }}>
            {trip.title}
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '0.3rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {renderStars(trip.rating)}
        </div>
      </div>

      {(startFormatted || endFormatted) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.8rem' }}>
          <Calendar size={15} color="#818cf8" />
          <span>
            {startFormatted || 'N/A'} {endFormatted ? `— ${endFormatted}` : ''}
          </span>
        </div>
      )}

      {trip.description && (
        <p style={{ color: '#cbd5e1', fontSize: '0.925rem', marginBottom: '1.25rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
          {trip.description}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(trip)}
          className="nav-link"
          style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#a5b4fc', padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
        >
          <Edit3 size={15} />
          <span>Edit</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(trip._id)}
          className="logout-btn"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
        >
          <Trash2 size={15} />
          <span>Delete</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TripCard;
