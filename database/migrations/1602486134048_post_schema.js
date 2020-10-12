'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', table => {
      table.uuid('uuid').unique()
      table.string('title').notNullable()
      table.string('content').notNullable()
      table.string('cover_image_url')
      table.uuid('author_uuid').unique()
      table.timestamps()

      table
        .foreign('author_uuid')
        .references('users.uuid')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
