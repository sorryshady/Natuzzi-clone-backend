require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./configs/config')

const DB_URI = config.mongoose.url

// mongoose
//   .connect(`${DB_URI}`)
//   .then(() => console.log('Connected to DB at: ', DB_URI))
//   .catch((error) => console.log('Failed to connect to DB: ', error))

app.listen(config.port, () => {
  console.log('Server listening at PORT: ', config.port)
})
