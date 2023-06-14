const express = require('express');
const router = express.Router();

const cartsRepo = require('../../repositories/carts');
const productsRepo = require('../../repositories/products');
const chartShowTemplate = require('../../views/carts/showCart');

router.post('/cart/products', async (req, res) => {
  // console.log(req.body.productId);
  let cart;
  if (!req.session.cartId) {
    // On new session, create the cart & store the cart id into cookie
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }
  const existingItem = cart.items.find((item) => item.id === req.body.productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, { items: cart.items });
  res.status(200).redirect('/cart');
});

router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }
  const cart = await cartsRepo.getOne(req.session.cartId);
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }
  res.status(200).send(chartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async (req, res) => {
  const { itemId } = req.body;

  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items });

  res.status(200).redirect('/cart');
});

module.exports = router;
