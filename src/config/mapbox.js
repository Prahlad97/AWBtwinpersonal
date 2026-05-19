/** Mapbox settings for Location tab (Avista / Inland NW fixture region). */
export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

export const LOCATION_MAP_CENTER = [-117.37888, 47.63387];
export const LOCATION_MAP_ZOOM = 9.2;

export const MAPBOX_STYLE = 'mapbox://styles/mapbox/light-v11';

export function isMapboxConfigured() {
  return Boolean(MAPBOX_ACCESS_TOKEN && MAPBOX_ACCESS_TOKEN.startsWith('pk.'));
}
