// server/state.js

// Nasza "baza danych" w pamięci
let satellites = [
  { id: 'ESA-01', name: 'Galileo 1', status: 'operational', position: { x: 100, y: 50, z: -20 }, threat: null },
  { id: 'ESA-02', name: 'Galileo 2', status: 'operational', position: { x: -150, y: 100, z: 10 }, threat: null },
  { id: 'ESA-03', name: 'Copernicus A', status: 'operational', position: { x: 200, y: -50, z: 150 }, threat: null },
  { id: 'ESA-04', name: 'Copernicus B', status: 'operational', position: { x: -50, y: 200, z: -100 }, threat: null },
  { id: 'LUX-01', name: 'GovSat-1', status: 'operational', position: { x: 0, y: 0, z: 250 }, threat: null },
  { id: 'ITA-01', name: 'COSMO-SkyMed', status: 'operational', position: { x: 300, y: 100, z: 0 }, threat: null }
];

// Funkcja pomocnicza do pobierania całego stanu
const getSatellites = () => satellites;

// Funkcja pomocnicza do aktualizacji stanu
// (Na razie prosta, potem ją rozbudujemy)
const updateSatellite = (id, newStatus, newThreat) => {
  const sat = satellites.find(s => s.id === id);
  if (sat) {
    sat.status = newStatus;
    sat.threat = newThreat;
  }
  return sat;
};

// Funkcja do symulowania lekkiego ruchu
const updatePositions = () => {
  satellites.forEach(sat => {
    // Prosty, losowy "dryf"
    sat.position.x += (Math.random() - 0.5) * 5;
    sat.position.y += (Math.random() - 0.5) * 5;
    sat.position.z += (Math.random() - 0.5) * 5;
  });
};

// Eksportujemy funkcje, by inne pliki mogły z nich korzystać
module.exports = {
  getSatellites,
  updateSatellite,
  updatePositions
};
