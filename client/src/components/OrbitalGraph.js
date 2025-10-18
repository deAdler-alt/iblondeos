// client/src/components/OrbitalGraph.js
import React from 'react';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import './Graph.css'; // Importujemy nasz CSS

const earthPos = new THREE.Vector3(0, 0, 0);

// Pojedyncza linia z etykietą
const GraphLine = ({ start, end, color, label }) => {
  // Obliczamy punkt środkowy dla etykiety
  const midPoint = new THREE.Vector3().lerpVectors(start, end, 0.5);

  return (
    <>
      <Line
        points={[start, end]}
        color={color}
        lineWidth={1.0}
        dashed={true}
        dashScale={10}
      />
      <Html position={midPoint}>
        <div className={`graph-label ${color === 'red' ? 'threat' : ''}`}>
          {label}
        </div>
      </Html>
    </>
  );
};

// Główny komponent renderujący wszystkie linie
const OrbitalGraph = ({ satellites }) => {
  const activeThreats = satellites.filter(s => s.status === 'threat_detected' && s.threat);

  // Funkcja do "zafałszowania" odległości, żeby wyglądała "kosmicznie"
  const getDistance = (posA, posB) => {
    // Mnożymy dystans ze sceny 3D (który jest mały) przez dużą liczbę
    return (posA.distanceTo(posB) * 1500).toFixed(0) + ' km';
  };

  return (
    <group>
      {/* 1. Linie do "zdrowych" satelitów */}
      {satellites.map(sat => {
        const satPos = new THREE.Vector3(
          sat.position.x / 10,
          sat.position.y / 10,
          sat.position.z / 10
        );
        const distance = getDistance(earthPos, satPos);
        
        // Rysuj linię tylko jeśli nie ma zagrożenia (żeby się nie dublowało)
        if (sat.status === 'operational') {
          return (
            <GraphLine
              key={`line-${sat.id}`}
              start={earthPos}
              end={satPos}
              color="white"
              label={distance}
            />
          );
        }
        return null;
      })}

      {/* 2. Linie do "zagrożeń" (czerwone) */}
      {activeThreats.map(threatSat => {
        const threatPos = new THREE.Vector3(
          threatSat.threat.enemyPosition.x / 10,
          threatSat.threat.enemyPosition.y / 10,
          threatSat.threat.enemyPosition.z / 10
        );
        const distance = getDistance(earthPos, threatPos);
        
        return (
          <GraphLine
            key={`threat-line-${threatSat.id}`}
            start={earthPos}
            end={threatPos}
            color="red"
            label={`THREAT: ${distance}`}
          />
        );
      })}
    </group>
  );
};

export default OrbitalGraph;
