const mongoose = require('mongoose');
const brand = require('../brandModel/brandSchema');

const carSchema = new mongoose.Schema({
    name: String,
    company: String,
    year: Number
});

// carSchema.pre('save', async function (next) {
//     try {
//         const company = this.company
//         const carBrand = await brand.findOne({ company })
//         if (!carBrand) {
//             return new Error('please create the brand before the model')
//         }
//         console.log(this._id);
//         carBrand.models.push(this._id)
//         await carBrand.save()
//         next()
//     } catch (err) {
//         next(err)
//     }
// })
const car = mongoose.model('car', carSchema);

module.exports = car;