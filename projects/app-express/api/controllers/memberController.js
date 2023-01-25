const Member = require('../models/members')
const {
    validationResult
} = require('express-validator')
const create = async (req, res) => {
    /*#swagger.tags=['Create Member Data']
    #swagger.description='Endpoint pembuatan data member'
    #swagger.summary = 'Query INSERT to Member table' */
    /*#swagger.parameters['body']={
        name:'create',
        in:'body',
        description:'Endpoint pembuatan data member',
        required:true,
        schema:{$ref:'#definitions/MemberInsertRequestFormat'}
    } */
    /* #swagger.security = [{
           "bearerAuth": []
    }] */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    try {


        const data = req.body
        await Member.addMember(data)
            .returning(['nama', 'alamat'])
            .then(async v => {
                res.status(200).json({
                    success: true,
                    message: 'Data Member Berhasil Terdaftar',
                    data: {
                        nama: v.nama,
                        alamat: v.alamat,
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

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}

const getAll = async (req, res) => {
    /*#swagger.tags=['Get All Data Member']
    #swagger.description='Endpoint menampilkan keseluruhan data member' 
    #swagger.summary = 'Query SELECT to Member table'*/

    try {
        const member = await Member.getAll()
        if (member.length > 0) {
            res.status(200).json({
                success: true,
                data: member
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

const getById = async (req, res) => {
    /*#swagger.tags=['Get Data Member By ID']
    #swagger.description='Endpoint menampilkan data member berdasarkan ID' 
    #swagger.summary = 'Query SELEECT to Member table'*/

    try {
        const {
            id
        } = req.params
        const result = await Member.getById(id)
        if (result) {
            res.status(200).json({
                success: true,
                message: `Data dengan id : ${id}, berhasil ditemukan`,
                data: result
            })
        } else {
            res.status(400).json({
                success: false,
                message: `Tidak dapat menemukan data dengan id : ${id}`
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

const deleteById = async (req, res) => {
    /*#swagger.tags=['Delete Data Member By ID']
    #swagger.description='Endpoint menghapus keseluruhan data member'
    #swagger.summary = 'Query DELETE {id} to Member table' */

    try {
        const {
            id
        } = req.params
        const result = await Member.deleteById(id)
        if (result) {
            res.status(200).json({
                success: true,
                message: `Data dengan id : ${id}, berhasil dihapus`
            })
        } else {
            res.status(400).json({
                success: false,
                message: `Gagal menghapus data dengan id : ${id}`
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
    /*#swagger.tags=['Delete All Data Member']
    #swagger.description='Endpoint menghapus data member berdasarkan ID'
    #swagger.summary = 'Query DELETE to Member table' */

    try {
        const check = await Member.getAll()
        if (check.length > 0) {
            await Member.delete()
            res.status(200).json({
                success: true,
                message: 'Berhasil menghapus seluruh data kendaraan'
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
    create,
    getAll,
    getById,
    deleteAll,
    deleteById,
}