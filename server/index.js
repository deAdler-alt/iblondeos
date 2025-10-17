const express = require('express');
const cors = require('cors');

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server iBlondeOS!');
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
