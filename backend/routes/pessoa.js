const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM pessoa', (err, result) => res.json(result));
});

router.post('/', (req, res) => {
  const { pes_cpf, pes_nome, pes_telefone, pes_email } = req.body;
  db.query(
    'INSERT INTO pessoa VALUES (?, ?, ?, ?)',
    [pes_cpf, pes_nome, pes_telefone, pes_email],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensagem: 'Pessoa cadastrada!' });
    }
  );
});

router.put('/:cpf', (req, res) => {
  const { pes_nome, pes_telefone, pes_email } = req.body;
  db.query(
    'UPDATE pessoa SET pes_nome=?, pes_telefone=?, pes_email=? WHERE pes_cpf=?',
    [pes_nome, pes_telefone, pes_email, req.params.cpf],
    () => res.json({ mensagem: 'Atualizado!' })
  );
});

router.delete('/:cpf', (req, res) => {
  db.query('DELETE FROM pessoa WHERE pes_cpf=?', [req.params.cpf], () =>
    res.json({ mensagem: 'Deletado!' })
  );
});

router.get('/:cpf/imoveis', (req, res) => {
  db.query(
    'SELECT * FROM imovel WHERE pes_cpf=?',
    [req.params.cpf],
    (err, result) => res.json(result)
  );
});

module.exports = router;
