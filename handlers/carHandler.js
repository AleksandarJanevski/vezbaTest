const car = require('../pkg/carModel/carSchema');
const brand = require('../pkg/brandModel/brandSchema');

exports.create = async (req, res) => {
    try {
        const carModel = await car.create(req.body);
        const find = req.body.company;
        let carBrand = await brand.findOne({ name: find });
        if (!carBrand) {
            carBrand = await brand.create({ name: find, models: [carModel._id] });
            res.status(201).json({ status: 'success', data: { carModel } });
        } else {
            carBrand.models.push(carModel._id);
            await carBrand.save();
            res.status(201).json({ status: 'success', data: { carModel } });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.get = async (req, res) => {
    try {
        const carModel = await car.find();
        res.status(200).json({ status: 'success', data: { carModel } });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.update = async (req, res) => {
    try {
        const carModel = await car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({ status: 'success', data: { carModel } });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.delete = async (req, res) => {
    try {
        const carModel = await car.findById(req.params.id)
        const carBrand = await brand.findOne({ name: carModel.company })
        carBrand.models = carBrand.models.filter(element => element !== req.params._id)
        await carBrand.save()
        await car.findByIdAndDelete(req.params.id)
        res.status(204).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
}