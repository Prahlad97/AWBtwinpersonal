import { DEMAND_CURVE_TYPES } from '@/constants/demand-curve-constants';
import moment from 'moment';
import {
  convertToFuelUnitForDemandCurve,
  getFuelUnitForDemandCurve,
} from '../utils/demand-curve-utils';

export const getCurveOptions = (
  chartType,
  chartData,
  metaData,
  fueltype,
  usageValueFormatDemandCurve,
  usageValueFormatUsageCurve,
  showAverage = false
) => {
  switch (chartType) {
    // Consumption Curves (kWh) - Legacy and New naming
    case DEMAND_CURVE_TYPES.USAGE_TIME:
    case DEMAND_CURVE_TYPES.MONTHLY:
    case DEMAND_CURVE_TYPES.DAILY:
    case DEMAND_CURVE_TYPES.HOURLY: {
      const unit = getFuelUnitForDemandCurve(
        chartData?.[0]?.data?.[0]?.y,
        usageValueFormatUsageCurve,
        fueltype,
        DEMAND_CURVE_TYPES.USAGE_TIME
      );

      const consumptionType = showAverage ? 'Average' : 'Total';
      const chartTitle = `${consumptionType} Usage Over Time`;

      return {
        chart: {
          type: 'spline',
        },
        title: {
          text: chartTitle,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1E232E',
          },
        },
        style: {
          fontFamily: 'sans-serif',
        },
        xAxis: {
          categories: metaData?.xAxisData,
          lineWidth: 1,
        },
        yAxis: {
          title: {
            text: `<b>Usage in ${unit}<b>`,
          },
          labels: {
            formatter: function () {
              return convertToFuelUnitForDemandCurve(
                this.value,
                usageValueFormatUsageCurve,
                fueltype,
                DEMAND_CURVE_TYPES.USAGE_TIME
              );
            },
          },
          lineWidth: 1,
        },
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadSVG'],
            },
          },
          csv: {
            dateFormat: '%Y-%m-%d %H:%M:%S',
          },
        },
        tooltip: {
          formatter: function () {
            let formattedVal = convertToFuelUnitForDemandCurve(
              this.y,
              usageValueFormatUsageCurve,
              fueltype,
              DEMAND_CURVE_TYPES.USAGE_TIME
            );
            return [`<b>${this.x}</b><br/>`, `<b>${this.series?.name}</b> : ${formattedVal}`];
          },
        },
        colors: metaData?.colors || ['#ACC007', '#3794FC', '#058DC7', '#50B432'],
        series: chartData,
      };
    }

    // KW Demand Curves - Legacy and New naming with AVG/MIN/MAX variants
    case DEMAND_CURVE_TYPES.DEMAND_CURVE_AVG:
    case DEMAND_CURVE_TYPES.DEMAND_CURVE_MIN:
    case DEMAND_CURVE_TYPES.DEMAND_CURVE_MAX:
    case 'KW_MONTHLY_AVG':
    case 'KW_MONTHLY_MIN':
    case 'KW_MONTHLY_MAX':
    case 'KW_DAILY_AVG':
    case 'KW_DAILY_MIN':
    case 'KW_DAILY_MAX':
    case 'KW_HOURLY_AVG':
    case 'KW_HOURLY_MIN':
    case 'KW_HOURLY_MAX': {
      const unit = getFuelUnitForDemandCurve(
        chartData?.[0]?.data?.[0]?.y,
        usageValueFormatDemandCurve,
        fueltype,
        DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
      );
      // Generate dynamic title based on chart type
      let chartTitle = 'Demand Curve';
      if (chartType === DEMAND_CURVE_TYPES.DEMAND_CURVE_AVG || chartType.includes('_AVG')) {
        chartTitle = 'Average Demand Curve';
      } else if (chartType === DEMAND_CURVE_TYPES.DEMAND_CURVE_MIN || chartType.includes('_MIN')) {
        chartTitle = 'Minimum Demand Curve';
      } else if (chartType === DEMAND_CURVE_TYPES.DEMAND_CURVE_MAX || chartType.includes('_MAX')) {
        chartTitle = 'Maximum Demand Curve';
      }

      return {
        chart: {
          type: 'spline',
        },
        title: {
          text: chartTitle,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1E232E',
          },
        },
        style: {
          fontFamily: 'sans-serif',
        },
        xAxis: {
          categories: metaData?.xAxisData,
          lineWidth: 1,
        },
        yAxis: {
          title: {
            text: `<b>Demand in ${unit}<b>`,
          },
          labels: {
            formatter: function () {
              return convertToFuelUnitForDemandCurve(
                this.value,
                usageValueFormatDemandCurve,
                fueltype,
                DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
              );
            },
          },
          lineWidth: 1,
        },
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadSVG'],
            },
          },
          csv: {
            dateFormat: '%Y-%m-%d %H:%M:%S',
          },
        },
        tooltip: {
          formatter: function () {
            let formattedVal = convertToFuelUnitForDemandCurve(
              this.y,
              usageValueFormatDemandCurve,
              fueltype,
              DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
            );
            return [`<b>${this.x}</b><br/>`, `<b>${this.series?.name}</b> : ${formattedVal}`];
          },
        },
        colors: metaData?.colors || ['#ACC007', '#3794FC', '#058DC7', '#50B432'],
        series: chartData,
      };
    }
    case DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART: {
      const unit = getFuelUnitForDemandCurve(
        chartData?.[0]?.data?.[0]?.y,
        usageValueFormatDemandCurve,
        fueltype,
        DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
      );
      return {
        chart: {
          type: 'spline',
          zooming: {
            type: 'x',
          },
        },
        style: {
          fontFamily: 'sans-serif',
        },
        xAxis: {
          lineWidth: 1,
          type: 'datetime',
          labels: {
            formatter: function () {
              return moment(this.value).format('YYYY-MMMM-H');
            },
          },
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%e. %b',
            week: '%e. %b',
            month: "%b '%y",
            year: '%Y',
          },
        },
        boost: {
          useGPUTranslations: true,
          usePreAllocated: true,
        },
        yAxis: {
          title: {
            text: `<b>Demand in ${unit}<b>`,
          },
          labels: {
            formatter: function () {
              return convertToFuelUnitForDemandCurve(
                this.value,
                usageValueFormatDemandCurve,
                fueltype,
                DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
              );
            },
          },
          lineWidth: 1,
        },
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadSVG'],
            },
          },
          csv: {
            dateFormat: '%Y-%m-%d %H:%M:%S',
          },
        },
        tooltip: {
          formatter: function () {
            let formattedVal = convertToFuelUnitForDemandCurve(
              this.y,
              usageValueFormatDemandCurve,
              fueltype,
              DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
            );
            const formattedDate = moment(this.x).format('YYYY-MMMM-H');
            return [
              `<b>${formattedDate}</b><br/>`,
              `<b>${this.series?.name}</b> : ${formattedVal}`,
            ];
          },
        },
        colors: metaData?.colors || ['#ACC007', '#3794FC', '#058DC7', '#50B432'],
        plotOptions: {
          area: {
            marker: {
              radius: 2,
            },
            lineWidth: 0.5,
            color: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, 'rgb(199, 113, 243)'],
                [0.7, 'rgb(76, 175, 254)'],
              ],
            },
            states: {
              hover: {
                lineWidth: 0.5,
              },
            },
            threshold: null,
          },
          series: {
            turboThreshold: 10000,
          },
        },
        series: chartData,
      };
    }
    // Special Chart Type - 576 (Legacy and New naming)
    case DEMAND_CURVE_TYPES.CHART_576:
    case DEMAND_CURVE_TYPES['576']:
    case '576': {
      const unit = getFuelUnitForDemandCurve(
        chartData?.[0]?.data?.[0]?.y,
        usageValueFormatDemandCurve,
        fueltype,
        DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
      );

      // Generate dynamic title based on consumption type
      const consumptionType = showAverage ? 'Average' : 'Total';
      const chartTitle = `576 ${consumptionType} Consumption Chart`;

      // Add legendIndex based on timestamp ordering
      const chartDataWithLegendIndex = chartData.map((series) => {
        const firstDataPoint = series?.data?.[0];
        if (firstDataPoint?.name) {
          const parsed = moment(firstDataPoint.name, 'YYYY-MMMM-H').valueOf();
          return {
            ...series,
            timestamp: parsed, // Store for sorting
          };
        }
        return {
          ...series,
          timestamp: 0, // Default timestamp for series without valid data
        };
      });

      // Sort by timestamp and assign legendIndex
      chartDataWithLegendIndex.sort((a, b) => a.timestamp - b.timestamp);
      const sortedChartData = chartDataWithLegendIndex.map((series, index) => {
        const { timestamp, ...seriesWithoutTimestamp } = series; // Remove timestamp property
        return {
          ...seriesWithoutTimestamp,
          legendIndex: index, // Assign legendIndex based on sorted order
        };
      });

      return {
        chart: {
          type: 'spline',
          zooming: {
            type: 'x',
          },
        },
        title: {
          text: chartTitle,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1E232E',
          },
        },
        style: {
          fontFamily: 'sans-serif',
        },
        xAxis: {
          type: 'category',
          lineWidth: 1,
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px',
            },
          },
        },
        yAxis: {
          title: {
            text: `<b>Demand in ${unit}<b>`,
          },
          labels: {
            formatter: function () {
              return convertToFuelUnitForDemandCurve(
                this.value,
                usageValueFormatDemandCurve,
                fueltype,
                DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
              );
            },
          },
          lineWidth: 1,
        },
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadSVG'],
            },
          },
          csv: {
            dateFormat: '%Y-%m-%d %H:%M:%S',
          },
        },
        tooltip: {
          formatter: function () {
            let formattedVal = convertToFuelUnitForDemandCurve(
              this.y,
              usageValueFormatDemandCurve,
              fueltype,
              DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
            );
            const consumptionType = showAverage ? 'Average' : 'Total';
            return [
              `<b>${this.key}</b><br/>`,
              `<b>${this.series?.name}</b><br/>`,
              `${consumptionType} Consumption: ${formattedVal}`,
            ];
          },
        },
        colors: metaData?.colors || ['#ACC007', '#3794FC', '#058DC7', '#50B432'],
        plotOptions: {
          series: {
            turboThreshold: 5000,
            connectNulls: true,
          },
        },
        series: sortedChartData,
      };
    }
    // Special Chart Type - 8760 (Legacy and New naming)
    case DEMAND_CURVE_TYPES.CHART_8760:
    case DEMAND_CURVE_TYPES['8760']:
    case '8760': {
      const unit = getFuelUnitForDemandCurve(
        chartData?.[0]?.data?.[0]?.y,
        usageValueFormatDemandCurve,
        fueltype,
        DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
      );

      // Generate dynamic title based on consumption type
      const consumptionType = showAverage ? 'Average' : 'Total';
      const chartTitle = `8760 ${consumptionType} Consumption Chart`;

      // Add legendIndex based on timestamp ordering
      const chartDataWithLegendIndex = chartData.map((series) => {
        const firstDataPoint = series?.data?.[0];
        if (firstDataPoint?.name) {
          const parsed = moment(firstDataPoint.name, 'YYYY-MMMM-H').valueOf();
          return {
            ...series,
            timestamp: parsed, // Store for sorting
          };
        }
        return {
          ...series,
          timestamp: 0, // Default timestamp for series without valid data
        };
      });

      // Sort by timestamp and assign legendIndex
      chartDataWithLegendIndex.sort((a, b) => a.timestamp - b.timestamp);
      const sortedChartData = chartDataWithLegendIndex.map((series, index) => {
        const { timestamp, ...seriesWithoutTimestamp } = series; // Remove timestamp property
        return {
          ...seriesWithoutTimestamp,
          legendIndex: index, // Assign legendIndex based on sorted order
        };
      });

      return {
        chart: {
          type: 'spline',
          zooming: {
            type: 'x',
          },
        },
        title: {
          text: chartTitle,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1E232E',
          },
        },
        style: {
          fontFamily: 'sans-serif',
        },
        xAxis: {
          type: 'category',
          lineWidth: 1,
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px',
            },
          },
        },
        yAxis: {
          title: {
            text: `<b>${consumptionType} Demand in ${unit}<b>`,
          },
          labels: {
            formatter: function () {
              return convertToFuelUnitForDemandCurve(
                this.value,
                usageValueFormatDemandCurve,
                fueltype,
                DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
              );
            },
          },
          lineWidth: 1,
        },
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadSVG'],
            },
          },
          csv: {
            dateFormat: '%Y-%m-%d %H:%M:%S',
          },
        },
        tooltip: {
          formatter: function () {
            let formattedVal = convertToFuelUnitForDemandCurve(
              this.y,
              usageValueFormatDemandCurve,
              fueltype,
              DEMAND_CURVE_TYPES.DEMAND_CURVE_CHART
            );
            const consumptionType = showAverage ? 'Average' : 'Total';
            return [
              `<b>${this.key}</b><br/>`,
              `<b>${this.series?.name}</b><br/>`,
              `${consumptionType} Consumption: ${formattedVal}`,
            ];
          },
        },
        colors: metaData?.colors || ['#ACC007', '#3794FC', '#058DC7', '#50B432'],
        plotOptions: {
          series: {
            turboThreshold: 10000,
            connectNulls: true,
          },
        },
        series: sortedChartData,
      };
    }
  }
};

export const getFuelTypeforDemandCurve = (chartData) => {
  var fueltype = 'Electric';
  if (chartData?.[0]) {
    const data = chartData[0].data;
    if (data?.[0]) {
      fueltype = data[0].fuelType || 'Electric';
    }
  }
  return fueltype;
};
//1. y format
//2. x format
//3. series data
//4. tooltip
