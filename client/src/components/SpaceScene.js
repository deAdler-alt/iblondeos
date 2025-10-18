// client/src/components/SpaceScene.js
import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei'; // <-- PRZYWRACAMY <Stars>
import Satellite from './Satellite'; 
import ThreatObject from './ThreatObject';
import OrbitalGraph from './OrbitalGraph'; // <-- NOWY IMPORT
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// --- Komponent Ziemi (czysty) ---
const Earth = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} /> 
      <meshStandardMaterial color="#0077ff" /> 
    </mesh>
  );
};

// --- Kontroler Kamery (bez zmian) ---
const CameraFocusController = ({ satellites, selectedSatId }) => {
  const { controls } = useThree(); 
  useFrame(() => {
    if (!controls) return; 
    let targetPosition = new THREE.Vector3(0, 0, 0); 
    if (selectedSatId) {
      const targetSat = satellites.find(s => s.id === selectedSatId);
      if (targetSat) {
        targetPosition.set(
          targetSat.position.x / 10, 
          targetSat.position.y / 10, 
          targetSat.position.z / 10
        );
      }
    }
    controls.target.lerp(targetPosition, 0.1); 
  });
  return null; 
};


const SpaceScene = ({ satellites, selectedSatId, setSelectedSatId }) => {
  
  const activeThreats = satellites.filter(s => s.status === 'threat_detected' && s.threat);

  return (
    <Canvas camera={{ position: [0, 10, 30], fov: 60 }}>
      {/* Suspense nadal tu jest, ale nic już nie powinno crashować */}
      <Suspense fallback={null}> 
        
        <ambientLight intensity={0.2} /> 
        <pointLight position={[10, 10, 10]} intensity={1} /> 

        {/* --- PRZYWRÓCONE GWIAZDY --- */}
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
        />
        
        <Earth />

        {satellites.map(sat => (
          <Satellite 
            key={sat.id} 
            position={sat.position} 
            status={sat.status} 
            id={sat.id}
            setSelectedSatId={setSelectedSatId}
          />
        ))}

        {activeThreats.map(threatenedSat => (
          <ThreatObject
            key={`threat-${threatenedSat.id}`}
            threat={threatenedSat.threat}
          />
        ))}

        {/* --- DODAJEMY GRAF TUTAJ --- */}
        <OrbitalGraph satellites={satellites} />

        <CameraFocusController 
          satellites={satellites} 
          selectedSatId={selectedSatId} 
        />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
        
        <EffectComposer>
          <Bloom 
            intensity={1.0} 
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
        
      </Suspense>
    </Canvas>
  );
};

export default SpaceScene;
