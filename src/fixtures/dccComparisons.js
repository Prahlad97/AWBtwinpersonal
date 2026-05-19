/** Demand Curve Comparison — Lab fixtures (no AWB API). */

export const DCC_MAX_CURVES = 5;

const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

function hourlyProfile(seed, base = 120, amp = 80) {
  return HOURS.map((_, i) => {
    const peak = Math.sin(((i - 18) / 24) * Math.PI * 2) * amp;
    const ripple = Math.sin(i * 0.7 + seed) * 12;
    return Math.max(20, Math.round(base + peak + ripple));
  });
}

function buildChartSeries(name, seed, color) {
  return {
    name,
    color,
    data: hourlyProfile(seed).map((y, i) => ({ x: i, y, category: HOURS[i] })),
  };
}

export const DCC_INITIAL_COMPARISONS = [
  {
    dcc_id: 'dcc-winter-peak',
    name: 'Winter peak vs baseline',
    description: 'Compares AMI winter peak cohort against last-year baseline for program sizing.',
    user_name: 'Alex Morgan',
    user_id: 'lab-user-1',
    created_at: Date.UTC(2025, 0, 12),
    is_shared: true,
    demandCurves: [
      {
        id: 'dc-1',
        type: 'demand',
        name: 'Winter peak cohort',
        segmentLabel: 'Winter peak cohort',
        filterCount: 4,
        dateRange: 'Nov 2024 – Mar 2025',
        bgColor: '#F3F8FD',
        series: buildChartSeries('Winter peak cohort', 1, '#186CDD'),
      },
      {
        id: 'dc-2',
        type: 'demand',
        name: 'Prior year baseline',
        segmentLabel: 'All AMI electric',
        filterCount: 2,
        dateRange: 'Nov 2023 – Mar 2024',
        bgColor: '#FFF8F0',
        series: buildChartSeries('Prior year baseline', 2, '#E07A2F'),
      },
    ],
    deltaCurves: [
      {
        id: 'delta-1',
        type: 'delta',
        name: 'Peak − Baseline',
        baseId: 'dc-2',
        compareId: 'dc-1',
        bgColor: '#F5F0FF',
        series: buildChartSeries('Delta', 3, '#981EC8'),
      },
    ],
  },
  {
    dcc_id: 'dcc-ev-load',
    name: 'EV load ramp — feeder A',
    description: 'EV adoption segment on Feeder A vs system average.',
    user_name: 'Jordan Lee',
    user_id: 'lab-user-2',
    created_at: Date.UTC(2025, 1, 4),
    is_shared: false,
    demandCurves: [
      {
        id: 'dc-3',
        type: 'demand',
        name: 'Feeder A EV homes',
        segmentLabel: 'EV homes — Feeder A',
        filterCount: 6,
        dateRange: 'Feb 2025',
        bgColor: '#F3F8FD',
        series: buildChartSeries('Feeder A EV', 4, '#1E7BC8'),
      },
      {
        id: 'dc-4',
        type: 'demand',
        name: 'System average',
        segmentLabel: 'Resi AMI — Electric',
        filterCount: 1,
        dateRange: 'Feb 2025',
        bgColor: '#F0FAF0',
        series: buildChartSeries('System average', 5, '#4BAF4B'),
      },
    ],
    deltaCurves: [],
  },
  {
    dcc_id: 'dcc-solar-midday',
    name: 'Solar midday export',
    description: 'Solar export hours compared across west vs east substations.',
    user_name: 'Alex Morgan',
    user_id: 'lab-user-1',
    created_at: Date.UTC(2025, 2, 1),
    is_shared: true,
    demandCurves: [
      {
        id: 'dc-5',
        type: 'demand',
        name: 'West substation',
        segmentLabel: 'Solar homes — West',
        filterCount: 3,
        dateRange: 'Mar 2025',
        bgColor: '#FFFBEB',
        series: buildChartSeries('West', 6, '#F5B84A'),
      },
    ],
    deltaCurves: [],
  },
];

export function getComparisonChartOptions(comparison, selectedCurveIds = null) {
  if (!comparison) return null;
  const curves = [
    ...comparison.demandCurves,
    ...comparison.deltaCurves,
  ];
  const active =
    selectedCurveIds?.length > 0
      ? curves.filter((c) => selectedCurveIds.includes(c.id))
      : curves;

  const categories = HOURS;
  return {
    chart: { height: 360, backgroundColor: 'transparent' },
    credits: { enabled: false },
    title: { text: null },
    exporting: { enabled: false },
    xAxis: {
      categories,
      title: { text: 'Hour of day', style: { fontSize: '11px', color: '#565e6e' } },
      labels: { style: { fontSize: '10px' } },
    },
    yAxis: {
      title: { text: 'kWh', style: { fontSize: '11px', color: '#1E232E' } },
      labels: { style: { fontSize: '10px' } },
      gridLineColor: '#e8ecf2',
    },
    legend: { enabled: true, itemStyle: { fontSize: '11px' } },
    tooltip: {
      shared: true,
      valueSuffix: ' kWh',
    },
    plotOptions: {
      series: { marker: { enabled: false }, lineWidth: 2 },
    },
    series: active.map((c) => ({
      type: 'spline',
      name: c.name,
      color: c.series.color,
      data: c.series.data.map((p) => p.y),
    })),
  };
}
