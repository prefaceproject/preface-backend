const mongoose = require('mongoose')

module.exports = (url, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}
