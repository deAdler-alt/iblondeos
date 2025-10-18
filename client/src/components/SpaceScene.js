// client/src/components/SpaceScene.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Satellite from './Satellite'; // Importujemy nasz nowy komponent

// Prosty komponent Ziemi
const Earth = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} /> {/* Ziemia ma promień 2 */}
      <meshStandardMaterial color="#0077ff" /> {/* Prosty niebieski kolor */}
    </mesh>
  );
};

const SpaceScene = ({ satellites }) => {
  return (
    // 'Canvas' to główny kontener 3D od react-three-fiber
    <Canvas camera={{ position: [0, 10, 30], fov: 60 }}>
      {/* Suspense jest potrzebny, gdy ładujemy np. modele 3D, na razie jako dobra praktyka */}
      <Suspense fallback={null}>
        
        {/* === Światła === */}
        <ambientLight intensity={0.2} /> {/* Delikatne światło wszędzie */}
        <pointLight position={[10, 10, 10]} intensity={1} /> {/* "Słońce" */}

        {/* === Tło === */}
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
        />

        {/* === Obiekty === */}
        <Earth />

        {/* === Nasze Satelity === */}
        {satellites.map(sat => (
          <Satellite 
            key={sat.id} 
            position={sat.position} 
            status={sat.status} 
          />
        ))}

        {/* === Sterowanie === */}
        {/* Pozwala obracać sceną za pomocą myszki */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
        
      </Suspense>
    </Canvas>
  );
};

export default SpaceScene;
