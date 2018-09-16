const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
const async = require('async');
const Review = require('../models/review');
const checkJWT = require('../middlewares/check-jwt');

router.get('/products', (req, res, next) => {
    const perPage = 10;
    const page = req.query.page;
    async.parallel([
        function (callback) {
            Product.count({}, (err, count) => {
                var totalProducts = count;
                callback(err, totalProducts);
            })
        },
        function (callback) {
            Product.find({})
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('owner')
                .exec((err, products) => {
                    if (err) return next(err);
                    callback(err, products);
                })
        },
    ], function (err, results) {
        var totalProducts = results[0];
        var products = results[1];
        res.json({
            success: true,
            message: 'category',
            products: products,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage)
        });
    });
})

router.route('/categories')
    .get((req, res, next) => {
        Category.find({}, (err, category) => {
            res.json({
                success: true,
                message: "Successfull",
                categories: category
            })
        })
    })
    .post((req, res, next) => {
        let category = new Category();
        category.name = req.body.category;
        category.save();
        res.json({
            success: true,
            message: 'Successfull',
            category: category
        })
    })

router.get('/categories/:id', (req, res, next) => {
    const perPage = 10;
    const page = req.query.page;


    async.parallel([
        function (callback) {
            Product.count({ category: req.params.id }, (err, count) => {
                var totalProducts = count;
                callback(err, totalProducts);
            })
        },
        function (callback) {
            Product.find({ category: req.params.id })
                .skip(perPage * page)
                .limit(perPage)
                .populate('category')
                .populate('owner')
                .populate('review')
                .exec((err, products) => {
                    if (err) return next(err);
                    callback(err, products);
                })
        },
        function (callback) {
            Category.findOne({ _id: req.params.id }, (err, category) => {
                callback(err, category);
            });
        }
    ], function (err, results) {
        var totalProducts = results[0];
        var products = results[1];
        var category = results[2];
        res.json({
            success: true,
            message: 'category',
            products: products,
            categoryName: category.name,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage)
        });
    });
})

router.get('/product/:id', (req, res, next) => {
    Product.findById({ _id: req.params.id })
        .populate('category')
        .populate('owner')
        .deepPopulate('reviews.owner')
        .exec((err, product) => {
            if (err) {
                res.json({
                    success: true,
                    message: 'Product is not defined'
                })
            } else {
                if (product) {
                    res.json({
                        success: true,
                        product: product
                    })
                }
            }
        })
});

router.post('/review', checkJWT, (req, res, next) => {
    async.waterfall([
        function (callback) {
            Product.findOne({ _id: req.body.productId }, (err, product) => {
                if (product) {
                    callback(err, product);
                }
            });
        },
        function (product) {
            let review = new Review();

            review.owner = req.decoded.user._id;

            if (req.body.title) review.title = req.body.title;
            if (req.body.description) review.description = req.body.description;
            review.rating = req.body.rating;
            product.reviews.push(review._id);
            product.save();
            review.save();
            res.json({
                success: true,
                message: 'Successfully added the review'
            });
        }
    ])
});

module.exports = router;