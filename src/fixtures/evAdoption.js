/** EV Adoption bar-race fixtures — Bidgely AWB-Official node 1162-12863. */

export const EV_ADOPTION_VIEW_OPTIONS = [
  { id: 'ZIP', label: 'Zip Code', categoryAxisTitle: 'Zip Code' },
  { id: 'FEEDER', label: 'Feeder', categoryAxisTitle: 'Feeder' },
  { id: 'SUBSTATION', label: 'Substation', categoryAxisTitle: 'Substation' },
];

/** Per-category colors (top → bottom at final frame). */
export const EV_ADOPTION_BAR_COLORS = [
  '#C5E86C',
  '#7B2D3E',
  '#F5A623',
  '#9B59B6',
  '#1E3A5F',
  '#E74C3C',
  '#3498DB',
  '#27AE60',
  '#8E44AD',
  '#16A085',
  '#D35400',
  '#2C3E50',
];

const ZIP_CATEGORIES = [
  '99203',
  '99208',
  '99223',
  '99205',
  '99204',
  '99202',
  '99224',
  '99207',
  '99217',
  '99206',
  '99201',
  '99218',
];

const ZIP_FINAL_VALUES = [13, 13, 13, 12, 11, 11, 10, 10, 9, 9, 8, 8];

const FEEDER_CATEGORIES = [
  'FDR-113',
  'FDR-087',
  'FDR-042',
  'FDR-156',
  'FDR-201',
  'FDR-033',
  'FDR-119',
  'FDR-064',
  'FDR-178',
  'FDR-091',
  'FDR-025',
  'FDR-140',
];

const FEEDER_FINAL_VALUES = [14, 13, 12, 11, 11, 10, 10, 9, 9, 8, 7, 7];

const SUBSTATION_CATEGORIES = [
  'SUB-North',
  'SUB-Central',
  'SUB-East',
  'SUB-West',
  'SUB-Riverside',
  'SUB-Valley',
  'SUB-Hill',
  'SUB-Lake',
  'SUB-Park',
  'SUB-Metro',
  'SUB-Union',
  'SUB-Plaza',
];

const SUBSTATION_FINAL_VALUES = [14, 13, 12, 12, 11, 10, 10, 9, 9, 8, 8, 7];

const TIMELINE_START = '2022-01-03';
const TIMELINE_END = '2022-12-26';
const FINAL_TOTAL = 176;
const FRAME_COUNT = 26;

function buildFrames(categories, finalValues, finalTotal) {
  const start = new Date(TIMELINE_START);
  const end = new Date(TIMELINE_END);
  const stepMs = (end.getTime() - start.getTime()) / (FRAME_COUNT - 1);

  return Array.from({ length: FRAME_COUNT }, (_, i) => {
    const t = i / (FRAME_COUNT - 1);
    const eased = t * t * (3 - 2 * t);
    const date = new Date(start.getTime() + stepMs * i);
    const dateLabel = date.toISOString().slice(0, 10);

    if (i === FRAME_COUNT - 1) {
      return { date: dateLabel, categories: [...categories], values: [...finalValues], total: finalTotal };
    }

    const values = finalValues.map((v, idx) => {
      const seed = 0.92 + (idx % 4) * 0.02;
      const grown = v * (0.12 + 0.88 * eased) * seed;
      return Math.max(1, Math.round(grown));
    });

    const visibleTotal = values.reduce((sum, n) => sum + n, 0);
    const total = Math.round(finalTotal * (0.18 + 0.82 * eased) * (visibleTotal / finalValues.reduce((s, n) => s + n, 0)));

    return { date: dateLabel, categories: [...categories], values, total };
  });
}

export const EV_ADOPTION_DATASETS = {
  ZIP: {
    id: 'ZIP',
    categoryAxisTitle: 'Zip Code',
    colors: EV_ADOPTION_BAR_COLORS,
    frames: buildFrames(ZIP_CATEGORIES, ZIP_FINAL_VALUES, FINAL_TOTAL),
  },
  FEEDER: {
    id: 'FEEDER',
    categoryAxisTitle: 'Feeder',
    colors: EV_ADOPTION_BAR_COLORS,
    frames: buildFrames(FEEDER_CATEGORIES, FEEDER_FINAL_VALUES, FINAL_TOTAL),
  },
  SUBSTATION: {
    id: 'SUBSTATION',
    categoryAxisTitle: 'Substation',
    colors: EV_ADOPTION_BAR_COLORS,
    frames: buildFrames(SUBSTATION_CATEGORIES, SUBSTATION_FINAL_VALUES, FINAL_TOTAL),
  },
};

export const EV_ADOPTION_CHART_META = {
  title: 'EV Adoption',
  valueAxisTitle: 'No. of EVs',
  valueAxisMax: 14,
  playIntervalMs: 700,
};

/** @deprecated Use EvAdoptionChart — kept for imports */
export const evAdoptionByZip = {
  title: EV_ADOPTION_CHART_META.title,
  yAxisTitle: EV_ADOPTION_CHART_META.valueAxisTitle,
  categories: ZIP_CATEGORIES,
  values: ZIP_FINAL_VALUES,
  colors: EV_ADOPTION_BAR_COLORS,
  labelColor: '#1E232E',
};
