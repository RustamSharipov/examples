import React from 'react';
import mapBoxGL, { Map, MapboxEvent, MapMouseEvent } from 'mapbox-gl';
import classNames from 'classnames';
import geoJSONBounds from 'geojson-bounds';
import {
  DEFAULT_MAP_RADIUS,
  MAP_ZOOM,
  MAPBOX_MAP_STYLE_OUTDOORS,
} from 'constants/geoTargeting';
import { ButtonControl, MapService, ITargetPoint } from 'utils/map';
import { GeoLocationCoordiantes } from 'apps/ui/types/geoTargeting';
import { getCountryPolygon } from 'utils/geoLocation';
import { getLocalString } from 'utils/localization';
import { IGeoTarget } from 'apps/campaigns/interfaces/campaignGeoTargeting';
import mapPin from './images/mapPin.svg';
import styles from './style.css';

interface IMapCenteringParams {
  countryCode: string;
}

interface IGeoTargetingMapProps {
  disabled?: boolean;
  centeringCoordinates: GeoLocationCoordiantes;
  centeringCountryCode: string | null;
  onGeoTargetAdd: (geoTarget: IGeoTarget) => void;
  onMapCentering: (params: IMapCenteringParams) => void;
  onPointLocationChange: (geoTarget: IGeoTarget) => void;
  points: IGeoTarget[];
}

interface IGeoTargetingMapState {
  isDropPinControlActive: boolean;
}

class GeoTargetingMap extends React.Component<IGeoTargetingMapProps, IGeoTargetingMapState> {
  public isMapInit: boolean;

  public polygons: IGeoTarget[];

  public mapNode: HTMLDivElement;

  public mapService: MapService;

  constructor(props) {
    super(props);
    this.mapService = new MapService();
    this.isMapInit = false;
    this.polygons = [],
    this.state = {
      isDropPinControlActive: false,
    };
  }

  public componentDidMount() {
    this.initMap();
  }

  public componentDidUpdate(prevProps) {
    const { centeringCoordinates, centeringCountryCode } = this.props;

    if (centeringCoordinates[0] !== prevProps.centeringCoordinates[0]
      || centeringCoordinates[1] !== prevProps.centeringCoordinates[1]) {
      this.toLocation([centeringCoordinates[0], centeringCoordinates[1]]);
    }

    if (centeringCountryCode && centeringCountryCode !== prevProps.centeringCountryCode) {
      this.toCountry(centeringCountryCode);
    }

    this.updateGeoTargetPoints();
  }

  public render() {
    return (
      <div className={styles.geoTargetingMap}>
        <div
          ref={this.handleMapRef}
          className={styles.map} />
      </div>
    );
  }

  private handleMapRef = (node: HTMLDivElement) => {
    this.mapNode = node;
  }

  private handleDropPinClick = () => {
    this.setState(state => ({
      isDropPinControlActive: !state.isDropPinControlActive,
    }));
    this.placePinOnMap();
  }

  private handleMapClick = (event: MapboxEvent<any> & MapMouseEvent) => {
    const { onGeoTargetAdd } = this.props;
    const { isDropPinControlActive } = this.state;

    if (isDropPinControlActive) {
      const lngLat = event.lngLat.toArray();
      const point: ITargetPoint = {
        draggable: true,
        id: (new Date().getTime() / 1000).toString(),
        kind: 'circle',
        lat: lngLat[1],
        lng: lngLat[0],
        name: '',
        radius: DEFAULT_MAP_RADIUS,
      };

      this.handleDropPinClick();

      onGeoTargetAdd(point);
    }
  }

  private handlePointLocationChange = (geoTarget: IGeoTarget) => {
    geoTarget.name = undefined;
    this.props.onPointLocationChange(geoTarget);
  }

  private initMap = () => {
    const { centeringCoordinates, disabled } = this.props;
    const map = new Map({
      attributionControl: false,
      center: centeringCoordinates,
      container: this.mapNode,
      style: MAPBOX_MAP_STYLE_OUTDOORS,
      zoom: MAP_ZOOM,
    });

    if (!disabled) {
      const dropButton = new ButtonControl(
        styles.mapControl,
        getLocalString('pages.campaigns.create.targeting.dropPin'),
        this.handleDropPinClick,
        styles.mapControlIcon,
      );

      map.addControl(dropButton, 'bottom-left');
    }

    const nav = new mapBoxGL.NavigationControl({ showCompass: false });
    map.addControl(nav, 'top-left');
    this.mapService.map = map;

    this.mapService.map.on('click', (event) => {
      this.handleMapClick(event);
    });

    this.mapService.map.on('style.load', () => {
      this.isMapInit = true;
      this.updateGeoTargetPoints();
    });
  }

  private updateGeoTargetPoints = () => {
    if (this.isMapInit) {
      const { disabled, points } = this.props;
      const { markers } = this.mapService;
      const isPointsChanged = this.isPointsChanged();

      // Add marker
      if (points.length > markers.length + this.polygons.length || isPointsChanged) {
        points.forEach((point) => {
          if (point.kind === 'country' && point.country_code) {
            if (!this.polygons.some(polygon => polygon.id === point.id)) {
              this.polygons = [
                ...this.polygons,
                point,
              ];

              this.mapService.addPolygonToMap({
                id: point.id,
                countryCode: point.country_code,
              });
            }
          }

          if (point.kind === 'circle') {
            if (!markers.some(marker => marker.id === point.id)) {
              this.mapService.addMarkerToMap(
                {
                  id: String(new Date().getTime() / 1000),
                  ...point,
                  draggable: true,
                },
                classNames(
                  styles.circleMarker,
                  disabled && styles.nonMovable,
                ),
                this.handlePointLocationChange,
              );
            }
          }
        });
      }

      // Remove marker
      if (points.length < markers.length + this.polygons.length || isPointsChanged) {
        markers
          .filter(marker => !points.some(point => point.id === marker.id))
          .forEach((marker) => {
            if (marker.kind === 'circle') {
              this.mapService.removeMarker(marker);
            }
          });

        const removedPolygons = this.polygons.filter(polygon => !points.some(point => point.id === polygon.id));
        removedPolygons.forEach((polygon) => {
          if (polygon.kind === 'country') {
            if (polygon.id) {
              this.mapService.removePolygonFromMap(polygon.id);
            }
          }
        });
        this.polygons = this.polygons
          .filter(polygon => !removedPolygons.some(removedPolygon => removedPolygon.id === polygon.id));
      }

      // Update existing marker
      if (points.length === markers.length + this.polygons.length) {
        this.mapService.markers.forEach((marker) => {
          const point = points.find(item => item.id === marker.id);
          if (point && point.radius !== marker.radius) {
            this.mapService.onChangeRadius({
              ...marker,
              radius: point.radius,
            });
          }
        });
      }
    }
  }

  private isPointsChanged = () => {
    const { points } = this.props;
    const { markers } = this.mapService;
    if (points.length !== markers.length + this.polygons.length) {
      return true;
    }
    for (const point of points) {
      const pointId = point.id;
      if (!markers.some(marker => marker.id === pointId)) {
        return true;
      }
      if (!this.polygons.some(polygon => polygon.id === pointId)) {
        return true;
      }
    }
    return false;
  }

  private placePinOnMap = () => {
    const { isDropPinControlActive } = this.state;
    const canvasElement: any = document.getElementsByClassName('mapboxgl-canvas')[0];
    const controlButton: any = document.getElementsByClassName(styles.mapControl)[0];

    if (canvasElement && controlButton) {
      if (isDropPinControlActive) {
        canvasElement.style.cursor = `url(${mapPin}) 17 25, auto`;
      }

      else {
        canvasElement.style.cursor = 'grab';
      }

      controlButton.className = classNames(
        styles.mapControl,
        isDropPinControlActive && styles.maprControlActive,
        'mapboxgl-ctrl',
      );
    }
  }

  private toCountry(countryCode: string) {
    const polygon = getCountryPolygon(countryCode);

    if (polygon && polygon.geometry && polygon.geometry.coordinates) {
      const bounds = geoJSONBounds.extent({
        coordinates: polygon.geometry.coordinates,
        type: 'Polygon',
      });

      this.mapService.map.fitBounds([
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ]);
    }

    this.props.onMapCentering({ countryCode });
  }

  private toLocation(coordinates: GeoLocationCoordiantes) {
    this.mapService.map.flyTo({
      center: coordinates,
      zoom: MAP_ZOOM,
    });
  }
}

export default GeoTargetingMap;
