const {
    check
} = require('express-validator')


const loginValidation = [
    check('email', 'email tidak tidak valid').isEmail(),
    check('password', 'password tidak boleh kosong').not().isEmpty()
]

const adminForm = [
    check('nama', 'Nama tidak boleh kosong').not().isEmpty(),
    check('email', 'email tidak tidak valid').not().notEmpty(),
    check('password', 'password minimum 5 digit').isLength({
        min: 5
    })
]

const vehicleForm = [
    check('nopol', 'nopol minimul 5 digit').isLength({
        min: 5
    }),
    check('merk', 'merk tidak boleh kosong').not().isEmpty(),
    check('tipe', 'tipe tidak boleh kosong').not().isEmpty(),
    check('tahun', 'tahun tidak boleh kosong').not().isEmpty(),
    check('kubikasi', 'kubikasi tidak boleh kosong').not().isEmpty()
]
const vehicleUpdateForm = [
    check('nopol', 'nopol minimal 5 digit').isLength({
        min: 5
    }),
    check('merk', 'merk tidak boleh kosong').not().isEmpty(),
    check('tipe', 'tipe tidak boleh kosong').not().isEmpty(),
]

const memberForm = [
    check('nama', 'nama tidak boleh kosong').not().isEmpty(),
    check('alamat', 'alamat tidak boleh kosong').not().isEmpty(),
]

module.exports = {
    loginValidation,
    adminForm,
    vehicleForm,
    vehicleUpdateForm,
    memberForm
}