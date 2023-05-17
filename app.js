const express = require('express')
const db = require('./pkg/database/index');
const app = express()
const brandHandler = require('./handlers/brandHandler')
const carHandler = require('./handlers/carHandler')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

db.init();

app.route('/brand').get(brandHandler.get).post(brandHandler.create)
app.route('/car').get(carHandler.get).post(carHandler.create)

app.listen(process.env.PORT, err => {
    if (err) return console.log(err);
    console.log('Service Started');
})