require('dotenv').config()
module.exports = {
    BASEAPI: process.env.BASEAPI || '/devnica/v1',
    TABLESNAME: {
        country: 'country'
    }
}