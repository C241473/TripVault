import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar, Compass, PlusCircle, Map, ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logoutUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently';

  return (
    <div className="main-content" style={{ justifyContent: 'flex-start', paddingTop: '2rem' }}>
      <div className="dashboard-container">
        {/* Welcome Banner */}
        <div className="welcome-card">
          <div className="welcome-text">
            <span className="badge" style={{ marginBottom: '0.6rem' }}>Authentication Verified</span>
            <h1>Welcome back, {user?.name || 'Traveler'}! 👋</h1>
            <p>Your TripVault is active and ready for your travel memories.</p>
          </div>
          <div>
            <button onClick={handleLogout} className="logout-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid-cards" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <h3>
              <User color="#818cf8" size={20} /> User Profile
            </h3>
            <p style={{ marginTop: '0.5rem', fontWeight: 600, color: '#fff', fontSize: '1.05rem' }}>
              {user?.name}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
              <Mail size={15} color="#94a3b8" />
              <span>{user?.email}</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
              <Calendar size={15} color="#94a3b8" />
              <span>Joined: {formattedDate}</span>
            </p>
          </div>

          <div className="card">
            <h3>
              <ShieldCheck color="#34d399" size={20} /> Security Status
            </h3>
            <p style={{ marginTop: '0.5rem', color: '#6ee7b7', fontWeight: 600 }}>
              JWT Session Active
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', wordBreak: 'break-all' }}>
              Token Preview: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>{token ? `${token.substring(0, 24)}...` : 'None'}</code>
            </p>
          </div>

          <div className="card">
            <h3>
              <Compass color="#38bdf8" size={20} /> Travel Stats
            </h3>
            <p style={{ marginTop: '0.5rem', fontWeight: 600, color: '#fff', fontSize: '1.2rem' }}>
              0 Trips Logged
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Ready for Week 2: Trip creation & photo uploads!
            </p>
          </div>
        </div>

        {/* Feature Teaser Card */}
        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.5)', borderStyle: 'dashed', textAlign: 'center', padding: '3rem 2rem' }}>
          <Map size={48} color="#818cf8" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Your Journal is Empty</h2>
          <p style={{ maxWidth: '500px', margin: '0 auto 1.5rem auto', color: 'var(--text-muted)' }}>
            Week 1 foundation setup is complete! In upcoming weeks, you will be able to log destinations, upload photos, and organize your trip timeline here.
          </p>
          <button className="btn-submit" style={{ width: 'auto', padding: '0.7rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => alert('Week 1 Authentication Complete! Ready for Week 2 features.')}>
            <PlusCircle size={18} />
            <span>Create New Trip (Coming Week 2)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
