const Vehicle = require('../api/controllers/vehiclesController')
const express = require('express')
const router = express.Router()
const {
    vehicleForm,
    vehicleUpdateForm
} = require('../middleware/input-validation')
const {
    authenticateJWT
} = require('../middleware/authentication')

router.post('/vehicles', vehicleForm, authenticateJWT, Vehicle.create)
router.get('/vehicles', authenticateJWT, Vehicle.getAll)
router.get('/vehicles/:id', authenticateJWT, Vehicle.getById)
router.delete('/vehicles', authenticateJWT, Vehicle.deleteAll)
router.delete('/vehicles/:id', authenticateJWT, Vehicle.deleteById)
router.put('/vehicles/:id', vehicleUpdateForm, authenticateJWT, Vehicle.update)

module.exports = router