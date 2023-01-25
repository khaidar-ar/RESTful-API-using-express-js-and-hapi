const Vehicle = require('../models/vehicles')
const {
    validationResult
} = require('express-validator')
const create = async (req, res) => {

    /* #swagger.tags=['Create New Vehicle']
    #swagger.description = 'Endpoint pembuatan data kendaraan baru'
    #swagger.summary = 'Query INSERT to Vehicle table' */
    /* #swagger.parameters['body']={
        name:'create',
        in:'body',
        description:'Endpoint pembuatan data kendaraan baru dengan request body berupa: nopol,merk,tipe,tahun, dan kubikasi',
        required:true,
        schema:{$ref:'#definitions/VehicleInsertRequestFormat'}
    }*/
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    try {
        const data = req.body
        await Vehicle.insertVehicle(data).returning(['nopol', 'merk']).then(async v => {
            res.status(200).json({
                success: true,
                message: 'Data Kendaraan Berhasil Terdaftar',
                data: {
                    nopol: v.nopol,
                    merk: v.merk,
                    tipe: v.tipe,
                    tahun: v.tahun,
                    kubikasi: v.kubikasi + 'cc'
                }
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

const getAll = async (req, res) => {
    /* #swagger.tags=['Display All Vehicles Data'] 
    #swagger.description = 'Endpoint untuk menampilkan keseluruhan data kendaraan'
    #swagger.summary = 'Query SELECT to Vehicle table'*/
    try {
        const result = await Vehicle.getVehicles()
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Data Berhasil Ditemukan',
                data: result
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data Tidak Ditemukan'
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

    /* #swagger.tags=['Display Vehicle Data By ID'] 
    #swagger.description = 'Endpoint untuk menampilkan data kendaraan berdasarkan ID'
    #swagger.summary = 'Query SELECT {id} to Vehicle table'*/
    try {
        const {
            id
        } = req.params
        const result = await Vehicle.getById(id)
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

    /* #swagger.tags=['Delete Vehicle Data By ID'] 
    #swagger.description = 'Endpoint untuk menghapus data kendaraan menurut ID'
    #swagger.summary = 'Query DELETE {id} to Vehicle table'*/
    try {
        const {
            id
        } = req.params
        const result = await Vehicle.deleteById(id)
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

    /* #swagger.tags=['Delete All Vehicles Data'] 
    #swagger.description = 'Endpoint untuk menghapus seluruh data kendaraan'
    #swagger.summary = 'Query DELETE to Vehicle table'*/
    try {
        const check = await Vehicle.getVehicles()
        if (check.length > 0) {
            await Vehicle.delete()
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

const update = async (req, res) => {

    /* #swagger.tags=['Update Vehicle Data By ID'] 
    #swagger.description = 'Endpoint untuk memperbarui data kendaraan'
    #swagger.summary= 'Query UPDATE {id} to Vehicle table'
    */
    /*#swagger.parameters['body']={
        in:'body',
        name:'update',
        description:'Endpoint perubahan data kendaraan dengan request body berupa : nopol, merk, tipe',
        required:true,
        schema:{$ref:'#definitions/VehicleUpdateRequestFormat'}
    } */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    try {
        const {
            id
        } = req.params
        const data = req.body

        const isDuplicate = await Vehicle.checkDuplication('nopol', data.nopol, id).then(d => {
            console.log('Data sudah ada pada baris ', d)
            return d
        }).catch(e => {
            console.log('error', e)
            return e
        })
        console.log('Duplikasi data :', isDuplicate)
        if (isDuplicate.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Nopol sudah terdaftar'
            })
        } else {
            await Vehicle.update(data, id).returning(['nopol', 'merk']).first().then(resp => {
                console.log(resp)
                res.status(200).json({
                    success: true,
                    message: `Data dengan id : ${id}, berhasil dirubah`,
                    data: resp
                })
            }).catch(e => console.log(e))
            res.status(500).json({
                success: false,
                message: 'Data gagal diperbarui'
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
    update
}