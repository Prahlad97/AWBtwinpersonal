import React from 'react';
import { Box, Button, Card, Divider, styled } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@/assets/images/Info.svg';
import CloseIcon from '@/assets/images/cancel-icon.svg';
import { Tooltip, CircularProgress } from '@material-ui/core';
import { useAddAnotherCard } from '../../hooks/use-add-another-card';

const AddButton = styled(Button)({
  display: 'flex',
  padding: '8px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '6px',
  border: '1px solid #1E232E',
  backgroundColor: '#F4F6FA',
  color: '#1E232E',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%',
  height: '40px',
  width: '210px',
});

const useStyles = makeStyles({
  card: {
    padding: '12px 12px 12px 20px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px !important',
    gap: '8px',
    minWidth: '456px',
    flex: '1 0 0',
    boxSizing: 'border-box',
    position: 'relative',
    maxWidth: '50%',
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: '18px',
    right: '18px',
    cursor: 'pointer',
  },
});

export default function AddAnotherCard({
  comparisonData,
  close,
  handleAddDemandCurve,
  handleAddDeltaCurve,
}) {
  const classes = useStyles();
  const { curveColor, bgColor, isDemandCurveLoading, isDeltaCurveLoading, onAddDemandCurve, onAddDeltaCurve } =
    useAddAnotherCard({
      comparisonData,
      handleAddDemandCurve,
      handleAddDeltaCurve,
    });

  return (
    <Card className={classes.card} sx={{ backgroundColor: bgColor }} elevation={0}>
      <img onClick={close} className={classes.closeIcon} src={CloseIcon} alt='close' />
      <AddButton
        sx={{ ':hover': { backgroundColor: curveColor, color: 'white' } }}
        disabled={isDemandCurveLoading}
        onClick={onAddDemandCurve}
      >
        {isDemandCurveLoading ? <CircularProgress size={25} /> : 'Add a Demand Curve'}
      </AddButton>
      <Box className={classes.separator}>
        <Divider
          sx={{
            borderColor: curveColor,
            borderBottomWidth: '1px',
            width: '44%',
          }}
        />
        <Box component={'p'}>{'OR'}</Box>
        <Divider
          sx={{
            borderColor: curveColor,
            borderBottomWidth: '1px',
            width: '44%',
          }}
        />
      </Box>
      <AddButton
        sx={{ ':hover': { backgroundColor: curveColor, color: 'white' } }}
        disabled={isDeltaCurveLoading}
        endIcon={
          !isDeltaCurveLoading ? (
            <Tooltip
              arrow
              placement='bottom'
              title='A Delta Curve shows the deviation between two curves by subtracting one from the other at each point.'
              style={{ backgroundColor: 'black', width: '244px' }}
            >
              <img style={{ width: '20px' }} src={InfoIcon} alt='info' />
            </Tooltip>
          ) : null
        }
        onClick={onAddDeltaCurve}
      >
        {isDeltaCurveLoading ? <CircularProgress size={25} /> : 'Add a Delta Curve'}
      </AddButton>
    </Card>
  );
}
