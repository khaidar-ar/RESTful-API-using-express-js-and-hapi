const {
    Model
} = require('objection')

const knex = require('../../db/knex')

Model.knex(knex)

class Admin extends Model {

    static get tableName() {
        return 'admin'
    }

    static get idColumn() {
        return ['id']
    }

    static addAdmin(v, e) {
        const {
            nama,
            email,
        } = v

        const admin = this.query().insert({
            nama: nama,
            email: email,
            password: e
        })

        return admin
    }

    static getAll() {
        return this.query()
    }

    static delete() {
        return this.query().delete()
    }

    static checkDuplication(col1, qBuilder1, id) {
        return this.dataIsExist(col1, qBuilder1).where('id', '<>', id)
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
module.exports = Admin