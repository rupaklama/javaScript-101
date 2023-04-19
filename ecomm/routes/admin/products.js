const express = require('express');
const { check, validationResult } = require('express-validator');

const multer = require('multer');

const productsRepo = require('../../repositories/products');
const newProductTemplate = require('../../views/admin/products/newProduct');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req, res) => {
  res.status(200).send('products!');
});

router.get('/admin/products/new', (req, res) => {
  res.status(200).send(newProductTemplate({}));
});

router.post(
  '/admin/products/new',

  // note - this needs to come before all below middleware
  upload.single('image'),

  [
    check('title').trim().isLength({ min: 5, max: 40 }).withMessage('Must be between 5 and 40 characters'),
    check('price')
      .trim()
      // parse string value  to float
      .toFloat()
      // if the number is float, the min value must be at least 1
      .isFloat({ min: 1 })
      .withMessage('Must be a number greater than 1'),
    check('image'),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(newProductTemplate({ errors }));
    }

    // base64 - safely represents image in string format
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });

    res.status(201).send('submitted!');
  }
);

module.exports = router;
