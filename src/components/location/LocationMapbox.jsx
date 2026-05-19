import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  isMapboxConfigured,
  LOCATION_MAP_CENTER,
  LOCATION_MAP_ZOOM,
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE,
} from '../../config/mapbox';
import { buildLocationAreasGeoJSON } from '../../fixtures/locationAreas';

const SOURCE_ID = 'location-areas-source';
const LAYER_ID = 'location-areas-fill';
const OUTLINE_LAYER_ID = 'location-areas-outline';

function subIdToVariant(subId) {
  if (subId === 'EV_MAP' || subId === 'INCOME' || subId === 'GRID_MAP') return subId;
  return 'HOME';
}

function applyAreasLayer(map, geoJson) {
  if (map.getSource(SOURCE_ID)) {
    map.getSource(SOURCE_ID).setData(geoJson);
    return;
  }

  map.addSource(SOURCE_ID, { type: 'geojson', data: geoJson });
  map.addLayer({
    id: LAYER_ID,
    type: 'fill',
    source: SOURCE_ID,
    paint: {
      'fill-color': ['coalesce', ['get', 'fillColor'], '#C759F3'],
      'fill-opacity': 0.42,
    },
  });
  map.addLayer({
    id: OUTLINE_LAYER_ID,
    type: 'line',
    source: SOURCE_ID,
    paint: {
      'line-color': '#7C17A3',
      'line-width': 1,
      'line-opacity': 0.55,
    },
  });
}

function bindAreaInteractions(map, popup) {
  if (map.__locationInteractionsBound) return;
  map.__locationInteractionsBound = true;

  const showPopup = (e) => {
    const props = e.features?.[0]?.properties;
    if (!props) return;
    const html = `<div style="font-family:Roboto,sans-serif;font-size:12px;line-height:1.4">
      <strong style="color:#1e232e">${props.areaLabel || props.zip}</strong><br/>
      <span style="color:#565e6e">${props.metricLabel || ''}</span>
    </div>`;
    popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
  };

  map.on('mousemove', LAYER_ID, showPopup);
  map.on('mouseleave', LAYER_ID, () => popup.remove());
}

export const LocationMapbox = forwardRef(function LocationMapbox(
  { subId = 'HOME', onLoad, onError },
  ref
) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);
  const subIdRef = useRef(subId);
  onLoadRef.current = onLoad;
  onErrorRef.current = onError;
  subIdRef.current = subId;

  useImperativeHandle(ref, () => ({
    resize: () => mapRef.current?.resize(),
    zoomIn: () => mapRef.current?.zoomIn(),
    zoomOut: () => mapRef.current?.zoomOut(),
    recenter: () => {
      const map = mapRef.current;
      if (!map) return;
      map.flyTo({ center: LOCATION_MAP_CENTER, zoom: LOCATION_MAP_ZOOM, bearing: 0, pitch: 0 });
    },
  }));

  useEffect(() => {
    if (!isMapboxConfigured() || !containerRef.current) return undefined;

    let cancelled = false;
    let loadTimeoutId;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      center: LOCATION_MAP_CENTER,
      zoom: LOCATION_MAP_ZOOM,
      attributionControl: true,
    });

    mapRef.current = map;
    popupRef.current = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 12 });

    const reportReady = () => {
      if (!cancelled) onLoadRef.current?.();
    };

    const reportError = (message) => {
      if (!cancelled) onErrorRef.current?.(message);
    };

    const syncLayers = () => {
      if (cancelled || !mapRef.current) return;
      try {
        const geoJson = buildLocationAreasGeoJSON(subIdToVariant(subIdRef.current));
        applyAreasLayer(map, geoJson);
        bindAreaInteractions(map, popupRef.current);
        map.resize();
        reportReady();
      } catch (err) {
        console.error('[LocationMapbox] layer sync failed', err);
        reportError('Could not render map layers.');
        reportReady();
      }
    };

    const handleMapReady = () => {
      if (cancelled) return;
      syncLayers();
    };

    map.on('load', handleMapReady);
    map.on('error', (e) => {
      console.error('[LocationMapbox] map error', e);
      reportError('Map failed to load. Check your Mapbox token and network.');
      reportReady();
    });

    loadTimeoutId = window.setTimeout(() => {
      if (cancelled || !mapRef.current) return;
      if (map.loaded()) {
        handleMapReady();
        return;
      }
      reportError('Map is taking longer than expected. Check network access to api.mapbox.com.');
      reportReady();
    }, 12000);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (!cancelled) map.resize();
          })
        : null;
    resizeObserver?.observe(containerRef.current);

    requestAnimationFrame(() => {
      if (!cancelled) map.resize();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimeoutId);
      resizeObserver?.disconnect();
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
      popupRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const geoJson = buildLocationAreasGeoJSON(subIdToVariant(subId));

    if (map.loaded() && map.getSource(SOURCE_ID)) {
      map.getSource(SOURCE_ID).setData(geoJson);
      return;
    }

    if (map.loaded()) {
      try {
        applyAreasLayer(map, geoJson);
        bindAreaInteractions(map, popupRef.current);
      } catch (err) {
        console.error('[LocationMapbox] subtab layer update failed', err);
      }
      return;
    }

    map.once('load', () => {
      try {
        applyAreasLayer(map, geoJson);
        bindAreaInteractions(map, popupRef.current);
      } catch (err) {
        console.error('[LocationMapbox] subtab layer update failed', err);
      }
    });
  }, [subId]);

  if (!isMapboxConfigured()) {
    return (
      <Box
        sx={{
          flex: 1,
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f4f6fa',
          border: '1px dashed #d0d6e7',
          borderRadius: 1,
          p: 2,
        }}
      >
        <Typography sx={{ fontSize: 13, color: '#565e6e', textAlign: 'center', maxWidth: 360 }}>
          Mapbox token missing. Add <code>VITE_MAPBOX_ACCESS_TOKEN</code> to <code>analytics-lab/.env</code> and
          restart the dev server.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{ flex: 1, minHeight: 400, width: '100%', height: '100%', position: 'relative' }}
    />
  );
});
