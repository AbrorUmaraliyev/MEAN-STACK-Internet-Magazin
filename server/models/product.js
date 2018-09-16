const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    images: String,
    title: String,
    description: String,
    price: Number,
    created: { type: Date, default: Date.now }
},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

productSchema
    .virtual('averageRating')
    .get(function () {
        var rating = 0;
        if (this.reviews.length == 0) {
            rating = 0;
        } else {
            this.reviews.map((review) => {
                rating += review.rating;
            });
            rating = rating / this.reviews.length;
        }
        return rating;
    })

productSchema.plugin(deepPopulate);

module.exports = mongoose.model('Product', productSchema);