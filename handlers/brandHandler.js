const brand = require('../pkg/brandModel/brandSchema');

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