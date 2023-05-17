const brand = require('../pkg/brandModel/brandSchema');
const car = require('../pkg/carModel/carSchema')

exports.create = async (req, res) => {
    try {
        const carBrand = await brand.create(req.body);
        res.status(201).json({ status: 'success', data: { carBrand } });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.get = async (req, res) => {
    try {
        const carBrand = await brand.find().populate('models');
        res.status(200).json({ status: 'success', data: { carBrand } });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.update = async (req, res) => {
    try {
        const carBrand = await brand.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({ status: 'success', data: { carBrand } });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.delete = async (req, res) => {
    try {
        const carBrand = await brand.findById(req.params.id)
        await car.deleteMany({ company: carBrand.name })
        await brand.findByIdAndDelete(req.params.id)
        res.status(204).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
}