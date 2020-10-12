module.exports = function makeUserUtil (UserModel) {
  const withReferences = references => {
    const User = UserModel.query()

    if (references) {
      const extractedReferences = references.split(',')

      extractedReferences.forEach(reference => User.with(reference))
    }

    return User
  }

  return {
    getAll: (references, page = 1, per_page = 10) => withReferences(references).paginate(page, per_page),
    getById: (uuid, references) => withReferences(references)
      .where({ uuid })
      .fetch()
      .then(response => response.first()),
    create: async (attributes, references) => {
      const { uuid } = await UserModel.create(attributes)

      return withReferences(references)
        .where({ uuid })
        .fetch()
        .then(response => response.first())
    }
  }
}
