import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Star, Compass, AlertCircle, Image as ImageIcon, Sparkles, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const photoPresets = [
  { name: '🏖️ Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { name: '🏔️ Mountain', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
  { name: '🗼 Paris', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' },
  { name: '⛩️ Tokyo', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80' },
  { name: '🏛️ Rome', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80' }
];

const TripModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    rating: 5,
    coverImage: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      const existingImg = initialData.coverImage || initialData.image || '';
      setFormData({
        title: initialData.title || '',
        destination: initialData.destination || '',
        startDate: initialData.startDate ? initialData.startDate.split('T')[0] : '',
        endDate: initialData.endDate ? initialData.endDate.split('T')[0] : '',
        description: initialData.description || '',
        rating: initialData.rating || 5,
        coverImage: existingImg
      });
      setImagePreview(existingImg);
    } else {
      setFormData({
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        description: '',
        rating: 5,
        coverImage: ''
      });
      setImagePreview('');
    }
    setImageFile(null);
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

  const handleSelectPreset = (url) => {
    setFormData({ ...formData, coverImage: url });
    setImagePreview(url);
    setImageFile(null);
  };

  // File Upload Selection & Live Image Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit.');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
      await onSubmit({ ...formData, imageFile });
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

            {/* Photo Upload Input & Live Image Preview */}
            <div className="form-group">
              <label htmlFor="imageFile">Photo Upload (Cloudinary / File)</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="imageFile"
                  className="nav-btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    padding: '0.6rem 1rem'
                  }}
                >
                  <Upload size={16} />
                  <span>Choose Photo File</span>
                </label>
                {imageFile && <span style={{ fontSize: '0.825rem', color: '#6ee7b7' }}>{imageFile.name}</span>}
              </div>

              {/* Image Preview Box */}
              {imagePreview && (
                <div style={{ marginTop: '0.75rem', height: '120px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', position: 'relative' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.7)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: '#fff' }}>
                    Photo Preview
                  </span>
                </div>
              )}

              {/* Preset Travel Photo Quick Select */}
              <div style={{ marginTop: '0.8rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <Sparkles size={13} color="#38bdf8" /> Or choose a travel preset photo:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {photoPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset.url)}
                      style={{
                        background: formData.coverImage === preset.url ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                        border: formData.coverImage === preset.url ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: formData.coverImage === preset.url ? '#fff' : '#cbd5e1',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
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
                    <span className="spinner"></span> Uploading & Saving...
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
