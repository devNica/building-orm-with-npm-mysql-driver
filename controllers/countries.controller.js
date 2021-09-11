const Country = require("../models/country.model");
const ORM = require("../models/orm");
const countryController = {};

const CountryModel = new Country();

countryController.findAll = async (_, res) => {
  try {
    let countries = await CountryModel.findAll({
      options: { limit: "10, 10", orderby: "country", sort: "ASC" },
      attributes: ["id", "alpha3code"],
    });
    res.send({ countries });
  } catch (error) {
    res.send({ error });
  }
};

countryController.findById = async (req, res) => {
  try {
    console.log(req.params);
    let countries = await CountryModel.findByPk(Number(req.params.id));
    res.send({ countries });
  } catch (error) {
    res.send({ error });
  }
};

countryController.findByCountryName = async (req, res) => {
  try {
    let name = req.params.name;

    let country = await CountryModel.findAll({
      where: { country: name },
      attributes: { exclude: ["id", "callingcodes"] },
    });

    res.send({ country });
  } catch (error) {
    res.send({ error });
  }
};

countryController.RelatedToUser = async (req, res) => {
  try {
    let orm = new ORM();

    let relatedUsers = await orm.query(`
        SELECT

        country.country,
        usr.username

        FROM country
        INNER JOIN person on person.fk_country = country.id
        INNER JOIN employee on employee.fk_person = person.id
        INNER JOIN user as usr on usr.fk_employee = employee.id
        where 1
        `);

    res.send({ relatedUsers });
  } catch (error) {
    res.send({ error });
  }
};

module.exports = countryController;
