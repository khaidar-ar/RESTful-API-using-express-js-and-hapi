const {
    Model
} = require('objection')
const knex = require('../../db/knex')
const moment = require('moment')


Model.knex(knex)

class Vehicle extends Model {
    static get tableName() {
        return 'vehicles'
    }
    static get idColumn() {
        return ['id']
    }




    static insertVehicle(v) {
        const {
            nopol,
            merk,
            tipe,
            tahun,
            warna,
            kubikasi
        } = v
        const vehicle = this.query().insert({
            nopol: nopol,
            merk: merk,
            tipe: tipe,
            tahun: tahun,
            warna: warna,
            kubikasi: kubikasi
        })
        return vehicle
    }

    static getVehicles() {
        return this.query()

    }

    static getById(id) {
        return this.query().findById(id)
    }

    static update(v, id) {
        const update = this.query().patch({
            nopol: v.nopol,
            merk: v.merk,
            tipe: v.tipe,
            updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }).where('id', id)
        return update
    }

    static delete() {
        return this.query().delete()
    }

    static deleteById(id) {
        return this.query().deleteById(id)
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


module.exports = Vehicle