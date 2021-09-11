const ORM = require("./orm");
const { TABLESNAME } = require('../config/const.config')


class Country {
  constructor() {
    try {
      this.orm = new ORM(TABLESNAME.country);
    } catch (error) {console.log(error)}
  }

  findAll(params) {
    return this.orm.findAll(params);
  }

  findByPk(params) {
    return this.orm.findByPk(params);
  }

  findOne(params) {
    return this.orm.findOne(params);
  }
}

module.exports = Country;
