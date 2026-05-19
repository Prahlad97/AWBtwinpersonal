/** MUI sx / style objects for DemandCurveSegment (dcc-segment.js). */
const styles = {
  popoverContentSx: {
    width: '1000px',
  },
  savedBidgelyContainerSx: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    borderRadius: '8px',
    width: '900px',
    padding: '20px 16px',
  },
  savedBidgelyMainComponentSx: {
    width: '85%',
    borderRadius: '6px',
    padding: '8px 12px',
    backgroundColor: '#F4F6FA',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#EFF5FF',
    },
  },
  savedBidgelyNameSx: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#1E232E',
  },
  invertComponentSx: {
    padding: '8px 12px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    backgroundColor: '#F4F6FA',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: '#EFF5FF',
    },
  },
  toggleSx: {
    '& .MuiSwitch-switchBase': {
      color: '#E0E0E0',
      '&.Mui-checked': {
        color: '#1D5ED8',
      },
      '&.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#1D5ED8',
      },
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#E0E0E0',
    },
  },
  invertTextSx: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#1E232E',
  },
  programSegmentContainerSx: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    borderRadius: '8px',
    width: '900px',
    padding: '20px 16px',
    '& > *': { flex: 1 },
  },
  segmentListPopoverSlotSx: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: 3,
  },
};

export default styles;
