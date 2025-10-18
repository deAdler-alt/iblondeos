// client/src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; // Importujemy nasz nowy plik CSS

const Sidebar = ({ satellites }) => {
  
  // 1. Filtrujemy satelity, aby wyodrębnić tylko te z aktywnym zagrożeniem
  const activeThreats = satellites.filter(sat => sat.status === 'threat_detected');
  
  // 2. Liczymy statystyki
  const operationalCount = satellites.length - activeThreats.length;
  const threatCount = activeThreats.length;

  return (
    <div className="sidebar-container">

      {/* --- Sekcja 1: Status Ogólny --- */}
      <div className="sidebar-section">
        <h2>Mission Status</h2>
        <div className="status-grid">
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

      {/* --- Sekcja 2: Aktywne Alerty --- */}
      <div className="sidebar-section">
        <h2>Active Alerts</h2>
        <div className="list-container">
          {threatCount === 0 ? (
            <p className="no-alerts">All systems clear.</p>
          ) : (
            activeThreats.map(threatSat => (
              <div key={threatSat.id} className="alert-item">
                <strong>{threatSat.name} ({threatSat.id})</strong>
                <span>Type: {threatSat.threat.type}</span><br />
                <span>Source: {threatSat.threat.source}</span><br />
                <span>Dist: {threatSat.threat.distance}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- Sekcja 3: Lista Wszystkich Satelitów --- */}
      <div className="sidebar-section">
        <h2>All Assets</h2>
        <div className="list-container">
          {satellites.map(sat => (
            <div 
              key={sat.id} 
              // Dodajemy klasy CSS w zależności od statusu
              className={`satellite-item ${sat.status === 'threat_detected' ? 'threat' : 'operational'}`}
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
