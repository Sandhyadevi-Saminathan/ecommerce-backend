const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv").config();

app.use(express.json());

app.use(cors({
        origin: "https://verdant-sundae-4424c8.netlify.app"
    }))

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use the route files
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(process.env.PORT || 8000);