'use strict'

const User = use('App/Models/User')
const makeUserUtil = require('../../../util/userUtil.func')

class UserController {
  async index ({ request }) {
    const { references } = request.qs

    const { rows, pages } = await makeUserUtil(User).getAll(references)

    return {
      status: 200,
      error: undefined,
      pages,
      data: rows
    }
  }

  async show ({ request }) {
    const { qs, params } = request

    const user = await makeUserUtil(User).getById(params.id, qs.references)

    return {
      status: 200,
      error: undefined,
      data: user
    }
  }

  async store ({ request }) {
    const { body, qs } = request

    const user = await makeUserUtil(User).create(body, qs.references)

    return {
      status: 200,
      error: undefined,
      data: user
    }
  }
}

module.exports = UserController
