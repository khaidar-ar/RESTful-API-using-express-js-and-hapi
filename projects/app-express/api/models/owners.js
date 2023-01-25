const {
    Model
} = require('objection')
const knex = require('../../db/knex')
Model.knex(knex)
// const Member = require('./members')


class Owners extends Model {
    static get tableName() {
        return 'owners'
    }

    static get idColumn() {
        return ['id']
    }
    // static relationMappings = {
    //     vehicles: {
    //         relation: Model.HasManyRelation,
    //         modelClass: Vehicle,
    //         join: {
    //             from: 'vehicles.id',
    //             to: 'owners.vehicle_id'
    //         }
    //     },
    //     Members: {
    //         relation: Model.HasManyRelation,
    //         modelClass: Member,
    //         join: {
    //             from: 'members.id',
    //             to: 'owners.member_id'
    //         }
    //     }

    // }

    static getAll() {
        return this.query()
    }

    static addOwner(v) {
        const result = this.query().insert({
            member_id: v.member_id,
            vehicle_id: v.vehicle_id
        })
        return result
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

}

module.exports = Owners