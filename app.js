const express = require('express');
const db = require('./pkg/database/index');
const app = express();
const brandHandler = require('./handlers/brandHandler');
const carHandler = require('./handlers/carHandler');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.init();

app.route('/brand').get(brandHandler.get).post(brandHandler.create);
app.route('/brand:id').patch(brandHandler.update).delete(brandHandler.delete)
app.route('/car').get(carHandler.get).post(carHandler.create);
app.route('/car/:id').patch(carHandler.update).delete(carHandler.delete)

app.listen(process.env.PORT, err => {
    if (err) return console.log(err);
    console.log('Service Started');
});