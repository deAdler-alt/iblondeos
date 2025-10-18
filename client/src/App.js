// client/src/App.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css'; 
import SpaceScene from './components/SpaceScene';
import Sidebar from './components/Sidebar';

// --- NOWE IMPORTY ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import stylów CSS dla toastów

const SOCKET_SERVER_URL = "http://localhost:3001";
const socket = io(SOCKET_SERVER_URL);

function App() {
  const [satellites, setSatellites] = useState([]);
  const [selectedSatId, setSelectedSatId] = useState(null); 

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
      
      // --- NOWA AKCJA ---
      // Wywołujemy powiadomienie "toast"
      // Używamy typu 'warn' (ostrzeżenie), który jest pomarańczowy
      toast.warn(alertData.message, {
        position: "top-right",
        autoClose: 5000, // Zamknij po 5 sekundach
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", // Użyj ciemnego motywu!
      });
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
    <div className="app-container">
      
      <header className="app-header">
        <h1>iBlondeOS Orbital Shield</h1>
      </header>

      <main className="main-content">
        <SpaceScene 
          satellites={satellites} 
          selectedSatId={selectedSatId}
          setSelectedSatId={setSelectedSatId}
        />
      </main>

      <aside className="sidebar">
        <Sidebar 
          satellites={satellites} 
          selectedSatId={selectedSatId}
          setSelectedSatId={setSelectedSatId}
        />
      </aside>

      {/* --- NOWY KOMPONENT --- */}
      {/* Ten komponent musi być gdzieś w drzewie DOM, 
          ale sam renderuje się w odpowiednim rogu ekranu */}
      <ToastContainer />

    </div>
  );
}

export default App;
