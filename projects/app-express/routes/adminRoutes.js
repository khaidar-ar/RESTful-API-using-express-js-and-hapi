const admin = require('../api/controllers/adminController')
const express = require('express')
const router = express.Router()
const {
    loginValidation,
    adminForm
} = require('../middleware/input-validation')

router.post('/admin', adminForm, admin.create)
router.get('/admin', admin.getAll)
router.post('/admin/login', loginValidation, admin.login)
router.delete('/admin', admin.deleteAll)

module.exports = router