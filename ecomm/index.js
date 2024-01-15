const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/adminProducts');
const productsRouter = require('./routes/products/products');
const cartsRouter = require('./routes/carts/carts');

const app = express();

// server public dir in our root dir to the browser
// Middleware to server Static files from local directory
app.use(express.static(`${__dirname}/public`));
// app.use(express.static('public'));

// note - urlencoded({ extended: true } meaning form data being send as url query string format, not as raw data
// enctype="multipart/form-data": to transfer raw data from the file such as image into safe url strings
// "multipart/form-data" meaning multiple part of form data being send as raw file data
// note: "multipart/form-data" will not work with default urlencoded({}) because
// the body parser only cares url encoded query string format but not raw data. Images, video etc contains raw data.
// To fix this issue, need to use middleware that works with "multipart/form-data" such as 'Multer' to convert
// 'raw image/video data' into 'Buffer data' with Bytes. Then, convert all bits in Bytes into string characters.
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

app.use(
  cookieSession({
    // 'keys' property, a value of random string to encrypt user data inside the cookie for safety
    // note - this will encrypt user id data inside cookie with this array of string
    keys: ['lkasld235jaddfdfdfd23433434'],
  })
);

app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(3002, () => {
  console.log('Listening @ 3002');
});
