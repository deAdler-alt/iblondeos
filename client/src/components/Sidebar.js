// client/src/components/Sidebar.js
import React from 'react';

// Na razie tylko placeholder
const Sidebar = ({ satellites }) => {
  
  // Policzmy satelity, żeby pokazać, że dane docierają
  const operationalCount = satellites.filter(s => s.status === 'operational').length;
  const threatCount = satellites.filter(s => s.status === 'threat_detected').length;

  return (
    <div>
      <h2>Mission Status</h2>
      <p>Tracking: {satellites.length} assets</p>
      <p style={{ color: '#4caf50' }}>Operational: {operationalCount}</p>
      <p style={{ color: '#f44336' }}>Threats: {threatCount}</p>
      
      <hr />
      
      <h3>Alert Log</h3>
      <p>...</p>
      
      <h3>Satellite List</h3>
      <p>...</p>
    </div>
  );
};

export default Sidebar;
