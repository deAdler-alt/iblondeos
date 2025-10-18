// server/simulator.js
const { getSatellites, updateSatellite, updatePositions } = require('./state');

let simulationInterval;
let threatInterval;

const startSimulator = (io) => {

  // --- Pętla 1: Symulacja ruchu (bez zmian) ---
  simulationInterval = setInterval(() => {
    updatePositions();
    io.emit('state_update', getSatellites());
  }, 1000); 


  // --- Pętla 2: Symulacja zagrożeń (TUTAJ ZMIANA) ---
  threatInterval = setInterval(() => {

    const satellites = getSatellites();
    const randomSat = satellites[Math.floor(Math.random() * satellites.length)];

    if (randomSat.status === 'operational' && Math.random() < 0.5) { 
      
      // --- NOWA LOGIKA ---
      // Generujemy pozycję wroga blisko naszego satelity
      const enemyPos = {
        x: randomSat.position.x + (Math.random() - 0.5) * 20, // Blisko w osi X
        y: randomSat.position.y + (Math.random() - 0.5) * 20, // Blisko w osi Y
        z: randomSat.position.z + (Math.random() - 0.5) * 20  // Blisko w osi Z
      };

      const threatDetails = {
        type: 'Proximity Alert',
        source: `UNK-${Math.floor(1000 + Math.random() * 9000)}`,
        distance: `${Math.floor(5 + Math.random() * 20)}km`,
        enemyPosition: enemyPos // <-- Przekazujemy pozycję wroga
      };
      
      updateSatellite(randomSat.id, 'threat_detected', threatDetails);
      
      io.emit('alert', {
        title: 'THREAT DETECTED',
        message: `Threat for ${randomSat.name} (Source: ${threatDetails.source})`
      });

    } else if (randomSat.status === 'threat_detected') {
      updateSatellite(randomSat.id, 'operational', null);
    }
    
    io.emit('state_update', getSatellites());

  }, 5000); 
};

module.exports = { startSimulator };
