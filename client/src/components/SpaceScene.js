// client/src/components/SpaceScene.js
import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei'; // Usunąłem Stars, zakładam że Sky/alternatywa działa
import Satellite from './Satellite'; 
import ThreatObject from './ThreatObject'; // <-- NOWY IMPORT
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// --- Komponent Ziemi (bez zmian) ---
const Earth = () => {
  // const earthTexture = useTexture('/textures/earth.jpg'); // Zakładam, że tego nie robiliśmy
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} /> 
      <meshStandardMaterial color="#0077ff" /> {/* Wracamy do niebieskiej kuli */}
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
  
  // --- NOWA LOGIKA ---
  // Filtrujemy listę satelitów, aby dostać tylko aktywne zagrożenia
  const activeThreats = satellites.filter(s => s.status === 'threat_detected' && s.threat);

  return (
    <Canvas camera={{ position: [0, 10, 30], fov: 60 }}>
      <Suspense fallback={null}> 
        
        <ambientLight intensity={0.2} /> 
        <pointLight position={[10, 10, 10]} intensity={1} /> 

        {/* --- Tło --- */}
        {/* Zostawiam tu kod <Sky>, ale jeśli go pominęliśmy, to tło będzie czarne */}
        {/* Możesz tu wkleić komponent <Stars> z kroku 6, jeśli chcesz */}
        <Sky
          distance={450000}
          sunPosition={[0, 0, 0]}
          inclination={0}
          azimuth={0.25}
          turbidity={0}
          rayleigh={0}
          mieCoefficient={0}
          mieDirectionalG={0}
        />
        
        <Earth />

        {/* Renderowanie naszych satelitów (bez zmian) */}
        {satellites.map(sat => (
          <Satellite 
            key={sat.id} 
            position={sat.position} 
            status={sat.status} 
            id={sat.id}
            setSelectedSatId={setSelectedSatId}
          />
        ))}

        {/* --- NOWA SEKCJA: Renderowanie Obiektów Zagrożeń --- */}
        {activeThreats.map(threatenedSat => (
          <ThreatObject
            key={`threat-${threatenedSat.id}`}
            threat={threatenedSat.threat}
          />
        ))}

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
