export function updateDataForSavedFilters(data) {
  if (!Array.isArray(data)) return [];
  return data.map((row, i) => ({
    id: row['saved_filters.id'] || `sf-${i}`,
    name: row['saved_filters.name'] || `Filter ${i + 1}`,
    filters: {},
  }));
}
