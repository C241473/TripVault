import React from 'react';
import { X, MapPin, Calendar, Star, Compass, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TripDetailModal = ({ trip, onClose }) => {
  if (!trip) return null;

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

  const photosList = Array.isArray(trip.photos) && trip.photos.length > 0
    ? trip.photos
    : [trip.coverImage || trip.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'];

  const renderStars = (rating) => {
    const stars = [];
    const num = Math.min(5, Math.max(1, rating || 5));
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          fill={i <= num ? '#f59e0b' : 'none'}
          color={i <= num ? '#f59e0b' : '#64748b'}
        />
      );
    }
    return stars;
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '680px', padding: 0, overflow: 'hidden' }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header Cover Photo */}
          <div style={{ position: 'relative', width: '100%', height: '240px' }}>
            <img
              src={trip.coverImage || trip.image || photosList[0]}
              alt={trip.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)' }} />

            <button
              className="modal-close-btn"
              onClick={onClose}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(9, 13, 22, 0.75)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <X size={20} />
            </button>

            <div style={{ position: 'absolute', bottom: '15px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.2)', borderColor: '#38bdf8', color: '#38bdf8', marginBottom: '0.4rem' }}>
                  <MapPin size={12} style={{ marginRight: '4px' }} />
                  {trip.destination}
                </span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{trip.title}</h2>
              </div>

              <div style={{ display: 'flex', gap: '0.2rem', background: 'rgba(9, 13, 22, 0.8)', padding: '0.4rem 0.7rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.15)' }}>
                {renderStars(trip.rating)}
              </div>
            </div>
          </div>

          <div style={{ padding: '1.75rem' }}>
            {/* Dates */}
            {(startFormatted || endFormatted) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                <Calendar size={18} />
                <span>
                  {startFormatted || 'N/A'} {endFormatted ? `— ${endFormatted}` : ''}
                </span>
              </div>
            )}

            {/* Description */}
            {trip.description && (
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', fontWeight: 700 }}>
                  Notes & Travel Memories
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {trip.description}
                </p>
              </div>
            )}

            {/* Photo Grid Gallery */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ImageIcon size={16} color="#38bdf8" />
                <span>Photo Gallery ({photosList.length})</span>
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
                {photosList.map((photoUrl, idx) => (
                  <motion.div
                    key={idx}
                    style={{ borderRadius: '12px', overflow: 'hidden', height: '110px', border: '1px solid rgba(255,255,255,0.1)' }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={photoUrl}
                      alt={`Trip photo ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TripDetailModal;
