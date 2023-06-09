const express = require('express');
const router = express.Router();

router.post('/cart/products', (req, res) => {
  // console.log(req.body.productId);

  res.status(200).send('Product added to cart');
});

module.exports = router;
