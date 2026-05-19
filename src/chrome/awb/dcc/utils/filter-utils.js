/**
 * Transforms an array of filter objects into a key-value map.
 * Expects items with field_name and filter_value; skips items without filter_value.
 * @param {Array<{ field_name?: string, filter_value?: string }>} filters
 * @returns {Record<string, string>}
 */
export function modifyDemandCurveFilters(filters) {
  const result = {};
  (filters || []).forEach((filter) => {
    if (filter?.filter_value != null) {
      const key = filter?.field_name;
      if (key != null) result[key] = filter.filter_value;
    }
  });
  return result;
}
