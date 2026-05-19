import React from 'react';
import { Box, Grid, CircularProgress } from '@material-ui/core';
import { useLayoutStyles } from './styles';
import { useDccLayout } from '../../hooks/use-dcc-layout';

export default function DemandCurveLayout({ children }) {
  const classes = useLayoutStyles();
  const { isFetching } = useDccLayout();

  return (
    <Box className={classes.tabControls}>
      {isFetching ? (
        <Grid container className={classes.circularProgressContainer}>
          <CircularProgress className={classes.circularProgress} />
        </Grid>
      ) : (
        children
      )}
    </Box>
  );
}
