const Owner = require('../api/controllers/ownerController')
const express = require('express')
const router = express.Router()
const {
    authenticateJWT
} = require('../middleware/authentication')

router.post('/owner', authenticateJWT, Owner.create)
router.get('/owners', authenticateJWT, Owner.getAll)
router.get('/owners/:id', authenticateJWT, Owner.getByIdMember)
router.delete('/owners', authenticateJWT, Owner.deleteAll)
router.delete('/owners/:id', authenticateJWT, Owner.deleteById)


module.exports = router