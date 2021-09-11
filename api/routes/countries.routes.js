const router = require('express').Router()
const countryController = require('../../controllers/countries.controller')

router.get('/all', countryController.findAll)
router.get('/only/:id', countryController.findById)
router.get('/related-users', countryController.RelatedToUser)
router.get('/name/:name', countryController.findByCountryName)


module.exports = router