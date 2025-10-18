// client/src/components/Satellite.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Satellite = ({ position, status, id, setSelectedSatId }) => {
  const meshRef = useRef();
  
  const operationalColor = '#00ff00'; 
  const threatColor = '#ff0000'; 
  
  useFrame((state, delta) => {
    if (!meshRef.current) return; 
    meshRef.current.rotation.y += delta * 0.5;

    if (status === 'threat_detected') {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.5;
      meshRef.current.scale.set(scale, scale, scale);
    } else {
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  const handleClick = (event) => {
    event.stopPropagation(); 
    setSelectedSatId(id);
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    document.body.style.cursor = 'pointer'; 
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    document.body.style.cursor = 'default'; 
  };

  // --- ZMIANA JEST TUTAJ ---
  // Zielone satelity będą teraz miały lekką poświatę (0.5),
  // a czerwone zachowają mocną (2).
  const intensity = status === 'threat_detected' ? 2 : 0.5;

  return (
    <mesh
      ref={meshRef}
      position={[position.x / 10, position.y / 10, position.z / 10]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut} 
    >
      <sphereGeometry args={[0.5, 16, 16]} /> 
      <meshStandardMaterial 
        color={status === 'threat_detected' ? threatColor : operationalColor} 
        emissive={status === 'threat_detected' ? threatColor : operationalColor} 
        emissiveIntensity={intensity} // <-- ZASTOSOWANIE ZMIENNEJ
      />
    </mesh>
  );
};

export default Satellite;
