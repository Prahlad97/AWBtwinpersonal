/**
 * Vendored from AWB `new-date-picker/date-picker.js` — paths + header layout only.
 * Highlights use empty object (no VPP palette in Lab).
 */
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import moment from 'moment';
import enGB from 'date-fns/locale/en-GB';
import { registerLocale } from 'react-datepicker';

import ChevRight from '../../../assets/images/chev-right.svg';
import ChevLeft from '../../../assets/images/chev-left.svg';
import ChevDoubleLeft from '../../../assets/images/chev-double-left.svg';
import ChevDoubleRight from '../../../assets/images/chev-double-right.svg';
import { fontStyling } from '../style-utils';

registerLocale('en-GB', enGB);

const useStyles = makeStyles(() => ({
  calendar: {
    border: 'none',
    borderRadius: 0,
    '& .react-datepicker__day--outside-month': {
      visibility: 'hidden !important',
      pointerEvents: 'none !important',
    },
    '& .react-datepicker__header': {
      borderRadius: 0,
      border: 'none',
      backgroundColor: 'transparent',
      padding: '2px 0',
    },
    '& .react-datepicker__triangle': {
      display: 'none',
    },
    '& .react-datepicker__month-container': {
      width: '100%',
    },
    '& .react-datepicker': {
      border: 'none',
      boxShadow: 'none',
    },
    '& .react-datepicker__month-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flexWrap: 'wrap',
      alignSelf: 'stretch',
      width: '240px',
    },
    '& .react-datepicker__month': {
      margin: 0,
    },
    '& .react-datepicker__day-names': {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      width: '240px',
      gap: '2px',
    },
    '& .react-datepicker__week': {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      width: '240px',
    },
    '& .react-datepicker__month-text--disabled': {
      opacity: 0.4,
      pointerEvents: 'none',
      backgroundColor: '#f5f5f5',
      color: '#999 !important',
      cursor: 'not-allowed !important',
    },
    width: '240px',
  },
  multiDateSelect: {
    width: '360px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .react-datepicker__month-wrapper': {
      width: '360px !important',
    },
    '& .react-datepicker__week': {
      width: '360px !important',
    },
  },
  datePickerDay: {
    width: '32px',
    height: '30px',
    fontWeight: 400,
    fontSize: '14px',
    padding: '1px',
    backgroundColor: 'transparent',
    color: '#1E232E !important',
    borderRadius: '4px',
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid #1D5ED8',
      color: '#1D5ED8',
      backgroundColor: '#EFF5FF',
    },
    '&.react-datepicker__day--in-range, &.react-datepicker__day--selected': {
      backgroundColor: '#1D5ED8',
      color: '#FFFFFFF7 !important',
    },
    '&.react-datepicker__day--disabled': {
      opacity: 0.4,
      pointerEvents: 'none',
      backgroundColor: '#f5f5f5',
      color: '#999 !important',
      cursor: 'not-allowed !important',
    },
    margin: '1px',
  },
  multiDateSelectDay: {
    width: '49px !important',
    height: '32px !important',
  },
  datePickerWeek: {
    fontWeight: 100,
    fontSize: '12px',
  },
  multiDateSelectWeek: {
    width: '43px !important',
    margin: '3px !important',
  },
  datePickerMonth: {
    height: '40px',
    fontSize: '14px',
    fontWeight: 400,
    borderRadius: '6px',
    padding: '10px',
    border: '1px solid #EAEDF6',
    backgroundColor: '#FFFFFF',
    color: '#1E232E',
    display: 'flex',
    width: '76px !important',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      border: '1px solid #1D5ED8',
      color: '#1D5ED8',
      backgroundColor: '#EFF5FF',
    },
    '&.react-datepicker__month-text--selected': {
      backgroundColor: '#1D5ED8',
      color: '#FFFFFFF7',
    },
  },
  multiDateSelectMonth: {
    width: '116px !important',
  },
  headercontainer: {
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #EAEDF6',
    alignItems: 'center',
    width: '240px',
    height: '45px',
    padding: '0 16px',
    borderRadius: '6px',
  },
  multiDateSelectHeader: {
    width: '360px !important',
  },
  navigationButton: {
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    cursor: 'pointer',
  },
  monthYear: {
    ...fontStyling('Roboto, sans-serif', '14px', 500, '20px'),
  },
}));

function CustomHeader({
  decrease,
  increase,
  monthDate,
  monthRange,
  isMultiDateSelect = false,
  decreaseMonth,
  increaseMonth,
}) {
  const classes = useStyles();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div
      className={`${classes.headercontainer} ${isMultiDateSelect ? classes.multiDateSelectHeader : ''}`}
      style={{ justifyContent: isMultiDateSelect ? 'center' : 'space-between' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button type="button" className={classes.navigationButton} onClick={decrease}>
          <img src={ChevDoubleLeft} alt="" />
        </button>
        {!monthRange && (
          <button type="button" className={classes.navigationButton} onClick={decreaseMonth}>
            <img src={ChevLeft} alt="" />
          </button>
        )}
      </div>

      <div className={classes.monthYear}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {!monthRange && <span>{months[monthDate.getMonth()]}</span>}
          <span>{monthDate.getFullYear()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {!monthRange && (
          <button type="button" className={classes.navigationButton} onClick={increaseMonth}>
            <img src={ChevRight} alt="" />
          </button>
        )}
        <button type="button" className={classes.navigationButton} onClick={increase}>
          <img src={ChevDoubleRight} alt="" />
        </button>
      </div>
    </div>
  );
}

export default function LabCustomDatePicker({
  onChange,
  monthRange = false,
  isMultiDateSelect = false,
  selectedDate,
  minDate,
  maxDate,
  selectedDates = [],
  highlightedDates = {},
}) {
  const classes = useStyles();

  const highlightStyleTag =
    Object.keys(highlightedDates).length > 0 ? (
      <style>
        {Object.entries(highlightedDates)
          .map(([date, colorConfig]) => {
            const className = `highlight-${date}`;
            const classNameSelected = `highlight-${date}.react-datepicker__day--selected`;
            return `
            .${className} {
              background-color: ${colorConfig.default} !important;
              color: ${colorConfig.selected} !important;
              border-radius: 6px;
            }
            .${classNameSelected} {
              background-color: ${colorConfig.selected} !important;
              color: #ffffff !important;
            }
          `;
          })
          .join('\n')}
      </style>
    ) : null;

  const finalSelectedDate = !isMultiDateSelect
    ? selectedDate && (!maxDate || moment(selectedDate).isSameOrBefore(maxDate, monthRange ? 'month' : 'day'))
      ? selectedDate
      : null
    : null;

  const monthRangeProps = {
    showMonthYearPicker: true,
    showFourColumnMonthYearPicker: false,
    monthClassName: (date) => {
      const isSelected = isMultiDateSelect
        ? selectedDates?.some((d) => d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth())
        : selectedDate &&
          selectedDate.getFullYear() === date.getFullYear() &&
          selectedDate.getMonth() === date.getMonth();

      return `${classes.datePickerMonth} ${isMultiDateSelect ? classes.multiDateSelectMonth : ''} ${
        isSelected ? 'react-datepicker__month-text--selected' : ''
      }`;
    },
  };

  const dateRangeProps = {
    useWeekdaysShort: true,
    dayClassName: (date) => {
      const isSelected = isMultiDateSelect
        ? selectedDates?.some((d) => d.toDateString() === date.toDateString())
        : selectedDate && date.toDateString() === selectedDate.toDateString();

      const formatted = moment(date).format('YYYY-MM-DD');
      const isHighlighted = highlightedDates[formatted];

      return `${classes.datePickerDay} ${isMultiDateSelect ? classes.multiDateSelectDay : ''} ${
        isSelected ? 'react-datepicker__day--selected' : ''
      } ${isHighlighted ? `highlight-${formatted}` : ''}`;
    },
    weekDayClassName: () => `${classes.datePickerWeek} ${isMultiDateSelect ? classes.multiDateSelectWeek : ''}`,
  };

  const datePickerProps = monthRange ? monthRangeProps : dateRangeProps;

  const renderHeader = ({ decreaseYear, increaseYear, decreaseMonth, increaseMonth, monthDate }) => (
    <CustomHeader
      decrease={decreaseYear}
      increase={increaseYear}
      monthDate={monthDate}
      monthRange={monthRange}
      isMultiDateSelect={isMultiDateSelect}
      decreaseMonth={decreaseMonth}
      increaseMonth={increaseMonth}
    />
  );

  const dates = selectedDates || [];

  const openToWhenMulti =
    dates.length > 0
      ? dates[0]
      : monthRange
        ? moment(maxDate).startOf('month').toDate()
        : maxDate;

  return (
    <Box
      className={`${classes.calendar} ${isMultiDateSelect ? classes.multiDateSelect : ''}`}
      style={{ position: 'relative' }}
    >
      {highlightStyleTag}
      <DatePicker
        locale="en-GB"
        selected={finalSelectedDate}
        inline
        maxDate={maxDate}
        minDate={minDate}
        renderCustomHeader={renderHeader}
        peekNextMonth={false}
        showPreviousMonths={false}
        openToDate={isMultiDateSelect ? openToWhenMulti : finalSelectedDate || undefined}
        {...datePickerProps}
        onChange={(date) => {
          if (!date) return;
          if (isMultiDateSelect) {
            if (monthRange) {
              const sameMonth = (a, b) =>
                a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
              const normalized = moment(date).startOf('month').toDate();
              const exists = dates.some((d) => sameMonth(d, normalized));
              const updated = exists
                ? dates.filter((d) => !sameMonth(d, normalized))
                : [...dates, normalized];
              onChange(updated);
              return;
            }
            const exists = dates.some((d) => d.toDateString() === date.toDateString());
            const updated = exists ? dates.filter((d) => d.toDateString() !== date.toDateString()) : [...dates, date];
            onChange(updated);
          } else {
            onChange(date);
          }
        }}
      />
    </Box>
  );
}
