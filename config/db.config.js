require('dotenv').config()

const user = process.env.DBUSER
const password = process.env.DBPASSWORD
const database = process.env.DBNAME
const host = process.env.DBHOST
const enviroment = process.env.NODE_ENVIROMENT
const dialect = process.env.DBDIALECT

const config = {
    mysql: {
        development: {
            user,
            password,
            database,
            host,
            multipleStatements: true
        },
        test: {},
        production: {}
    },

    postgres: {
        development: {
            user,
            password,
            database,
            host,
            multipleStatements: true
        },
        test: {},
        production: {}
    }
}

module.exports = config[dialect][enviroment]