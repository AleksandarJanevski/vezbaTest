const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: String,
    models: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'car'
        }
    ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

brandSchema.virtual('pozdrav').get(function () {
    return 'Pozdrav od ' + this.name + ' timot'
});

const brand = mongoose.model('brand', brandSchema);
module.exports = brand;