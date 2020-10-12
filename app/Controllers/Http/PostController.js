'use strict'

const Post = use('App/Models/Post')
const makePostUtil = require('../../../util/postUtil.func')

class PostController {
  async index ({ request }) {
    const { references } = request.qs

    const { rows, pages } = await makePostUtil(Post).getAll(references)

    return {
      status: 200,
      error: undefined,
      pages,
      data: rows
    }
  }

  async show ({ request }) {
    const { qs, params } = request

    const post = await makePostUtil(Post).getById(params.id, qs.references)

    return {
      status: 200,
      error: undefined,
      data: post
    }
  }

  async store ({ request }) {
    const { body, qs } = request

    const post = await makePostUtil(Post).create(body, qs.references)

    return {
      status: 200,
      error: undefined,
      data: post
    }
  }
}

module.exports = PostController
