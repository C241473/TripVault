import React, { useState, useEffect } from 'react';
import { X, User, FileText, AlertCircle, Compass, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setBio(user.bio || '');
    }
    setError('');
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username cannot be empty.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({ username, bio });
      onClose();
    } catch (err) {
      console.error('Error updating profile:', err);
      const msg = err.response?.data?.message || 'Failed to update profile.';
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
                <User size={22} color="#818cf8" />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Edit Public Profile</h2>
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
              <label htmlFor="username">Public Username (@handle)</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="e.g. alex_traveler"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <span style={{ position: 'absolute', left: '1rem', color: '#818cf8', fontWeight: 700 }}>@</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem', display: 'block' }}>
                Your public profile URL will be: <code>http://localhost:5173/profile/{username || 'username'}</code>
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="bio">About You / Bio</label>
              <textarea
                id="bio"
                rows="4"
                className="form-control"
                style={{ paddingLeft: '1rem', resize: 'vertical' }}
                placeholder="Share a short bio about your travel passions..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Check size={18} />
                    <span>Save Profile</span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditProfileModal;
