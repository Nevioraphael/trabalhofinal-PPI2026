const express = require('express');
const cors = require('cors');
const path = require('path');

// 1. FIRST: Create the app
const app = express();

// 2. THEN: Set up middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// 3. THEN: Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// 4. THEN: Mount route modules
const pessoaRoutes = require('./routes/pessoa');
const imovelRoutes = require('./routes/imovel');

app.use('/pessoa', pessoaRoutes);
app.use('/imoveis', imovelRoutes);

// 5. FINALLY: Start server
app.listen(3000, () => console.log('Rodando em http://localhost:3000'));