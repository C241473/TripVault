import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Star, FileText, Compass, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TripModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    rating: 5
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        destination: initialData.destination || '',
        startDate: initialData.startDate ? initialData.startDate.split('T')[0] : '',
        endDate: initialData.endDate ? initialData.endDate.split('T')[0] : '',
        description: initialData.description || '',
        rating: initialData.rating || 5
      });
    } else {
      setFormData({
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        description: '',
        rating: 5
      });
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleRatingChange = (val) => {
    setFormData({ ...formData, rating: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.destination) {
      setError('Trip title and destination are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error('Error submitting trip modal:', err);
      const msg = err.response?.data?.message || 'Failed to save trip. Please try again.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.5rem', borderRadius: '10px' }}>
                <Compass size={22} color="#818cf8" />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {initialData ? 'Edit Travel Memory' : 'Create New Trip'}
              </h2>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="alert alert-error" style={{ margin: '1rem 1.5rem 0 1.5rem' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Trip Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                style={{ paddingLeft: '1rem' }}
                placeholder="e.g. Summer Vacation in Bali"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="destination">Destination *</label>
              <input
                type="text"
                id="destination"
                name="destination"
                className="form-control"
                style={{ paddingLeft: '1rem' }}
                placeholder="e.g. Bali, Indonesia"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  style={{ paddingLeft: '1rem' }}
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="form-control"
                  style={{ paddingLeft: '1rem' }}
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Rating (1 - 5 Stars)</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.2rem',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    <Star
                      size={28}
                      fill={star <= formData.rating ? '#f59e0b' : 'none'}
                      color={star <= formData.rating ? '#f59e0b' : '#64748b'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Notes / Memories</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                className="form-control"
                style={{ paddingLeft: '1rem', resize: 'vertical' }}
                placeholder="Write your favorite memories, places visited, or notes..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="button" className="logout-btn" onClick={onClose} style={{ border: '1px solid var(--border-glass)' }}>
                Cancel
              </button>
              <button type="submit" className="btn-submit" style={{ width: 'auto', marginTop: 0, padding: '0.8rem 1.8rem' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="spinner"></span> Saving...
                  </span>
                ) : (
                  initialData ? 'Update Trip' : 'Save Trip'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TripModal;
