const Book = require('../model/books')

// const addBook = async (r, h) => {
//     try {
//         const data = r.payload
//         await Book.create(data).returning(['judul', 'tahun', 'penulis', 'penerbit']).then(async resp => {
//             const response = h.response({
//                 status: 'success',
//                 message: 'Buku berhasil ditambahkan',
//                 data: resp
//             })
//             response.code(200)
//             return response
//         }).catch(err => {
//             console.log(err)
//             const response = h.response({
//                 status: false,
//                 message: 'Buku gagal ditambahkan'
//             })
//             response.code(400)
//             return response
//         })
//     } catch (error) {
//         console.log(error)
//         const response = h.response({
//             status: false,
//             message: 'Internal Server Error'
//         })
//         response.code(500)
//         return response
//     }

// }

const addBook = async (r, h) => {
    let response
    try {
        const data = r.payload
        await Book.create(data).returning(['judul', 'tahun', 'penulis', 'penerbit']).then(async resp => {
            response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: resp
            })
            response.code(200)
        }).catch(err => {
            console.log(err)
            response = h.response({
                status: false,
                message: 'Buku gagal ditambahkan!'
            })
            response.code(400)
        })
    } catch (error) {
        console.log(error)
        response = h.response({
            status: false,
            message: 'Internal Server Error'
        })
        response.code(500)
    }
    return response
}

const getAll = async (r, h) => {
    let response
    try {
        const result = await Book.get()
        if (result.length > 0) {
            response = h.response({
                status: true,
                message: 'Berhasil menampilkan data buku',
                data: result
            })
            response.code(200)
        } else {
            response = h.response({
                status: false,
                message: 'Data buku kosong!',
            })
            response.code(400)
        }
    } catch (error) {
        response = h.response({
            status: false,
            message: 'Internal Server Error',
        })
        response.code(500)
    }
    return response
}

const getById = async (r, h) => {
    let response
    try {
        const {
            id
        } = r.params
        const result = await Book.getById(id)
        if (result) {
            response = h.response({
                status: true,
                message: `Berhasil mendapatkan data buku dengan ID : ${id}`,
                data: result
            })
            response.code(200)
        } else {
            response = h.response({
                status: false,
                message: `Buku dengan ID : ${id}, TIDAK DITEMUKAN!`,
            })
            response.code(400)
        }

    } catch (error) {
        console.log(error)
        response = h.response({
            status: false,
            message: `Internal Server Error`,
        })
        response.code(500)
    }
    return response
}

const deleteBook = async (r, h) => {
    let response
    try {
        const check = await Book.get()
        if (check.length > 0) {
            await Book.delete()
            response = h.response({
                status: true,
                message: 'Data seluruh buku berhasil dihapus'
            })
            response.code(200)
        } else {
            response = h.response({
                status: false,
                message: 'Data buku kosong, GAGAL MENGHAPUS!'
            })
            response.code(400)
        }
    } catch (error) {
        console.log(error)
        response = h.response({
            status: false,
            message: 'Internal Server Error'
        })
        response.code(500)
    }
    return response
}

const deleteBookById = async (r, h) => {
    let response
    try {
        const {
            id
        } = r.params
        const check = await Book.getById(id)
        if (check) {
            await Book.deleteById(id)
            response = h.response({
                status: true,
                message: `Buku dengan ID : ${id}, BERHASIL DIHAPUS!`
            })
            response.code(200)
        } else {
            response = h.response({
                status: false,
                message: `Buku dengan ID : ${id}, TIDAK DITEMUKAN`
            })
            response.code(400)
        }
    } catch (error) {
        console.log(error)
        response = h.response({
            status: false,
            message: `Internal Server Error`
        })
        response.code(500)
    }
    return response
}

const update = async (r, h) => {
    let response
    try {
        const {
            id
        } = r.params
        const data = r.payload
        const isDuplicate = await Book.checkDuplication('judul', data.judul, id).then(d => {
            console.log('Data buku sudah ada pada baris ', d)
            return d
        }).catch(e => {
            console.log(e)
            return e
        })
        if (isDuplicate > 0) {
            response = h.response({
                status: false,
                message: 'Judul buku sudah terdaftar'
            })
            response.code(400)
        } else {
            const result = await Book.updateBook(data, id).returning(['judul', 'penulis', 'penerbit', 'tahun', 'created_at', 'updated_at', 'update']).first().then(resp => {
                response = h.response({
                    status: true,
                    message: `Data buku dengan id : ${id}, BERHASIL DIRUBAH`,
                    data: resp
                })
                response.code(200)
            })
        }
    } catch (error) {
        console.log(error)
        response = h.response({
            status: false,
            message: 'Internal Server Error'
        })
        response.code(500)
    }
    return response

}

module.exports = {
    addBook,
    getAll,
    getById,
    deleteBook,
    deleteBookById,
    update
}