const express2 = require('express');
const router2 = express2.Router();
const db2 = require('../db');

router2.get('/', (req, res) => {
  db2.query('SELECT * FROM imovel', (err, result) => res.json(result));
});

router2.post('/', (req, res) => {
  const { imo_titulo, imo_tipo, imo_valor, pes_cpf } = req.body;
  db2.query(
    'INSERT INTO imovel (imo_titulo, imo_tipo, imo_valor, pes_cpf) VALUES (?, ?, ?, ?)',
    [imo_titulo, imo_tipo, imo_valor, pes_cpf],
    () => res.json({ mensagem: 'Imóvel cadastrado!' })
  );
});

router2.put('/:id', (req, res) => {
  const { imo_titulo, imo_tipo, imo_valor, pes_cpf } = req.body;
  db2.query(
    'UPDATE imovel SET imo_titulo=?, imo_tipo=?, imo_valor=?, pes_cpf=? WHERE imo_id=?',
    [imo_titulo, imo_tipo, imo_valor, pes_cpf, req.params.id],
    () => res.json({ mensagem: 'Atualizado!' })
  );
});

router2.delete('/:id', (req, res) => {
  db2.query('DELETE FROM imovel WHERE imo_id=?', [req.params.id], () =>
    res.json({ mensagem: 'Deletado!' })
  );
});

module.exports = router2;