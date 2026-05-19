import { HOURS_8760 } from '../../fixtures/gridNwa8760';

/** Zoom/pinch for load-duration (rank-ordered) charts on linear hour index. */
export function nwaLdcChartBase(height, onRangeChange, onChartLoad) {
  return {
    height,
    backgroundColor: 'transparent',
    animation: false,
    zooming: {
      type: 'x',
      pinchType: 'x',
      singleTouch: false,
      mouseWheel: { enabled: true, sensitivity: 1.2 },
      resetButton: {
        theme: {
          fill: '#fff',
          stroke: '#D0D6E7',
          r: 4,
          style: { fontSize: '11px', color: '#1E232E' },
        },
        position: { align: 'right', x: -8, y: 8 },
      },
    },
    panning: { enabled: true, type: 'x' },
    panKey: 'shift',
    events: {
      load() {
        applyLdcAxisGranularity(this.xAxis[0], onRangeChange);
        onChartLoad?.();
      },
    },
  };
}

function labelStepForSpan(span) {
  if (span <= 120) return 8;
  if (span <= 400) return 24;
  if (span <= 1200) return 80;
  if (span <= 2500) return 200;
  return 400;
}

export function applyLdcAxisGranularity(axis, onRangeChange) {
  const min = Math.max(0, Math.floor(axis.min ?? 0));
  const max = Math.min(HOURS_8760 - 1, Math.ceil(axis.max ?? HOURS_8760 - 1));
  const span = Math.max(1, max - min);
  const step = labelStepForSpan(span);
  const meta = axis.options.ldcMeta || axis.userOptions.ldcMeta;

  axis.update(
    {
      labels: {
        rotation: -45,
        step,
        style: { fontSize: '8px' },
        formatter() {
          if (!meta?.hourLabels) return '';
          const idx = Math.round(this.value);
          return meta.hourLabels[idx] ?? '';
        },
      },
    },
    false
  );

  const zoomedIn = span <= 400;
  axis.chart.series.forEach((s) => {
    if (s.type === 'area') {
      s.update(
        { lineWidth: zoomedIn ? 0.8 : 0.35, fillOpacity: zoomedIn ? 0.45 : 0.55 },
        false
      );
    }
  });

  axis.chart.redraw(false);

  if (meta && onRangeChange) {
    const peak = meta.values[min]?.toFixed(1) ?? '—';
    const floor = meta.values[max]?.toFixed(1) ?? '—';
    onRangeChange(
      `Hours ranked ${min + 1}–${max + 1} of ${HOURS_8760} · demand ${peak} → ${floor} M(Wh/T)`
    );
  }
}

export function nwaLdcXAxis(ldcMeta, onRangeChange) {
  return {
    type: 'linear',
    min: 0,
    max: ldcMeta.count - 1,
    title: { text: 'Hour', style: { fontSize: '11px', color: '#1E232E' } },
    crosshair: true,
    minRange: 24,
    tickPixelInterval: 72,
    ldcMeta,
    labels: {
      rotation: -45,
      step: 400,
      style: { fontSize: '8px' },
      formatter() {
        const idx = Math.round(this.value);
        return ldcMeta.hourLabels[idx] ?? '';
      },
    },
    events: {
      afterSetExtremes() {
        applyLdcAxisGranularity(this, onRangeChange);
      },
    },
  };
}

export function ldcSeriesData(values) {
  return values.map((y, x) => [x, y]);
}

export const ldcTooltip = {
  shared: true,
  followTouchMove: false,
  formatter() {
    const pt = this.points?.[0]?.point;
    const xIdx = pt?.x ?? 0;
    const meta = this.points?.[0]?.series?.chart?.xAxis?.[0]?.options?.ldcMeta;
    const label = meta?.hourLabels?.[Math.round(xIdx)] ?? '';
    const rows = (this.points || [])
      .map((p) => `<span style="color:${p.color}">●</span> ${p.series.name}: <b>${p.y?.toFixed(2)}</b>`)
      .join('<br/>');
    return `<b>${label}</b><br/>Rank #${Math.round(xIdx) + 1}<br/>${rows}`;
  },
};
