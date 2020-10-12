module.exports = function makePostUtil (PostModel) {
  const withReferences = references => {
    const Post = PostModel.query()

    if (references) {
      const extractedReferences = references.split(',')

      extractedReferences.forEach(reference => Post.with(reference))
    }

    return Post
  }

  return {
    getAll: (references, page = 1, per_page = 10) => withReferences(references).paginate(page, per_page),
    getById: (uuid, references) => withReferences(references)
      .where({ uuid })
      .fetch()
      .then(response => response.first()),
    create: async (attributes, references) => {
      const { uuid } = await PostModel.create(attributes)

      return withReferences(references)
        .where({ uuid })
        .fetch()
        .then(response => response.first())
    }
  }
}
