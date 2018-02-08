var express = require('express');
var router = express.Router();
const exchangeController = require('../controllers/ExchangeController')
const csv = require('csv-express')

router.get('/btc_one_minute', function(req, res, next) {
  exchangeController.fetchHistoricalPrices(exchangeController.intervals.minute, exchangeController.products.btc).then(data => res.csv(data, true))
})

router.get('/crypto/:crypto/:interval', (req, res) => {
  let interval = req.params["interval"]
  let crypto = req.params["crypto"]

  exchangeController.fetchHistoricalPrices(exchangeController.intervals[interval], exchangeController.products[crypto]).then(data => res.csv(data, true))
})

router.get('/', (req, res, next) => res.render("index", {title: "fourthman"}))


module.exports = router
