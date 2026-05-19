import { cloneDeep } from 'lodash';
import { CURVE_DATA_KEYS, PROPERTIES, VALUES } from '@/constants/demand-curve-constants';
import {
  convertCSVDataforDemandCurve,
  durationMapping,
  getFuelTypeV2,
  X_AXIS_DATA_V2,
} from './data-transformer';

/**
 * Builds newSeriesData, metaInfo, and dataNotPresentDetails from query response (success path).
 * @returns {{ newSeriesData: object, metaInfo: object, dataNotPresentDetails: array }}
 */
export const buildSeriesAndMetaFromResponse = (
  comparisonData,
  { curve, response, savedFilter, propState, plotName, type = false }
) => {
  const fuelType = getFuelTypeV2(savedFilter);
  const duration = propState?.[PROPERTIES.PLOT_DURATION];
  const seriesDataPoints = convertCSVDataforDemandCurve(response, duration, fuelType);
  const newSeriesData = cloneDeep(comparisonData?.comparison?.[CURVE_DATA_KEYS.SERIES_DATA]);

  if (seriesDataPoints.is576Chart) {
    const [maxSeriesData, minSeriesData] = seriesDataPoints.seriesData;
    newSeriesData[`${curve.demandCurveId}_max`] = {
      name: `${plotName} (Max)`,
      data: maxSeriesData,
      zIndex: type ? 10 : undefined,
      color: curve?.curveColor,
      connectNulls: true,
      lineWidth: 1,
    };
    newSeriesData[`${curve.demandCurveId}_min`] = {
      name: `${plotName} (Min)`,
      data: minSeriesData,
      zIndex: type ? 10 : undefined,
      color: curve?.curveColor,
      lineWidth: 1,
      connectNulls: true,
      dashStyle: 'dash',
    };
  } else {
    newSeriesData[curve.demandCurveId] = {
      name: plotName,
      data: seriesDataPoints.seriesData,
      zIndex: type ? 10 : undefined,
      color: curve?.curveColor,
      lineWidth: duration === '8760' ? 0.7 : 1,
    };
  }

  const metaInfo = {
    xAxisData:
      duration === '8760' || duration === '576'
        ? seriesDataPoints.xCategories
        : X_AXIS_DATA_V2[durationMapping[duration]],
    yTitle: VALUES[propState?.[PROPERTIES.VALUE]]?.name,
  };

  const existingDataNotPresentDetails =
    cloneDeep(comparisonData?.comparison?.[CURVE_DATA_KEYS.DATA_NOT_PRESENT_DETAILS]) || [];
  const dataNotPresentDetails = existingDataNotPresentDetails.filter(
    (item) => item.plotName !== plotName
  );

  return { newSeriesData, metaInfo, dataNotPresentDetails };
};
