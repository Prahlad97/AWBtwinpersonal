/** Month picker + range label helpers — no moment.js. */

export const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

/** e.g. 01 Jan 2023 */
export function formatDisplayDay(d) {
  return `${pad2(d.getDate())} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

/** First / last day of calendar month */
export function firstOfMonth(year, monthIndex) {
  return new Date(year, monthIndex, 1);
}

export function lastOfMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0);
}

export function formatRangeLabel(fromYm, toYm) {
  const start = firstOfMonth(fromYm.year, fromYm.month);
  const end = lastOfMonth(toYm.year, toYm.month);
  return `${formatDisplayDay(start)} - ${formatDisplayDay(end)}`;
}

export function ymFromDate(d) {
  return { year: d.getFullYear(), month: d.getMonth() };
}

/** Parse toolbar label `DD Mon YYYY - DD Mon YYYY` → `{ from: {year,month,day}, to }`. */
export function parseToolbarRangeLabel(label) {
  const parts = label.split(' - ').map((s) => s.trim());
  if (parts.length !== 2) return null;
  const parseOne = (s) => {
    const m = s.match(/^(\d{2}) (\w{3}) (\d{4})$/);
    if (!m) return null;
    const mon = MONTH_SHORT.indexOf(m[2]);
    if (mon < 0) return null;
    const day = Number(m[1]);
    if (!Number.isFinite(day) || day < 1 || day > 31) return null;
    return { year: Number(m[3]), month: mon, day };
  };
  const from = parseOne(parts[0]);
  const to = parseOne(parts[1]);
  if (!from || !to) return null;
  return { from, to };
}

/** @param {Date} ref - "today" anchor for rolling windows */
export function rangeForQuickSelect(id, ref = new Date()) {
  const end = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  let start;

  switch (id) {
    case 'last3m':
      start = new Date(ref.getFullYear(), ref.getMonth() - 3, 1);
      return { start: ymFromDate(start), end: ymFromDate(end) };
    case 'last6m':
      start = new Date(ref.getFullYear(), ref.getMonth() - 6, 1);
      return { start: ymFromDate(start), end: ymFromDate(end) };
    case 'last12m':
      start = new Date(ref.getFullYear(), ref.getMonth() - 12, 1);
      return { start: ymFromDate(start), end: ymFromDate(end) };
    case 'year2022':
      return { start: { year: 2022, month: 0 }, end: { year: 2022, month: 11 } };
    case 'year2023':
      return { start: { year: 2023, month: 0 }, end: { year: 2023, month: 11 } };
    case 'year2024':
      return { start: { year: 2024, month: 0 }, end: { year: 2024, month: 11 } };
    case 'year2025':
      return { start: { year: 2025, month: 0 }, end: { year: 2025, month: 11 } };
    default:
      return null;
  }
}
