const express = require('express');
const { check, validationResult } = require('express-validator');

const multer = require('multer');

const productsRepo = require('../../repositories/products');
const newProductTemplate = require('../../views/admin/products/newProduct');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/editProduct');
const { requireAuth } = require('../../views/admin/middlewares');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
  // if (!req.session.userId) {
  //   return res.redirect('/users/signin');
  // }

  const products = await productsRepo.getAll();

  res.status(200).send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
  res.status(200).send(newProductTemplate({}));
});

router.post(
  '/admin/products/new',

  requireAuth,

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

    res.status(201).redirect('/admin/products');
  }
);

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
  const product = await productsRepo.getOne(req.params.id);

  if (!product) {
    res.status(404).send('Product not found');
  }
  res.status(200).send(productsEditTemplate({ product }));
});

router.post(
  '/admin/products/:id/edit',
  requireAuth,
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
    const updatedProduct = req.body;

    if (req.file) {
      // base64 - safely represents image in string format
      updatedProduct.image = req.file.buffer.toString('base64');
    }

    try {
      await productsRepo.update(req.params.id, updatedProduct);
    } catch (err) {
      return res.status(404).send('Product not found');
    }

    res.redirect('/admin/products');
  }
);

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
  await productsRepo.delete(req.params.id);

  res.redirect('/admin/products');
});

module.exports = router;
