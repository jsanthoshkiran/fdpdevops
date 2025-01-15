const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => {
  const { a, b } = req.query;
  const result = parseFloat(a) + parseFloat(b);
  res.json({ result });
});

router.get('/subtract', (req, res) => {
  const { a, b } = req.query;
  const result = parseFloat(a) - parseFloat(b);
  res.json({ result });
});

router.get('/multiply', (req, res) => {
  const { a, b } = req.query;
  const result = parseFloat(a) * parseFloat(b);
  res.json({ result });
});

router.get('/divide', (req, res) => {
  const { a, b } = req.query;
  const result = parseFloat(a) / parseFloat(b);
  res.json({ result });
});

module.exports = router;