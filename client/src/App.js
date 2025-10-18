// client/src/App.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css'; // Importujemy nasz nowy layout CSS

// Importujemy nasze nowe komponenty
import SpaceScene from './components/SpaceScene';
import Sidebar from './components/Sidebar';

const SOCKET_SERVER_URL = "http://localhost:3001";
const socket = io(SOCKET_SERVER_URL);

function App() {
  const [satellites, setSatellites] = useState([]);

  useEffect(() => {
    socket.on('initial_state', (data) => {
      console.log('Received initial state:', data);
      setSatellites(data);
    });

    socket.on('state_update', (data) => {
      setSatellites(data);
    });

    socket.on('alert', (alertData) => {
      console.warn('--- NEW ALERT ---');
      console.warn(alertData.message);
      // W przyszłości możemy tu pokazać popup
    });

    socket.on('connect', () => console.log('Connected to backend socket! ID:', socket.id));
    socket.on('disconnect', () => console.log('Disconnected from backend socket.'));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('initial_state');
      socket.off('state_update');
      socket.off('alert');
    };
  }, []);

  return (
    // Używamy klas CSS z App.css do budowy layoutu
    <div className="app-container">
      
      <header className="app-header">
        <h1>iBlondeOS Orbital Shield</h1>
      </header>

      <main className="main-content">
        {/* Przekazujemy listę satelitów do komponentu 3D */}
        <SpaceScene satellites={satellites} />
      </main>

      <aside className="sidebar">
        {/* Przekazujemy listę satelitów do panelu bocznego */}
        <Sidebar satellites={satellites} />
      </aside>

    </div>
  );
}

export default App;
