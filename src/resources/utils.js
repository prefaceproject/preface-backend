export const extractQueryParams = (req = {}) => {
  const { query } = req
  const { searchTerm, sortBy, sortOrder, limit, offset } = query

  return {
    searchTerm,
    sortBy,
    sortOrder,
    limit: limit && parseInt(limit),
    offset: offset && parseInt(offset),
  }
}

export const paginatedQuery = async (
  res,
  collection,
  query = {},
  project = null,
  options = {}
) => {
  const { offset, sortBy, sortOrder, limit } = options
  const sort = sortBy && sortOrder ? { [sortBy]: sortOrder } : { _id: 1 }

  res.setHeader('Access-Control-Expose-Headers', 'total')
  res.setHeader('total', await collection.countDocuments(query))

  const queryChain = collection
    .find(query, project)
    .sort(sort)
    .collation({ locale: 'en' })

  if (offset) queryChain.skip(offset)
  if (limit) queryChain.limit(limit)

  return await queryChain.exec()
}

export const constructSearchQuery = (fields, queryTerm) => {
  return {
    $or: fields.map((field) => ({
      [field]: { $regex: queryTerm, $options: 'i' },
    })),
  }
}
