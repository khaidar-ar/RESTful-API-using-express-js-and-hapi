const {
    Model
} = require('objection')
const knex = require('../../db/knex')
const Vehicle = require('./vehicles')



Model.knex(knex)

class Member extends Model {

    static get tableName() {
        return 'members'
    }

    static get idColumn() {
        return ['id']
    }
    static relationMappings = {
        vehicles: {
            relation: Model.ManyToManyRelation,
            modelClass: Vehicle,
            join: {
                from: 'members.id',
                through: {
                    from: 'owners.member_id',
                    to: 'owners.vehicle_id'
                },
                to: 'vehicles.id'
            }
        }
    }


    static getALL() {
        return this.query()
    }

    static addMember(v) {

        const member = this.query().insert({
            nama: v.nama,
            alamat: v.alamat,
        })

        return member
    }

    static getAll() {
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

    static insertVehicle(v) {
        return this.query().patch({
            vehicle_id: v
        })
    }


}

module.exports = Member