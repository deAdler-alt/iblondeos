// client/src/components/ThreatObject.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Od teraz renderujemy TYLKO to:
const FallbackThreat = ({ position }) => {
  const modelRef = useRef();

  // Animacja obrotu
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
      modelRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <mesh ref={modelRef} position={position} scale={0.4}>
      <icosahedronGeometry args={[1, 0]} /> {/* Kolczasta kula */}
      <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
    </mesh>
  );
};

const ThreatObject = ({ threat }) => {
  // Pozycja wroga (skalujemy ją jak satelity)
  const position = [
    threat.enemyPosition.x / 10,
    threat.enemyPosition.y / 10,
    threat.enemyPosition.z / 10
  ];

  // Renderujemy tylko fallback, ignorujemy useGLTF
  return <FallbackThreat position={position} />;
};

export default ThreatObject;
