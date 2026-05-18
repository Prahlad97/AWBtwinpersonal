/**
 * Production date menu: vendored picker (`LabCustomDatePicker` / `LabSelectedDateField` from AWB)
 * + layout from `new-date-range/styles.js`. No KPI row inside the menu (that was a Lab mistake).
 */
import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Typography,
  makeStyles,
  Popover,
} from '@material-ui/core';
import { Box as MuiBox, Select, MenuItem, OutlinedInput } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { useLabExtension } from '../../providers/LabExtensionProvider';
import { parseToolbarRangeLabel } from './dateRangeUtils';
import LabCustomDatePicker from './datePicker/LabCustomDatePicker.jsx';
import LabSelectedDateField from './datePicker/LabSelectedDateField.jsx';
import { CONTEXTUAL_FILTERS_OPTIONS, QUICK_SELECT_OPTIONS } from './datePicker/datePickerConstants.js';
import { selectedFilterInnerSx, selectedFilterOuterSx } from './datePicker/chipSx.js';
import ToggleOffIcon from '../../assets/images/toggle-off-icon.svg';
import ToggleOnIcon from '../../assets/images/toggle-on-icon.svg';

const MONTHS_TAB = 'Months';
const DATES_TAB = 'Dates';

const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 800,
    maxWidth: 'min(920px, 96vw)',
  },
  contentRow: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    border: '1px solid #eee',
    borderBottom: 'none',
  },
  tabsContainer: {
    overflowY: 'auto',
  },
  tabButtons: {
    display: 'inline-flex',
    backgroundColor: '#F4F6FA',
    borderRadius: '6px',
    padding: '4px',
    gap: '4px',
    width: '170px',
    height: '40px',
  },
  selectedTab: {
    backgroundColor: '#FFFFFF',
    fontSize: '16px',
    textTransform: 'none',
    borderRadius: '4px',
    padding: '7px 16px',
    minWidth: 0,
    color: '#1E232E',
    fontWeight: 500,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },
  unselectedTab: {
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontSize: '16px',
    borderRadius: '4px',
    padding: '7px 16px',
    minWidth: 0,
    color: '#565E6E',
    fontWeight: 400,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  dateRangeSection: {
    display: 'flex',
    maxHeight: '480px',
    padding: '16px 32px 32px',
    gap: '24px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  filterSection: {
    padding: '20px 24px',
    width: '200px',
    flexShrink: 0,
    maxHeight: '480px',
    borderLeft: '1px solid #eee',
    boxSizing: 'border-box',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
  },
  multiDateFilterSection: {
    width: '236px !important',
  },
  filterLabels: {
    fontWeight: 500,
    fontSize: '14px',
    marginBottom: '12px',
  },
  contextualFilterLabel: {
    fontSize: '14px',
  },
  contextualFilterDropdown: {
    borderRadius: '6px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D0D6E7',
    marginTop: '4px',
    fontSize: '14px',
    fontWeight: 400,
    textTransform: 'none',
    height: '40px',
    overflow: 'hidden',
    '&:before': { borderBottom: 'none' },
    '&:after': { borderBottom: 'none' },
    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
  },
  quickSelectBtn: {
    borderRadius: '4px',
    padding: '2px 6px',
    fontSize: '13px',
    marginRight: '4px',
    marginBottom: '7px',
    textTransform: 'none',
    backgroundColor: '#F4F6FA',
    color: '#1E232E',
    fontWeight: 400,
  },
  selectedQuickOptionBtn: {
    color: '#1D5ED8',
    backgroundColor: '#EFF5FF',
    '&:hover': {
      backgroundColor: '#EFF5FF',
    },
  },
  viewMoreBtn: {
    fontSize: '14px',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '12px',
  },
  divider: {
    marginRight: '24px',
    marginLeft: '24px',
    marginTop: '16px',
  },
  footerSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 28px',
  },
  toggleIcon: {
    width: '48px',
    height: '30px',
    marginLeft: '4px',
    marginTop: '3px',
    cursor: 'pointer',
  },
  submitBtn: {
    backgroundColor: '#1D5ED8',
    fontSize: '16px',
    textTransform: 'none',
    padding: '12px 24px',
    fontWeight: 500,
    lineHeight: '150%',
    borderRadius: '6px',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#1a54c4',
    },
  },
}));

const INITIAL_SELECTED = CONTEXTUAL_FILTERS_OPTIONS.reduce((acc, { id }) => ({ ...acc, [id]: [] }), {});

export default function DateRangePanel({ anchorEl, open, onClose, label, onSelectLabel }) {
  const classes = useStyles();
  const {
    state: { isDashboardLoading },
  } = useLabExtension();

  const [selectedTab, setSelectedTab] = useState(MONTHS_TAB);
  const [isMultiDateSelect, setIsMultiDateSelect] = useState(false);
  const [startDate, setStartDate] = useState(() => moment('2023-01-01').toDate());
  const [endDate, setEndDate] = useState(() => moment('2023-12-31').toDate());
  const [selectedDates, setSelectedDates] = useState([]);
  const [quickActiveId, setQuickActiveId] = useState(null);
  const [filtersToShow, setFiltersToShow] = useState(2);
  const [selectedFilters, setSelectedFilters] = useState(() => ({ ...INITIAL_SELECTED }));

  const isMonth = selectedTab === MONTHS_TAB;
  const maxPickerDate = useMemo(() => (isMonth ? moment().startOf('month').toDate() : moment().toDate()), [isMonth]);

  useEffect(() => {
    if (!open) return;
    const parsed = parseToolbarRangeLabel(label);
    if (parsed) {
      const s = moment([parsed.from.year, parsed.from.month, parsed.from.day]).startOf('day').toDate();
      const e = moment([parsed.to.year, parsed.to.month, parsed.to.day]).startOf('day').toDate();
      setStartDate(s);
      setEndDate(e);
    }
    setQuickActiveId(null);
  }, [open, label]);

  const toggleMultiMode = () => {
    setIsMultiDateSelect((prev) => {
      const next = !prev;
      if (next) {
        setSelectedDates([]);
      } else {
        setSelectedDates([]);
      }
      return next;
    });
  };

  const onStartDateChange = (d) => {
    if (!d) return;
    const adjusted = isMonth ? moment(d).startOf('month').toDate() : d;
    setStartDate(adjusted);
  };

  const onEndDateChange = (d) => {
    if (!d) return;
    let adjusted = isMonth ? moment(d).endOf('month').toDate() : d;
    if (moment(adjusted).isAfter(moment())) {
      adjusted = moment().toDate();
    }
    setEndDate(adjusted);
  };

  const handleQuickSelect = (optionId) => {
    const today = moment().endOf('day');
    let start = null;
    let end = today.toDate();

    switch (optionId) {
      case 'last3m':
        start = moment().subtract(3, 'months').startOf('day').toDate();
        break;
      case 'last6m':
        start = moment().subtract(6, 'months').startOf('day').toDate();
        break;
      case 'last12m':
        start = moment().subtract(12, 'months').startOf('day').toDate();
        break;
      case 'year2022':
        start = moment('2022-01-01').toDate();
        end = moment('2022-12-31').toDate();
        break;
      case 'year2023':
        start = moment('2023-01-01').toDate();
        end = moment('2023-12-31').toDate();
        break;
      case 'year2024':
        start = moment('2024-01-01').toDate();
        end = moment('2024-12-31').toDate();
        break;
      case 'year2025':
        start = moment('2025-01-01').toDate();
        end = moment('2025-12-31').toDate();
        break;
      default:
        return;
    }
    setQuickActiveId(optionId);
    setSelectedTab(MONTHS_TAB);
    setStartDate(start);
    setEndDate(end);
    setIsMultiDateSelect(false);
    setSelectedDates([]);
  };

  const handleContextualFilterChange = (id, value) => {
    setSelectedFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleRemoveSelectedFilter = (id, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [id]: (prev[id] || []).filter((item) => item !== value),
    }));
  };

  const handleRemoveAllSelectedFilters = (id) => {
    setSelectedFilters((prev) => ({ ...prev, [id]: [] }));
  };

  const contextualFilters = CONTEXTUAL_FILTERS_OPTIONS;

  const applyLabel = () => {
    if (isMultiDateSelect) {
      const sorted = [...selectedDates].sort((a, b) => a - b);
      if (!sorted.length) return '';
      return `${moment(sorted[0]).format('DD MMM YYYY')} - ${moment(sorted[sorted.length - 1]).format(
        'DD MMM YYYY'
      )}`;
    }
    if (!startDate || !endDate) return '';
    return `${moment(startDate).format('DD MMM YYYY')} - ${moment(endDate).format('DD MMM YYYY')}`;
  };

  const handleApply = () => {
    const next = applyLabel();
    if (next) onSelectLabel(next);
    onClose();
  };

  const applyDisabled =
    isDashboardLoading ||
    (!isMultiDateSelect && (!startDate || !endDate)) ||
    (isMultiDateSelect && selectedDates.length === 0);

  const minDateTo = startDate
    ? isMonth
      ? moment(startDate).add(1, 'month').startOf('month').toDate()
      : moment(startDate).add(1, 'day').toDate()
    : undefined;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{ className: classes.paper }}
    >
      <MuiBox sx={{ backgroundColor: '#fff' }}>
        <Box className={classes.contentRow}>
          <FormControl style={{ flex: 1, minWidth: 0 }}>
            <Box className={classes.tabsContainer}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: isMultiDateSelect ? 560 : '100%',
                  marginTop: 24,
                }}
              >
                <Box className={classes.tabButtons}>
                  {[MONTHS_TAB, DATES_TAB].map((tab) => (
                    <Button
                      key={tab}
                      disableElevation
                      disableRipple
                      variant="contained"
                      className={selectedTab === tab ? classes.selectedTab : classes.unselectedTab}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab}
                    </Button>
                  ))}
                </Box>
              </Box>

              <Box className={classes.dateRangeSection}>
                {isMultiDateSelect ? (
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                    }}
                  >
                    <LabSelectedDateField
                      label={isMonth ? 'Select Months' : 'Select Dates'}
                      value={startDate}
                      monthMode={isMonth}
                      isMultiDateSelect
                      selectedDates={selectedDates}
                      onDateRemove={(index) => {
                        setSelectedDates((prev) => prev.filter((_, i) => i !== index));
                      }}
                      highlightedDates={{}}
                    />
                    <LabCustomDatePicker
                      monthRange={isMonth}
                      isMultiDateSelect
                      selectedDates={selectedDates}
                      onChange={(d) => setSelectedDates(d)}
                      highlightedDates={{}}
                      maxDate={maxPickerDate}
                    />
                  </Box>
                ) : (
                  <>
                    <Box style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 8 }}>
                      <LabSelectedDateField label="From" value={startDate} monthMode={isMonth} />
                      <LabCustomDatePicker
                        monthRange={isMonth}
                        selectedDate={startDate}
                        onChange={onStartDateChange}
                        maxDate={maxPickerDate}
                        highlightedDates={{}}
                      />
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 8 }}>
                      <LabSelectedDateField label="To" value={endDate} monthMode={isMonth} highlightedDates={{}} />
                      <LabCustomDatePicker
                        monthRange={isMonth}
                        selectedDate={endDate}
                        onChange={onEndDateChange}
                        minDate={minDateTo}
                        maxDate={maxPickerDate}
                        highlightedDates={{}}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </FormControl>

          <Box
            className={`${classes.filterSection} ${isMultiDateSelect ? classes.multiDateFilterSection : ''}`}
          >
            {!isMultiDateSelect && (
              <Box mb={2}>
                <Typography className={classes.filterLabels}>Quick Select</Typography>
                {QUICK_SELECT_OPTIONS.map((opt) => (
                  <Button
                    key={opt.id}
                    size="small"
                    className={`${classes.quickSelectBtn} ${
                      quickActiveId === opt.id ? classes.selectedQuickOptionBtn : ''
                    }`}
                    onClick={() => handleQuickSelect(opt.id)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </Box>
            )}
            <Typography className={classes.filterLabels}>Contextual Filters</Typography>
            <MuiBox
              sx={{
                maxHeight: filtersToShow > 2 || isMultiDateSelect ? 'auto' : 200,
                overflowY: filtersToShow > 2 || isMultiDateSelect ? 'auto' : 'hidden',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {contextualFilters.slice(0, filtersToShow).map(({ id, label: flabel, dropdownOptions }) => (
                <MuiBox key={id} mb={2}>
                  <Typography className={classes.contextualFilterLabel}>{flabel}</Typography>
                  <Select
                    multiple
                    displayEmpty
                    value={selectedFilters[id] || []}
                    onChange={(e) => handleContextualFilterChange(id, e.target.value)}
                    input={<OutlinedInput />}
                    variant="standard"
                    fullWidth
                    className={classes.contextualFilterDropdown}
                    MenuProps={{
                      PaperProps: { style: { maxHeight: 200 } },
                    }}
                    renderValue={(selected) => {
                      if (!Array.isArray(selected) || selected.length === 0) {
                        return (
                          <MuiBox
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              color: 'text.secondary',
                              marginLeft: '8px',
                            }}
                          >
                            is any value
                          </MuiBox>
                        );
                      }
                      return (
                        <MuiBox sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <MuiBox sx={selectedFilterOuterSx}>
                            {selected.map((data) => (
                              <MuiBox sx={selectedFilterInnerSx} key={data}>
                                <MuiBox>{data}</MuiBox>
                                <CloseIcon
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    cursor: 'pointer',
                                    color: '#9e9e9e',
                                  }}
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
                                  onClick={() => handleRemoveSelectedFilter(id, data)}
                                />
                              </MuiBox>
                            ))}
                          </MuiBox>
                          <CloseIcon
                            sx={{ width: 20, height: 20, cursor: 'pointer', color: '#9e9e9e' }}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                            onClick={() => handleRemoveAllSelectedFilters(id)}
                          />
                        </MuiBox>
                      );
                    }}
                  >
                    {dropdownOptions.map((opt) => (
                      <MenuItem key={opt.key} value={opt.value}>
                        {opt.value}
                      </MenuItem>
                    ))}
                  </Select>
                </MuiBox>
              ))}
            </MuiBox>
            {filtersToShow < contextualFilters.length && (
              <Typography className={classes.viewMoreBtn} onClick={() => setFiltersToShow((n) => n + 6)}>
                View more
              </Typography>
            )}
          </Box>
        </Box>

        <Divider className={classes.divider} />
        <Box className={classes.footerSection}>
          <Box display="flex" alignItems="center">
            <Typography>Multi-date Select</Typography>
            <Box
              component="img"
              src={isMultiDateSelect ? ToggleOnIcon : ToggleOffIcon}
              alt=""
              className={classes.toggleIcon}
              onClick={toggleMultiMode}
            />
          </Box>
          <Button
            variant="contained"
            className={classes.submitBtn}
            onClick={handleApply}
            disabled={applyDisabled}
          >
            Apply
          </Button>
        </Box>
      </MuiBox>
    </Popover>
  );
}
