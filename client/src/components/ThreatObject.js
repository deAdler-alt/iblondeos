// client/src/components/ThreatObject.js
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Alternatywa, jeśli nie masz modelu 3D:
const FallbackThreat = ({ position }) => (
  <mesh position={position} scale={0.4}>
    <icosahedronGeometry args={[1, 0]} /> {/* Kolczasta kula */}
    <meshStandardMaterial color="#ff0000" emissive="#ff0000" />
  </mesh>
);

const ThreatObject = ({ threat }) => {
  const modelRef = useRef();
  
  // 1. Ładujemy nasz model 3D.
  // Upewnij się, że ścieżka jest poprawna!
  // Jeśli ładowanie się nie uda, 'nodes' będzie pusty.
  const { nodes, materials } = useGLTF('/models/asteroid.glb');

  // 2. Pozycja wroga (skalujemy ją jak satelity)
  const position = [
    threat.enemyPosition.x / 10,
    threat.enemyPosition.y / 10,
    threat.enemyPosition.z / 10
  ];

  // 3. Prosta animacja (obrót)
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
      modelRef.current.rotation.x += delta * 0.3;
    }
  });

  // 4. Jeśli model 3D się nie załadował, użyj "fallbacku"
  if (!nodes || Object.keys(nodes).length === 0) {
    console.warn('Could not load 3D model, using fallback spike ball.');
    return <FallbackThreat position={position} />;
  }

  // 5. Renderowanie modelu .glb
  // To jest skomplikowana część - musimy znaleźć "mesh" w pobranym pliku.
  // Poniższy kod próbuje "zgadnąć" i renderuje wszystkie meshe z modelu.
  // To może wymagać ręcznej poprawki w zależności od modelu!
  return (
    <group ref={modelRef} position={position} scale={0.1}> {/* Skalujemy model, bo może być za duży */}
      {Object.values(nodes).map((node) => {
        if (node.isMesh) {
          return <primitive object={node.clone()} key={node.uuid} />;
        }
        return null;
      })}
    </group>
  );
};

// Optymalizacja: Pre-loaduj model, żeby był gotowy
useGLTF.preload('/models/asteroid.glb');

export default ThreatObject;
