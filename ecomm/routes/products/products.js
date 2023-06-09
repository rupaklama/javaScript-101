const express = require('express');
const router = express.Router();

const productsRepo = require('../../repositories/products');
const productsIndexTemplate = require('../../views/products');

router.get('/', async (req, res) => {
  const products = await productsRepo.getAll();

  res.status(200).send(productsIndexTemplate({ products }));
});

module.exports = router;
