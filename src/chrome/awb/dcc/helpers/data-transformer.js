import moment from 'moment';
import { getCurveOptions, getFuelTypeforDemandCurve } from './demand-curve-charts';

export function formatToMonthYear(input) {
  const parsed = moment(input, ['YYYY-MM-DD HH', moment.ISO_8601], true);
  return parsed.isValid() ? parsed.format('MMM') : undefined;
}

export const parse576ChartData = (csvData) => {
  const lines = csvData.split('\n');
  const maxSeriesData = [];
  const minSeriesData = [];
  const xCategories = [];

  lines.forEach((line, index) => {
    if (index === 0 && line.includes('Demand Curve Sdt Date Month Name')) {
      return;
    }

    if (!line.trim()) {
      return;
    }

    const columns = line.split(',');
    if (columns.length >= 5) {
      const year = parseInt(columns[0]);
      const monthName = columns[1].trim();
      const hourOfDay = parseInt(columns[2]);
      const maxVal = parseFloat(columns[3]);
      const minVal = parseFloat(columns[4]);

      const dateString = `${year}-${monthName}-${hourOfDay}`;

      if (!isNaN(maxVal) && !isNaN(minVal)) {
        maxSeriesData.push({ name: dateString, y: maxVal });
        minSeriesData.push({ name: dateString, y: minVal });
        xCategories.push(dateString);
      }
    }
  });

  return { maxSeriesData, minSeriesData, xCategories };
};

export const convertCSVDataforDuration = (data, duration, fuelType, isAwbV2) => {
  let baseData = isAwbV2 ? X_AXIS_DATA_V2[duration] : X_AXIS_DATA[duration];
  let series = data.split('\n');
  let convData = [];

  for (let i = 0; i < baseData.length; i++) {
    let val = undefined;
    let found = false;

    // Search for matching key in series data
    for (let j = 0; j < series.length; j++) {
      const seriesItem = series[j].trim();
      if (!seriesItem) continue; // Skip empty lines

      const [k, v] = seriesItem.split(',');
      if (k && k.trim() === baseData[i]) {
        val = v;
        found = true;
        break; // Found the match, exit the inner loop
      }
    }
    if (found) {
      convData.push({
        x: i,
        y: val !== undefined ? (isNaN(parseFloat(val)) ? 0 : parseFloat(val)) : 0,
        fuelType: fuelType,
      });
    }
  }
  return convData;
};

export const durationMapping = {
  MONTHLY: 'MONTHLY',
  HOURLY: 'HOURLY',
  DAILY: 'DAILY',
  KW_MONTHLY: 'MONTHLY',
  KW_DAILY: 'DAILY',
  KW_HOURLY: 'HOURLY',
  576: '576',
  8760: '8760',
};

export const convertCSVDataforDemandCurve = (data, duration, fuelType) => {
  let baseData = X_AXIS_DATA_V2[durationMapping[duration]];
  let series = data.split('\n');
  let seriesData = [];
  let xCategories = [];
  if (duration === '8760') {
    series.forEach((s) => {
      let [k, v] = s.split(',');

      const xAxisPoint = formatToMonthYear(k);
      const parsed = moment(k).format('YYYY-MMM-DD HH');
      if (xAxisPoint && baseData.includes(xAxisPoint)) {
        seriesData.push({ name: parsed, y: parseFloat(v) });
        xCategories.push(parsed);
      }
    });
  } else if (duration === '576') {
    const {
      maxSeriesData,
      minSeriesData,
      xCategories: parsedXCategories,
    } = parse576ChartData(data);

    return {
      seriesData: [maxSeriesData, minSeriesData],
      xCategories: parsedXCategories,
      is576Chart: true,
    };
  } else {
    // For other durations (MONTHLY, DAILY, HOURLY), match baseData with series data
    for (let i = 0; i < baseData?.length; i++) {
      let val = undefined;
      let found = false;

      // Search for matching key in series data
      for (let j = 0; j < series.length; j++) {
        const seriesItem = series[j].trim();
        if (!seriesItem) continue; // Skip empty lines

        const [k, v] = seriesItem.split(',');
        if (k && k.trim() === baseData[i]) {
          val = v;
          found = true;
          break; // Found the match, exit the inner loop
        }
      }

      if (found) {
        seriesData.push({
          x: i,
          y: val !== undefined ? (isNaN(parseFloat(val)) ? 0 : parseFloat(val)) : 0,
          fuelType: fuelType,
        });
      }

      xCategories.push(baseData[i]);
    }
  }
  return { seriesData, xCategories };
};

export const getFuelType = (segment) => {
  let usageFilter = segment.filters.find((s) => s['field_name'].includes('usage_type'));
  return usageFilter['filter_value'];
};

export const getFuelTypeV2 = (segment) => {
  let usageFilter = segment?.filters?.['Fuel Type'] || '';
  return usageFilter === 'Electricity' ? 'Electric' : usageFilter || '';
};

export const getEvTrendData = (data, fuelType) => {
  let dataPoints = data.split('\n');
  let payload = {
    xAxisData: [],
    growthSeries: {
      name: 'Growth',
      data: [],
    },
    newSeries: {
      data: [],
      name: 'New',
      type: 'spline',
      zIndex: 5,
    },
  };
  let i = 0;
  dataPoints.shift();
  dataPoints.forEach((d) => {
    let [monthYear, growth, newAdded] = d.split(',');
    payload.xAxisData.push(monthYear);
    payload.growthSeries.data.push({
      x: i,
      y: parseFloat(growth),
      fuelType,
    });
    payload.newSeries.data.push({
      x: i,
      y: parseFloat(newAdded),
      fuelType,
    });
    i++;
  });
  return payload;
};

export const getMockOptions = (analysisData, usageValueFormat) => {
  const chartSeries = [
    {
      name: 'Segment',
      data: [
        {
          x: 0,
          y: 1082.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 1,
          y: 1092.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 2,
          y: 1182.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 3,
          y: 1192.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 4,
          y: 1152.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 5,
          y: 1112.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 6,
          y: 1082.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 7,
          y: 1382.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 8,
          y: 1342.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 9,
          y: 1582.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 10,
          y: 1682.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 11,
          y: 1582.7889489200002,
          fuelType: 'Electric',
        },
        {
          x: 12,
          y: 1482.7889489200002,
          fuelType: 'Electric',
        },
      ],
    },
  ];
  const chartMetaInfo = {
    xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yTitle: 'Total Consumption',
    colors: ['#ADD8E6'],
  };
  const fueltype = getFuelTypeforDemandCurve(chartSeries);
  return getCurveOptions(
    analysisData.type,
    chartSeries,
    chartMetaInfo,
    usageValueFormat,
    10000,
    fueltype
  );
};

export const isEmptyData = (data) => {
  let series = data?.split('\n') || [];
  series = series.filter((s) => s.length > 0);
  return series.length < 2;
};

export const X_AXIS_DATA = {
  MONTHLY: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  HOURLY: [
    '12 AM',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM',
  ],
  DAILY: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  AMPLITUDE_BUCKETS: ['4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11+'],
};

export const X_AXIS_DATA_V2 = {
  MONTHLY: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  HOURLY: [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ],
  DAILY: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  AMPLITUDE_BUCKETS: ['4-5', '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11+'],
  8760: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  576: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};
