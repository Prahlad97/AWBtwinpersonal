/** Synthetic 8760-hour series for Grid Asset → NWA (Lab fixtures). */

export const HOURS_8760 = 8760;

const MS_HOUR = 3600 * 1000;

export function buildHourlyTimestamps(year, month, day) {
  const start = Date.UTC(year, month - 1, day);
  return Array.from({ length: HOURS_8760 }, (_, i) => start + i * MS_HOUR);
}

function wobble(i, scale = 1) {
  return Math.sin(i * 0.041) * scale + Math.cos(i * 0.013) * scale * 0.55;
}

/**
 * Shared load-shape physics for both 8760 charts — seasonal arc, diurnal swing,
 * and high-frequency AMI-style ripple (so chart 2 is not a flat “fake” stack).
 */
function hourlyLoadShape(i) {
  const day = Math.floor(i / 24);
  const hod = i % 24;
  const seasonal = Math.sin((day / 365) * Math.PI * 2 - 1.1);
  const daily = Math.sin((hod / 24) * Math.PI * 2 - 0.4);
  const ripple =
    Math.sin(i * 0.91) * 0.34 +
    Math.sin(i * 2.37) * 0.21 +
    Math.sin(i * 5.11) * 0.11 +
    wobble(i, 0.42);
  return { day, hod, seasonal, daily, ripple };
}

function buildTemperature(i, { day, hod, seasonal }) {
  const t =
    50 +
    seasonal * 17 +
    Math.sin((hod / 24) * Math.PI * 2) * 11 +
    wobble(i, 3.5);
  return Math.round(t * 10) / 10;
}

/** Scale the same envelope to a target range (gross MWh vs disagg MWh/T). */
function scaleEnvelope(shape, { base, seasonalAmp, dailyAmp, rippleAmp, min, max }) {
  const { seasonal, daily, ripple } = shape;
  const raw = base + seasonal * seasonalAmp + daily * dailyAmp + ripple * rippleAmp;
  return Math.max(min, Math.min(max, raw));
}

function disaggregateHour(totalNet, shape, i) {
  const { day, hod, seasonal } = shape;
  const cold = Math.max(0, seasonal);
  const hot = Math.max(0, -seasonal);
  const daylight = Math.max(0, Math.sin((hod / 24) * Math.PI));
  const summer = day > 75 && day < 285 ? 1 : 0.35;

  const heatShare = 0.14 + cold * 0.2;
  const coolShare = 0.08 + hot * 0.18;
  const baseloadShare = 0.32;
  const waterShare = 0.07 + cold * 0.05;
  const evShare = 0.05 + (hod >= 18 || hod <= 6 ? 0.09 : 0.015);
  const otherShare = 0.06;
  const solarExportShare = daylight * summer * (0.06 + hot * 0.04);

  const positivePool = totalNet / Math.max(0.15, 1 - solarExportShare);
  const heating = positivePool * heatShare;
  const cooling = positivePool * coolShare;
  const baseload = positivePool * baseloadShare;
  const waterHeating = positivePool * waterShare;
  const ev = positivePool * evShare;
  const other = positivePool * otherShare;
  const solar = -(positivePool * solarExportShare);

  const layers = {
    heating: +heating.toFixed(2),
    cooling: +cooling.toFixed(2),
    baseload: +baseload.toFixed(2),
    waterHeating: +waterHeating.toFixed(2),
    ev: +ev.toFixed(2),
    other: +other.toFixed(2),
    solar: +solar.toFixed(2),
  };

  const sum = Object.values(layers).reduce((a, b) => a + b, 0);
  return { layers, total: +sum.toFixed(2) };
}

const DISAGG_LAYERS = [
  { key: 'heating', name: 'Heating', color: '#1F4E79' },
  { key: 'cooling', name: 'Cooling', color: '#E74C3C' },
  { key: 'baseload', name: 'Baseload', color: '#5DADE2' },
  { key: 'waterHeating', name: 'Water Heating', color: '#F39C12' },
  { key: 'ev', name: 'EV', color: '#8E44AD' },
  { key: 'other', name: 'Other', color: '#82C341' },
  { key: 'solar', name: 'Solar', color: '#E8D5B7' },
];

/** Jul 2023 → Jun 2024 — gross/net demand (MWh). */
export function buildGrossDemand8760() {
  const timestamps = buildHourlyTimestamps(2023, 7, 2);
  const demand = [];
  const tempC = [];

  for (let i = 0; i < HOURS_8760; i += 1) {
    const shape = hourlyLoadShape(i);
    demand.push(
      +scaleEnvelope(shape, {
        base: 235,
        seasonalAmp: 130,
        dailyAmp: 48,
        rippleAmp: 22,
        min: 25,
        max: 495,
      }).toFixed(2)
    );
    tempC.push(buildTemperature(i, shape));
  }

  return { timestamps, demand, tempC };
}

/** Calendar 2022 — same load shape, scaled for disagg axis; layers sum to total. */
export function buildDisaggregated8760() {
  const timestamps = buildHourlyTimestamps(2022, 1, 1);
  const layers = Object.fromEntries(DISAGG_LAYERS.map((l) => [l.key, []]));
  const total = [];
  const tempC = [];

  for (let i = 0; i < HOURS_8760; i += 1) {
    const shape = hourlyLoadShape(i);
    const netTotal = scaleEnvelope(shape, {
      base: 32,
      seasonalAmp: 17.5,
      dailyAmp: 6.8,
      rippleAmp: 3.1,
      min: 4,
      max: 58,
    });
    const split = disaggregateHour(netTotal, shape, i);

    DISAGG_LAYERS.forEach(({ key }) => layers[key].push(split.layers[key]));
    total.push(split.total);
    tempC.push(buildTemperature(i, shape));
  }

  return { timestamps, layers, layerMeta: DISAGG_LAYERS, total, tempC };
}

export const GROSS_DEMAND_8760 = buildGrossDemand8760();
export const DISAGG_DEMAND_8760 = buildDisaggregated8760();

/** Format UTC timestamp for LDC x-axis (`2023-07-30 19`). */
export function formatLdcHourLabel(ms) {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
  const da = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  return `${y}-${mo}-${da} ${h}`;
}

/**
 * Load duration curve order: sort hours by demand magnitude (highest → lowest).
 * `hourLabels` are the calendar time of each ranked hour (not chronological x).
 */
export function sortByDemandDesc(timestamps, values) {
  const order = values
    .map((v, i) => ({ i, v }))
    .sort((a, b) => b.v - a.v)
    .map(({ i }) => i);

  const sortedValues = order.map((i) => values[i]);
  const sortedTimestamps = order.map((i) => timestamps[i]);

  return {
    count: order.length,
    order,
    values: sortedValues,
    timestamps: sortedTimestamps,
    hourLabels: sortedTimestamps.map(formatLdcHourLabel),
  };
}

function buildGridPeakLdc() {
  const { timestamps, layers, layerMeta, total } = DISAGG_DEMAND_8760;
  const ranked = sortByDemandDesc(timestamps, total);
  const sortedLayers = Object.fromEntries(
    layerMeta.map(({ key }) => [key, ranked.order.map((i) => layers[key][i])])
  );
  return { ...ranked, layers: sortedLayers, layerMeta };
}

export const GRID_PEAK_LDC = buildGridPeakLdc();

export function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}
