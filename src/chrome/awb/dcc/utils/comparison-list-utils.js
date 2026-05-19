/**
 * Sorts comparison items by the applied sort option and direction.
 * @param {Array} items - List of comparison items
 * @param {Object} sortApplied - { option: string, direction: 'asc' | 'desc' }
 * @returns {Array} Sorted copy of items
 */
export function sortItems(items, sortApplied) {
  const sortedItems = [...items];
  if (!sortApplied) {
    sortedItems.sort((a, b) => Number(b.created_at) - Number(a.created_at));
    return sortedItems;
  }
  const { option, direction } = sortApplied;
  const sortDirection = direction === 'asc' ? 'desc' : 'asc';
  switch (option) {
    case 'name':
      sortedItems.sort((a, b) =>
        sortDirection === 'asc'
          ? a?.name?.localeCompare(b?.name)
          : b?.name?.localeCompare(a?.name)
      );
      break;
    case 'creationDate':
      sortedItems.sort((a, b) =>
        sortDirection === 'asc'
          ? Number(a.created_at) - Number(b.created_at)
          : Number(b.created_at) - Number(a.created_at)
      );
      break;
    default:
      sortedItems.sort((a, b) => Number(b.created_at) - Number(a.created_at));
      break;
  }
  return sortedItems;
}

/**
 * Filters comparison items by creators and time ranges.
 * @param {Array} items - List of comparison items
 * @param {Object} filters - { creators: string[], timeRanges: string[] }
 * @returns {Array} Filtered copy of items
 */
export function filterItems(items, filters) {
  let filteredItems = items;
  if (filters?.creators?.length === 0 && filters?.timeRanges?.length === 0) {
    return filteredItems;
  }
  if (filters?.creators?.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      filters.creators.includes(item?.user_name)
    );
  }
  if (filters?.timeRanges?.length > 0) {
    const now = new Date();
    filteredItems = filteredItems.filter((item) => {
      const itemDate = new Date(Number(item?.created_at));
      return filters.timeRanges.some((range) => {
        const rangeStart = new Date(now);
        switch (range) {
          case 'Last 7 days':
            rangeStart.setDate(rangeStart.getDate() - 7);
            break;
          case 'Last 30 days':
            rangeStart.setDate(rangeStart.getDate() - 30);
            break;
          case 'Last 6 months':
            rangeStart.setMonth(rangeStart.getMonth() - 6);
            break;
          case 'Last 1 year':
            rangeStart.setFullYear(rangeStart.getFullYear() - 1);
            break;
          default:
            return true;
        }
        return itemDate >= rangeStart;
      });
    });
  }
  return filteredItems;
}
