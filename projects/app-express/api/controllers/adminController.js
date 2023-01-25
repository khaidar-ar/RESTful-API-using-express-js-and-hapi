const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const {
    validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {

    /* #swagger.tags =['Login Administrator'] 
        #swagger.description = 'Login Administrator E-samsat API'
    */
    /* #swagger.parameters['body']={
     name:'login',
     in :'body',
     description:'login member only',
     required:true,
     schema:{$ref:'#definitions/LoginRequestFormat'}
    } */

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    try {
        const data = req.body
        const email = data.email
        const password = data.password

        const result = await Admin.dataIsExist('email', email)
        console.log('DATA : ', result.length)
        if (result.length > 0) {
            const result_data = result[0]
            await bcrypt.compare(password, result_data.password)
                .then(async auth => {
                    if (!auth) {
                        res.status(400).json({
                            success: false,
                            message: 'Invalid password'
                        })
                    } else {
                        const result_jwt = {
                            nama: result_data.nama,
                        }
                        const jwt_token = jwt.sign(result_jwt, process.env.API_SECRET, {
                            expiresIn: '10m'
                        })
                        res.status(200).json({
                            success: true,
                            message: 'Login Success',
                            data: result_jwt,
                            jwt_token
                        })
                        console.log(auth)
                    }
                })
        } else {
            res.status(400).json({
                success: false,
                message: 'Nama atau password tidak terdaftar'
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })

    }

}

const create = async (req, res) => {
    /*
    #swagger.tags=['Create New Admin Data']
    #swagger.description = 'Endpoint pembuatan data admin baru' 
    */
    /* 
    #swagger.parameters['body']={
     name:'create',
     in :'body',
     description:'Create new admin',
     required:true,
     schema:{$ref:'#definitions/AdminRequestFormat'}
    } */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    try {

        const data = req.body
        bcrypt.hash(data.password, 10)
            .then(async e => {
                await Admin.addAdmin(data, e)
                    .returning(['nama', 'email', 'password'])
                    .then(async v => {
                        res.status(200).json({
                            success: true,
                            message: 'Data Admin Berhasil Terdaftar',
                            data: {
                                nama: v.nama,
                                email: v.email,
                                password: e
                            }
                        })
                    })
                    .catch(err => {
                        console.log('ERR: ', err)
                        res.status(400).json({
                            success: false,
                            message: `Registrasi Gagal`
                        })
                    })
            })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}

const getAll = async (req, res) => {
    /* #swagger.tags=['Display All Admin']
    #swagger.description='Menampilkan data seluruh admin'
    */
    try {
        let admin = await Admin.getAll()
        if (admin.length > 0) {
            res.status(200).json({
                success: true,
                message: admin
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Tabel kosong, DATA TIDAK DITEMUKAN!'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}
const deleteAll = async (req, res) => {
    /*#swagger.tags=['Delete All Admin Data']
    #swagger.description='Endpoint untuk menghapus seluruh data admin'
    */
    try {
        const check = await Admin.getAll()
        if (check.length > 0) {
            await Admin.delete()
            res.status(200).json({
                success: true,
                message: 'Berhasil menghapus seluruh data admin'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Tabel kosong,  TIDAK DAPAT MENGHAPUS DATA!'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}


module.exports = {
    login,
    create,
    getAll,
    deleteAll
}