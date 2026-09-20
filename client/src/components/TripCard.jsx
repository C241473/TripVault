import React from 'react';
import { MapPin, Calendar, Star, Edit3, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultFallbackImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';

const TripCard = ({ trip, onEdit, onDelete, onViewDetails, isReadOnly }) => {
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
          size={15}
          fill={i <= num ? '#f59e0b' : 'none'}
          color={i <= num ? '#f59e0b' : '#64748b'}
        />
      );
    }
    return stars;
  };

  const imageUrl = trip.coverImage || trip.image || defaultFallbackImage;
  const photoCount = Array.isArray(trip.photos) ? trip.photos.length : 1;

  return (
    <motion.div
      className="card trip-card"
      style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: onViewDetails ? 'pointer' : 'default' }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.25)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onClick={() => onViewDetails && onViewDetails(trip)}
    >
      {/* Travel Photo Header Banner with Gradient Overlay */}
      <div style={{ position: 'relative', width: '100%', height: '185px', overflow: 'hidden' }}>
        <motion.img
          src={imageUrl}
          alt={trip.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultFallbackImage;
          }}
        />

        {/* Gradient Overlay for text contrast */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)' }} />

        {/* Destination Pill Tag */}
        <span
          className="badge"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(9, 13, 22, 0.75)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
            fontSize: '0.75rem',
            padding: '0.35rem 0.75rem'
          }}
        >
          <MapPin size={12} style={{ marginRight: '4px' }} />
          {trip.destination}
        </span>

        {/* Star Rating Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(9, 13, 22, 0.75)',
            backdropFilter: 'blur(10px)',
            padding: '0.35rem 0.6rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            gap: '0.2rem'
          }}
        >
          {renderStars(trip.rating)}
        </div>
      </div>

      {/* Card Content Details */}
      <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
            {trip.title}
          </h3>

          {(startFormatted || endFormatted) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.8rem' }}>
              <Calendar size={14} color="#818cf8" />
              <span>
                {startFormatted || 'N/A'} {endFormatted ? `— ${endFormatted}` : ''}
              </span>
            </div>
          )}

          {trip.description && (
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1.2rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {trip.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {!isReadOnly && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.8rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.78rem', color: '#818cf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Eye size={14} /> Click to view gallery ({photoCount})
            </span>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onEdit(trip); }}
                className="nav-link"
                style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#a5b4fc', padding: '0.4rem 0.8rem', fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onDelete(trip._id); }}
                className="logout-btn"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TripCard;
