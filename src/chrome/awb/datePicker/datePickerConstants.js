/** Vendored from AWB `new-date-picker/date-picker-constants.js` — Lab uses same IDs/labels (no Looker binding). */

export const QUICK_SELECT_OPTIONS = [
  { id: 'last3m', label: 'Last 3M' },
  { id: 'last6m', label: 'Last 6M' },
  { id: 'last12m', label: 'Last 12M' },
  { id: 'year2022', label: '2022' },
  { id: 'year2023', label: '2023' },
  { id: 'year2024', label: '2024' },
  { id: 'year2025', label: '2025' },
];

export const CONTEXTUAL_FILTERS_OPTIONS = [
  {
    id: 'hoursofday',
    label: 'Hour of Day',
    buttonLabel: 'is any value',
    dropdownOptions: [...Array(24).keys()].map((h) => ({
      key: h.toString(),
      value: h.toString(),
    })),
  },
  {
    id: 'dayofweek',
    label: 'Day of Week',
    buttonLabel: 'is any value',
    dropdownOptions: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
      (d) => ({ key: d.toLowerCase(), value: d })
    ),
  },
  {
    id: 'monthname',
    label: 'Month Name',
    buttonLabel: 'is any value',
    dropdownOptions: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ].map((m) => ({ key: m.toLowerCase(), value: m })),
  },
  {
    id: 'year',
    label: 'Year',
    buttonLabel: 'is any value',
    dropdownOptions: [2025, 2024, 2023].map((y) => ({
      key: y.toString(),
      value: y.toString(),
    })),
  },
  {
    id: 'dayofmonth',
    label: 'Day of Month',
    buttonLabel: 'is any value',
    dropdownOptions: [...Array(31).keys()].map((d) => ({
      key: (d + 1).toString(),
      value: (d + 1).toString(),
    })),
  },
];
