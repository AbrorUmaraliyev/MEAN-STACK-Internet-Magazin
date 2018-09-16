const router = require('express').Router();
const multer = require('multer');
const Product = require('../models/product');
const  path  = require('path');
const chekJWT = require('../middlewares/check-jwt');

//Set Storage EngineF:\Projects\New folder\Amazon\client\src\assets\img2\uploads
const storage = multer.diskStorage({
    destination: 'F://Projects//New folder//Amazon//client//src//assets//img2//uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

//Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('images');

//Check File Type
function checkFileType(file, cb) {
    //Allowed ext
    const filetypes = /jpg|jpeg|png|mp4|avi|mp3|mkv/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimeType = filetypes.test(file.mimetype);

    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb('Error:Selected not right');
    }
}

router.route('/products')
    .get(chekJWT, (req, res, next) => {
        Product.find({ owner: req.decoded.user._id })
            .populate('owner')
            .populate('category')
            .exec((err, products) => {
                if (products) {
                    res.json({
                        success: true,
                        message: 'Products',
                        products: products
                    })
                }
            })
    })
    .post([chekJWT , upload], (req, res, next) => {
        let product = new Product();
        product.owner = req.decoded.user._id;
        product.category = req.body.categoryId;
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.images = req.file.filename;
        product.save();
        res.json({
            success: true,
            message: 'Successfull Added to the Products'
        })
    })

module.exports = router;
/**
 *
 *  router.post('/classes/:id/lessons/new', upload,ensureAuthenticated,function (req,res,next) {
    var info =[];
    info['class_id']      = req.params.id;
    info['lesson_number'] = req.body.lesson_number;
    info['lesson_title']  = req.body.lesson_title;
    info['lesson_body']   = req.body.lesson_body;
    info['lesson_file']   = req.file.filename;

    Class.AddLesson(info,function (err,lesson) {
        console.log('Dars qoshildi');
        console.log(lesson);
    });
    req.flash('succes' , 'Dars muvaffaqiyatli tarzda qoshildi');
    res.redirect('/instructors/classes');

});
 */
