const MS_HOUR = 3600 * 1000;
const MS_DAY = 24 * MS_HOUR;

/** Pick x-axis tick spacing from visible time span — finer ticks when zoomed in. */
function tickIntervalForSpan(spanMs) {
  if (spanMs <= 2 * MS_DAY) return MS_HOUR;
  if (spanMs <= 7 * MS_DAY) return 3 * MS_HOUR;
  if (spanMs <= 21 * MS_DAY) return 6 * MS_HOUR;
  if (spanMs <= 90 * MS_DAY) return MS_DAY;
  if (spanMs <= 180 * MS_DAY) return 7 * MS_DAY;
  return 30 * MS_DAY;
}

/** After zoom/pan: denser hour ticks + visible hourly outline on area series. */
export function applyXAxisGranularity(axis, onRangeChange) {
  const min = axis.min;
  const max = axis.max;
  if (min == null || max == null) return;

  const spanMs = max - min;
  const zoomedIn = spanMs <= 7 * MS_DAY;

  axis.update({ tickInterval: tickIntervalForSpan(spanMs) }, false);

  axis.chart.series.forEach((s) => {
    if (s.type === 'area') {
      s.update(
        {
          lineWidth: zoomedIn ? 1.25 : 0.6,
          fillOpacity: zoomedIn ? 0.32 : 0.52,
        },
        false
      );
    }
  });

  axis.chart.redraw(false);
  onRangeChange?.(formatZoomRangeSubtitle(min, max));
}

/** Shared Highcharts options for zoomable 8760 hourly series. */
export function nwa8760ChartBase(height, onRangeChange) {
  return {
    height,
    backgroundColor: 'transparent',
    animation: false,
    zooming: {
      type: 'x',
      /** Two-finger pinch on trackpad / touchscreen (x-axis time). */
      pinchType: 'x',
      /** Keep false so pinch uses two fingers; one finger scrolls the page. */
      singleTouch: false,
      mouseWheel: {
        enabled: true,
        sensitivity: 1.2,
      },
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
    panning: {
      enabled: true,
      type: 'x',
    },
    panKey: 'shift',
    events: {
      load() {
        applyXAxisGranularity(this.xAxis[0], onRangeChange);
      },
    },
  };
}

/**
 * Datetime x-axis: tick interval + label formats tighten as you zoom in
 * so the x-axis shows hour-level granularity, not only a yearly smear.
 */
export function nwa8760XAxis(onRangeChange) {
  return {
    type: 'datetime',
    ordinal: false,
    title: { text: 'Hour', style: { fontSize: '11px', color: '#1E232E' } },
    crosshair: true,
    minRange: MS_HOUR,
    tickPixelInterval: 64,
    dateTimeLabelFormats: {
      millisecond: '%b %e %H:%M',
      second: '%b %e %H:%M',
      minute: '%b %e %H:%M',
      hour: '%b %e %H:%M',
      day: '%b %e',
      week: '%b %e',
      month: "%b '%y",
      year: '%Y',
    },
    labels: { style: { fontSize: '9px' } },
    events: {
      afterSetExtremes() {
        applyXAxisGranularity(this, onRangeChange);
      },
    },
  };
}

export const NWA_SERIES_PERF = { animation: false, turboThreshold: 8760 };

/** Lets two-finger pinch zoom the x-axis instead of only panning the tooltip. */
export const nwa8760Tooltip = {
  shared: true,
  followTouchMove: false,
  xDateFormat: '%b %e, %Y %H:%M',
};

export function formatZoomRangeSubtitle(min, max) {
  if (min == null || max == null) return null;
  const fmt = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
  const hours = Math.round((max - min) / MS_HOUR);
  return `Showing ${hours} hourly points · ${fmt.format(min)} – ${fmt.format(max)} UTC`;
}
