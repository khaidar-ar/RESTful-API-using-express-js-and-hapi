const Member = require('../api/controllers/memberController')
const express = require('express')
const router = express.Router()
const {
    memberForm
} = require('../middleware/input-validation')
const {
    authenticateJWT
} = require('../middleware/authentication')

router.post('/member', authenticateJWT, memberForm, Member.create)
router.get('/member', authenticateJWT, Member.getAll)
router.get('/member/:id', authenticateJWT, Member.getById)
router.delete('/member', authenticateJWT, Member.deleteAll)
router.delete('/member/:id', authenticateJWT, Member.deleteById)


module.exports = router