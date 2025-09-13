function buildFilter(query) {
  const filter = {};

  if (query.status) filter.status = query.status;
  if (query.city) filter.city = { $regex: query.city, $options: "i" };
  if (query.email) filter.email = { $regex: query.email, $options: "i" };
  if (query.source) filter.source = query.source;

  if (query.is_qualified !== undefined) {
    filter.is_qualified = query.is_qualified === "true";
  }

  // numeric filters
  if (query.min_score) filter.score = { ...(filter.score||{}), $gte: Number(query.min_score) };
  if (query.max_score) filter.score = { ...(filter.score||{}), $lte: Number(query.max_score) };

  if (query.min_value) filter.lead_value = { ...(filter.lead_value||{}), $gte: Number(query.min_value) };
  if (query.max_value) filter.lead_value = { ...(filter.lead_value||{}), $lte: Number(query.max_value) };

  // date range
  if (query.start_date || query.end_date) {
    filter.createdAt = {};
    if (query.start_date) filter.createdAt.$gte = new Date(query.start_date);
    if (query.end_date) filter.createdAt.$lte = new Date(query.end_date);
  }

  return filter;
}

module.exports = { buildFilter };
