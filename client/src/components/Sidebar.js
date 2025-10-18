// client/src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

// NEW: Props now include selectedSatId and its setter
const Sidebar = ({ satellites, selectedSatId, setSelectedSatId }) => {
  
  const activeThreats = satellites.filter(sat => sat.status === 'threat_detected');
  const operationalCount = satellites.length - activeThreats.length;
  const threatCount = activeThreats.length;

  return (
    <div className="sidebar-container">

      {/* --- Sekcja 1: Status Ogólny (bez zmian) --- */}
      <div className="sidebar-section">
        <h2>Mission Status</h2>
        <div className="status-grid">
          {/* ... (ta sekcja pozostaje bez zmian) ... */}
          <div className="status-item">
            Tracking
            <span>{satellites.length}</span>
          </div>
          <div className="status-item">
            Operational
            <span className="status-operational">{operationalCount}</span>
          </div>
          <div className="status-item">
            Threats
            <span className="status-threat">{threatCount}</span>
          </div>
        </div>
      </div>

      {/* --- Sekcja 2: Aktywne Alerty (bez zmian) --- */}
      <div className="sidebar-section">
        <h2>Active Alerts</h2>
        <div className="list-container">
          {threatCount === 0 ? (
            <p className="no-alerts">All systems clear.</p>
          ) : (
            activeThreats.map(threatSat => (
              <div key={threatSat.id} className="alert-item">
                {/* ... (ta sekcja pozostaje bez zmian) ... */}
                <strong>{threatSat.name} ({threatSat.id})</strong>
                <span>Type: {threatSat.threat.type}</span><br />
                <span>Source: {threatSat.threat.source}</span><br />
                <span>Dist: {threatSat.threat.distance}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- Sekcja 3: Lista Wszystkich Satelitów (TUTAJ ZMIANY) --- */}
      <div className="sidebar-section">
        <h2>All Assets</h2>
        <div className="list-container">
          {satellites.map(sat => (
            <div 
              key={sat.id} 
              // NEW: Add 'selected' class if this satellite is the selected one
              className={`
                satellite-item 
                ${sat.status === 'threat_detected' ? 'threat' : 'operational'}
                ${sat.id === selectedSatId ? 'selected' : ''}
              `}
              // NEW: Add onClick handler to set this satellite as selected
              onClick={() => setSelectedSatId(sat.id)}
            >
              <strong>{sat.name} ({sat.id})</strong>
              <span>Status: {sat.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
