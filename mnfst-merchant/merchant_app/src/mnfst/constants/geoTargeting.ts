import { GeoLocationCoordiantes } from 'apps/ui/types/geoTargeting';

export const GEOTARGETING_FETCH_LOCATIONS = 'GEOTARGETING_FETCH_LOCATIONS';
export const GEOTARGETING_FETCH_LOCATIONS_SUCCESS = 'GEOTARGETING_FETCH_LOCATIONS_SUCCESS';
export const GEOTARGETING_FETCH_LOCATIONS_ERROR = 'GEOTARGETING_FETCH_LOCATIONS_ERROR';
export const GEOTARGETING_MAP_FLY_TO = 'GEOTARGETING_MAP_FLY_TO';
export const GEOTARGETING_UPDATE_GEOTARGETING = 'GEOTARGETING_GEO_TARGETING_UPDATE';

export const GEOTARGETING_URI_GEOCODING = '/api/merchants/v2/campaigns/geocoding';

export const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWRlcnlhYmluIiwiYSI6ImNqc29wdTk5eDBmNmczeW8wZGszYmQ1OWUifQ.fvf4KLfPJvZZPjDHAOHHhA';

export const MAPBOX_GEOCODING_API_URI = '//api.tiles.mapbox.com/v4/geocode/mapbox.places-country-v1/:lngLat.json';
  // ?access_token=:accessToken

export const MAPBOX_MAP_STYLE_OUTDOORS = 'mapbox://styles/mapbox/outdoors-v10';

export const DEFAULT_MAP_RADIUS = 10;

export const MAP_ZOOM = 6;

export const GEOTARGETING_DEFAULT_MAP_CENTER: GeoLocationCoordiantes = [0.1278, 51.5074];

export const GEOTARGETING_GEOMETRY_COLOR = '#674ff1';

export const GEOTARGETING_MAP_POLYGON_BOUNDS_PADDING = 24;

