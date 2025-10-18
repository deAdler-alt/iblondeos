// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

// --- NOWOŚĆ: Importujemy nasze moduły ---
const { getSatellites } = require('./state');
const { startSimulator } = require('./simulator');

// --- Ustawienia (bez zmian) ---
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// --- Endpointy API (bez zmian) ---
app.get('/', (req, res) => {
  res.send('iBlondeOS Server is running! 🚀');
});

// --- Logika Socket.io ---
io.on('connection', (socket) => {
  console.log(`New operator connected: ${socket.id}`);

  // --- NOWOŚĆ: Wyślij nowemu klientowi PEŁEN aktualny stan ---
  // Dzieki temu klient od razu widzi dane, a nie czeka na następną aktualizację
  socket.emit('initial_state', getSatellites());

  socket.on('disconnect', () => {
    console.log(`Operator disconnected: ${socket.id}`);
  });
});

// --- Start serwera ---
server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

// --- NOWOŚĆ: Uruchom globalny symulator ---
// Przekazujemy mu 'io', żeby mógł emitować zdarzenia
startSimulator(io);
