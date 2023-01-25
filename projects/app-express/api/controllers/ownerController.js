const Owner = require('../models/owners')
const Member = require('../models/members')


const create = async (req, res) => {
    /*#swagger.tags=['Create Owner Relations']
    #swagger.description='Endpoint untuk melakukan relasi antara tabel member dan tabel vehicle '
    #swagger.summary='Query INSERT to Owner table'*/
    /*#swagger.parameters['body']={
        name:'create',
        in:'body',
        description:'Endpoint relasi tabel member dan tabel vehicle menggunakan id dari kedua tabel.',
        required:true,
        schema:{$ref:'#definitions/OwnerRequestFormat'}
    } */
    try {
        const value = req.body
        await Owner.addOwner(value).returning(['member_id', 'vehicle_id']).then(async v => {
                res.status(200).json({
                    success: true,
                    message: 'Sukses menambahkan data kepemilikan',
                    data: v
                })
            })
            .catch(e => {
                console.log(e)
                res.status(400).json({
                    success: false,
                    message: 'Gagal menambahkan data'
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
    /*#swagger.tags=['Display All Owners Relations']
    #swagger.description='Endpoint untuk menampilkan relasi tabel member dan vehicle' 
    #swagger.summary='Query SELECT to Owner table'*/
    try {
        const check = await Owner.getAll()
        if (check.length > 0) {
            const result = await Member.query().withGraphFetched('vehicles')
            res.status(200).json({
                success: true,
                message: 'Menampilkan seluruh data kepemilikan kendaraan',
                data: result
            })
        } else {
            res.status(400).json({
                success: false,
                message: `Data Kepemilikan Tidak Ditemukan`
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Internal Server Error`
        })
    }
}

const getByIdMember = async (req, res) => {
    /*#swagger.tags=['Get Owner Relations By Member ID']
    #swagger.description='Endpoint untuk menampilkan data relasi antara tabel member dan tabel vehicle menurut ID'
    #swagger.summary='Query SELECT {id} to Owner table'*/
    try {
        const {
            id
        } = req.params
        const result = await Member.relatedQuery('vehicles').for(id)
        const member = await Member.getById(id)
        if (result) {
            res.status(200).json({
                success: true,
                message: `Data dengan id : ${id}, berhasil ditemukan`,
                data: {
                    member: member,
                    data_kendaraan: result
                }
            })
        } else {
            res.status(400).json({
                success: false,
                message: `Tidak dapat menemukan data kepemilikan dengan id : ${id}`
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
    /*#swagger.tags=['Delete Owner Relations By Member ID']
    #swagger.description='Endpoint untuk menghapus data relasi antara tabel member dan tabel vehicle menurut ID'
    #swagger.summary='Query DELETE {id} to Owner table'*/
    try {
        const {
            id
        } = req.params
        const result = await Owner.deleteById(id)
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
    /*#swagger.tags=['Delete Owners Relations']
    #swagger.description='Endpoint untuk menghapus data relasi antara tabel member dan tabel vehicle'
    #swagger.summary='Query DELETE to Owner table'*/

    try {
        const check = await Owner.getAll()
        if (check.length > 0) {
            await Owner.delete()
            res.status(200).json({
                success: true,
                message: 'Berhasil menghapus seluruh data kepemilikan kendaraan'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Tabel kosong, data kepemilikan tidak dapat dihapus'
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
    getByIdMember,
    deleteAll,
    deleteById,
}