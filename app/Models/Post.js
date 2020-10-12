'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid')

class Post extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async postInstance => {
      postInstance.uuid = uuidv4()
    })
  }

  static get incrementing () {
    return false
  }

  static get primaryKey () {
    return 'uuid'
  }

  user () {
    return this.belongsTo('App/Models/User', 'author_uuid', 'uuid')
  }
}

module.exports = Post
