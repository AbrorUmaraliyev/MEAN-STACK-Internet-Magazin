const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('./config');

mongoose.connect(config.database, (err) => {
    if (err) {
        console.log("Error from Amazon's database !");
    }
    else {
        console.log("Connected to the Amazon's database!");
    }
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routers'
const userRoutes = require('./routes/account');
const categoryRoutes = require('./routes/categoryRouter');
const sellerRoutes = require('./routes/seller');
const productSearchRoutes = require('./routes/product-search');

app.use('/api/accounts', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/search',productSearchRoutes);
//Port and Ip Adress
app.listen(config.port, (err) => {
    if (err) {
        console.log('This is port already running !' + err);
    }
    else {
        console.log('This is port listenning !' + config.port);
    }
})