import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';
import DemandCurveFilled from './pages/dcc-filled';
import DemandCurveEmpty from './pages/dcc-empty';
import { ExtensionContext } from '@/extension-context';
import { makeStyles } from '@material-ui/core/styles';
import { DemandCurveContext } from '@/contexts/demand-curve-context';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    marginLeft: -24,
    marginRight: -24,
    marginBottom: -12,
    height: '100vh',
  },
});

export default function DemandCurveMain() {
  const [isFilled, setIsFilled] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const classes = useStyles();

  const {
    state: { allowedPilotName, userInfo },
  } = useContext(ExtensionContext);

  const {
    state: { allComparisons },
  } = useContext(DemandCurveContext);

  useEffect(() => {
    setIsFilled((allComparisons?.length || 0) > 0);
  }, [allComparisons]);

  return (
    <Box className={classes.root}>
      {isFilled ? (
        <DemandCurveFilled />
      ) : (
        <DemandCurveEmpty pilotName={allowedPilotName} userEmail={userInfo?.email} />
      )}
    </Box>
  );
}
