const Gdax = require('gdax')
const publicClient = new Gdax.PublicClient()

module.exports = {
  intervals: {
    minute: 60, 
    five_minute: 300, 
    fifteen_minute: 900, 
    hour: 3600,
    six_hour: 21600,
    twenty_four_hour: 86400,
  },

  products: {
    ltc: "LTC-USD",
    eth: "ETH-USD",
    btc: "BTC-USD"
  },

  fetchHistoricalPrices: (interval, product) => {
    return publicClient.getProductHistoricRates(product, { granularity: interval })
    .then(data => {
      return new Promise((resolve, reject) => {
        let prices = data.map(item => {

          var newDate = new Date()
          newDate.setTime(item[0] * 1000)
          dateString = newDate.toUTCString()

          return {
            "currency": product,
            "interval": `${interval} seconds`,
            "unix_timestamp": item[0],
            "time": dateString,
            "low": item[1],
            "high": item[2],
            "open": item[3],
            "close": item[4],
            "volume": item[5]
          }
        })

        resolve(prices)
      })
    })
  }
}