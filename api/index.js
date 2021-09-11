const countryRouter = require('./routes/countries.routes')
const {BASEAPI} = require('../config/const.config')

const api_routes = () => {
    
    return [
        { path: `${BASEAPI}/country`, controller: countryRouter },
    ]
}

module.exports = {
    api_routes
}