/** Vendored from AWB `new-date-picker/selected-date.js` — removed `sx` on MUI v4 Box (use inline style for highlights). */
import { useState } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import CrossIcon from '../../../assets/images/cross.svg';
import moment from 'moment';

const useStyles = makeStyles({
  dateRangeLabel: {
    fontSize: '14px !important',
    fontWeight: '500 !important',
    marginLeft: '4px !important',
  },
  selectField: {
    width: '240px',
    borderRadius: '6px',
    padding: '2px 4px',
    fontSize: '14px',
    fontWeight: 400,
    backgroundColor: '#fff',
    height: '40px !important',
    display: 'flex',
    alignItems: 'center',
    marginTop: '2px',
    overflow: 'hidden',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    border: '2px solid #1D5ED8',
  },
  multiDateSelectField: {
    width: '380px',
    height: 'auto !important',
    minHeight: '40px',
    flexWrap: 'wrap',
    overflowY: 'auto',
    maxHeight: '76px',
    gap: '4px',
    scrollbarWidth: '2px',
  },
  datePill: {
    padding: '7px 10px',
    borderRadius: '4px',
    fontWeight: 400,
    fontSize: '13px',
    color: '#1D5ED8',
    backgroundColor: '#EFF5FF',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '4px',
    cursor: 'pointer',
    minWidth: '106px',
  },
  selectedPill: {
    backgroundColor: '#FDF2F8',
    color: '#9D174D',
    gap: 0,
    width: 'auto',
  },
  crossIcon: {
    fontSize: '16px',
    height: '16px',
    marginLeft: '6px',
    color: '#D32F2F',
  },
  displayText: {
    fontSize: '14px',
    fontWeight: 400,
    paddingLeft: '12px',
  },
  mutedDisplayText: {
    color: '#B3BCD0',
  },
});

export default function LabSelectedDateField({
  label,
  value,
  monthMode = false,
  isMultiDateSelect = false,
  selectedDates,
  onDateRemove = () => {},
  highlightedDates = {},
}) {
  const classes = useStyles();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const displayText = value
    ? monthMode
      ? moment(value).format('MMM YYYY')
      : moment(value).format('D MMM YYYY')
    : 'Select';

  const getProcessedDates = () => {
    if (!isMultiDateSelect || !selectedDates?.length) {
      return selectedDates || [];
    }

    if (!monthMode) {
      return selectedDates;
    }

    const uniqueMonths = new Map();
    selectedDates.forEach((date) => {
      const monthKey = moment(date).format('YYYY-MM');
      if (!uniqueMonths.has(monthKey)) {
        uniqueMonths.set(monthKey, moment(date).startOf('month').toDate());
      }
    });

    return Array.from(uniqueMonths.values());
  };

  const processedDates = getProcessedDates();

  const handleRemove = (index) => {
    if (monthMode && isMultiDateSelect) {
      const monthToRemove = processedDates[index];
      const monthKey = moment(monthToRemove).format('YYYY-MM');
      const indicesToRemove = [];
      selectedDates.forEach((date, originalIndex) => {
        if (moment(date).format('YYYY-MM') === monthKey) {
          indicesToRemove.push(originalIndex);
        }
      });
      indicesToRemove.reverse().forEach((originalIndex) => {
        onDateRemove(originalIndex);
      });
    } else {
      onDateRemove(index);
    }
    setHoveredIndex(null);
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography className={classes.dateRangeLabel}>{label}</Typography>
      <Box
        className={`${classes.selectField} ${isMultiDateSelect ? classes.multiDateSelectField : ''}`}
      >
        {isMultiDateSelect ? (
          processedDates?.length ? (
            processedDates.map((date, index) => {
              const isHover = index === hoveredIndex;
              const formattedDate = moment(date).format('YYYY-MM-DD');
              const hi = highlightedDates[formattedDate];

              return (
                <Box
                  key={monthMode ? moment(date).format('YYYY-MM') : index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`${classes.datePill} ${isHover ? classes.selectedPill : ''}`}
                  style={
                    hi
                      ? {
                          backgroundColor: hi.default,
                          color: hi.selected,
                        }
                      : undefined
                  }
                >
                  {moment(date).format(monthMode ? 'MMM YYYY' : 'D MMM YYYY')}
                  {isHover && (
                    <img
                      src={CrossIcon}
                      alt=""
                      className={classes.crossIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(index);
                      }}
                    />
                  )}
                </Box>
              );
            })
          ) : (
            <Typography className={`${classes.displayText} ${classes.mutedDisplayText}`}>
              {monthMode ? 'Select multiple months' : 'Select multiple dates'}
            </Typography>
          )
        ) : (
          <Typography className={`${classes.displayText} ${!value ? classes.mutedDisplayText : ''}`}>
            {displayText}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
