const car = require('../pkg/carModel/carSchema')
const brand = require('../pkg/brandModel/brandSchema')

exports.create = async (req, res) => {
    try {
        const carModel = await car.create(req.body)
        const find = req.body.company
        let carBrand = await brand.findOne({ name: find })
        if (!carBrand) {
            carBrand = await brand.create({ name: find, models: [carModel._id] })
            res.status(201).json({ status: 'success', data: { carModel } })
        } else {
            carBrand.models.push(carModel._id)
            await carBrand.save()
            res.status(201).json({ status: 'success', data: { carModel } })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err })
    }
}
exports.get = async (req, res) => {
    try {
        const carModel = await car.find()
        res.status(200).json({ status: 'success', data: { carModel } })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err })
    }
}