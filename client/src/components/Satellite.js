// client/src/components/Satellite.js
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// To jest komponent dla JEDNEGO satelity
const Satellite = ({ position, status }) => {
  // ref da nam bezpośredni dostęp do obiektu <mesh>
  const meshRef = useRef();
  
  // Zdefiniujmy kolory
  const operationalColor = '#00ff00'; // zielony
  const threatColor = '#ff0000'; // czerwony
  
  // Użyj 'useFrame' do animacji (wykonuje się przy każdej klatce)
  useFrame((state, delta) => {
    // Niech się lekko obraca dla "efektu"
    meshRef.current.rotation.y += delta * 0.5;

    // A co najważniejsze: PULSOWANIE przy zagrożeniu
    if (status === 'threat_detected') {
      // Użyj fali sinusoidalnej do płynnego pulsowania skalą
      const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.5;
      meshRef.current.scale.set(scale, scale, scale);
    } else {
      // Ustaw domyślną skalę, jeśli nie ma zagrożenia
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      // Używamy pozycji z naszych danych backendowych
      // Dzielimy przez 10, żeby nie były tak daleko od Ziemi
      position={[position.x / 10, position.y / 10, position.z / 10]}
    >
      {/* Kształt: mała kula */}
      <sphereGeometry args={[0.5, 16, 16]} /> 
      
      {/* Materiał: kolor zależy od statusu */}
      <meshStandardMaterial 
        color={status === 'threat_detected' ? threatColor : operationalColor} 
        emissive={status === 'threat_detected' ? threatColor : operationalColor} // Sprawia, że "świeci"
        emissiveIntensity={status === 'threat_detected' ? 2 : 0}
      />
    </mesh>
  );
};

export default Satellite;
