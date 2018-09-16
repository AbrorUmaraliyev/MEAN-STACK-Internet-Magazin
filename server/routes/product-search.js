const router = require('express').Router();
const Product = require('../models/product');
const async = require('async');

/*router.get('/',(req,res,next)=>{
var query=req.query.query    
        Product.find({
        $text:{
            $search:query
        }
    },function(err,data){
        res.json(data);
    })
    
});
*/
/*
router.get('/', (req, res, next) => {
 if(req.query.query){
     Product.find({
         $text:{
             $search:req.query.query
         }
     },(err,content)=>{
         res.json({
             success : true,
             message : "Here is your search",
             status : 200,
             content : content,
             search_result : req.query.query
         });
     });
 }
})*/
/*router.get('/', (req, res, next) => {
    async.waterfall([
        function (callback) {
            Product.aggregate([
                {
                    $project:
                        {
                            title: { $toLower: "$title" },
                            description: { $toLower: "$description" }
                        }
                }
            ])
        },
        function (query) {
            if (req.query.query) {
                Product.find({
                    title: {
                        $regex: new RegExp(req.query.query)
                    }
                }, (err, content) => {
                    res.json({
                        success: true,
                        message: "Here is your search",
                        status: 200,
                        content: content,
                        search_result: req.query.query
                    });
                });
            }
        }
    ])
})*/
/*router.get('/', (req, res, next) => {
    if(req.query.query){
        Product.aggregate([
            {
                $project:
                  {
                    title: { $toLower: "$title" },
                    description: { $toLower: "$description" }
                  }
              }
        ])
        Product.find({
            title:{
                $regex: new RegExp(req.query.query)
            }
        
        },(err,content)=>{
            res.json({
                success : true,
                message : "Here is your search",
                status : 200,
                content : content,
                search_result : req.query.query
            });
        });
    }
   })
*/

router.get('/', (req, res, next) => {
    if(req.query.query){
        Product.find({
            title:{
                $regex: new RegExp(req.query.query,req.query.page),
                $options :'i'
            }
        },(err,content)=>{
            res.json({
                success : true,
                message : "Here is your search",
                status : 200,
                content : content,
                search_result : req.query.query
            });
        });
    }
   })
module.exports = router;

