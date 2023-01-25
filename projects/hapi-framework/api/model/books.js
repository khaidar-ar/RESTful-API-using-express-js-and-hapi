const {
    Model
} = require('objection')
const knex = require('../../db/knex')
const moment = require('moment')

Model.knex(knex)

class Books extends Model {
    static get tableName() {
        return 'books'
    }

    static get idColumn() {
        return ['id']
    }

    static create(v) {
        const {
            judul,
            penulis,
            tahun,
            penerbit,
            deskripsi
        } = v
        const book = this.query().insert({
            judul: judul,
            penulis: penulis,
            tahun: tahun,
            penerbit: penerbit,
            deskripsi: deskripsi,
        })
        return book
    }

    static get() {
        return this.query()
    }

    static getById(id) {
        return this.query().findById(id)
    }

    static delete() {
        return this.query().delete()
    }

    static deleteById(id) {
        return this.query().deleteById(id)
    }

    static updateBook(v, id) {
        const {
            judul,
            penulis,
            penerbit,
            tahun,
            deskripsi
        } = v
        const book = this.query().patch({
            judul: judul,
            penulis: penulis,
            penerbit: penerbit,
            tahun: tahun,
            deskripsi: deskripsi,
            update: true,
            updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }).where('id', id)
        return book
    }

    static checkDuplication(col1, qBuilder1, id) {
        return this.dataIsExist(col1, qBuilder1, ).where('id', '<>', id)
    }

    static dataIsExist(col1, qBuilder1) {
        const isDuplicate = this.query().where(
            builder => {
                builder.where(col1, qBuilder1)
            }
        )
        return isDuplicate
    }
}

module.exports = Books