import React from 'react';
import {
  Box,
  Button,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useDccDetails } from '../../hooks/use-dcc-details';
import { DemandCurveCard, DeltaCurveCard, AddAnotherCard } from '../../components/cards';
import { DemandCurveComparisonHeader } from '../../components/layout';
import AWBHighchart from '@/dataviz/highcharts/AWBHighchart';
import { DCC_CHART_MESSAGES } from '@/constants/demand-curve-constants';
import CloseIcon from '@/segments/assets/close_icon.svg';
import { useComparisonPageStyles, dccStylesSx } from './styles';

export default function DemandCurveComparison() {
  const classes = useComparisonPageStyles();
  const styles = dccStylesSx;
  const {
    chartRef,
    cardContainerRef,
    history,
    comparisonData,
    sortedCurves,
    showAddAnotherCurve,
    setShowAddAnotherCurve,
    handleCloseAddAnother,
    handleAddDemandCurve,
    handleAddDeltaCurve,
    handleCurveDataChange,
    demandCurveOptionBtnText,
    handleDemandCurveOptionChange,
    handleConsumptionOptionChange,
    handleSaveComparison,
    isFetching,
    isComparing,
    options,
    handleCompareClick,
    removeDeltaCurveCard,
    removeDemandCurveCard,
    handleDeltaCurveDelete,
    handleDeltaCurveUpdate,
    handleDemandCurveDelete,
    handleDemandCurveUpdate,
    isOwned,
    unsavedFiltersDialog,
    setUnsavedFiltersDialog,
    showErrorOverlay,
    setShowErrorOverlay,
    isSkipAndSaveLoading,
    isCompareButtonDisabled,
    totalCurvesCount,
    hasDataNotPresent,
    handleSkipAndSave,
    DCC_MAX_CURVES,
  } = useDccDetails();

  return (
    <Box className={classes.root}>
      {isFetching ? (
        <Grid container justifyContent='center'>
          <CircularProgress className={classes.circularProgress} />
        </Grid>
      ) : (
        <>
          <DemandCurveComparisonHeader
            history={history}
            comparisonData={comparisonData}
            handleSaveComparison={handleSaveComparison}
            demandCurveOptionBtnText={demandCurveOptionBtnText}
            handleDemandCurveOptionChange={handleDemandCurveOptionChange}
            handleConsumptionOptionChange={handleConsumptionOptionChange}
            handleApply={() => handleCompareClick(true)}
          />

          <Box>
            <Box className={classes.cardContainer} ref={cardContainerRef}>
              {sortedCurves?.map((c) =>
                c.type === 'demand' ? (
                  <DemandCurveCard
                    key={c.demandCurveId}
                    curveDetails={c}
                    handlePropertyChange={handleCurveDataChange}
                    showDelete={sortedCurves?.length > 2}
                    removeDemandCurveCard={removeDemandCurveCard}
                    handleDemandCurveDelete={handleDemandCurveDelete}
                    handleDemandCurveUpdate={handleDemandCurveUpdate}
                    isCardToTrim={
                      sortedCurves?.length > 2 ||
                      (sortedCurves?.length >= 2 && showAddAnotherCurve)
                    }
                    isOwned={isOwned}
                  />
                ) : (
                  <DeltaCurveCard
                    key={c.deltaCurveId}
                    curveDetails={c}
                    demandCurves={comparisonData.demandCurves}
                    handlePropertyChange={handleCurveDataChange}
                    showDelete={sortedCurves?.length > 2}
                    removeDeltaCurveCard={removeDeltaCurveCard}
                    handleDeltaCurveDelete={handleDeltaCurveDelete}
                    handleDeltaCurveUpdate={handleDeltaCurveUpdate}
                    isOwned={isOwned}
                  />
                )
              )}
              {showAddAnotherCurve && (
                <AddAnotherCard
                  comparisonData={comparisonData}
                  close={handleCloseAddAnother}
                  handleAddDemandCurve={handleAddDemandCurve}
                  handleAddDeltaCurve={handleAddDeltaCurve}
                />
              )}
            </Box>

            <Box className={classes.buttonGroup}>
              <Button
                onClick={() => setShowAddAnotherCurve(true)}
                variant='outlined'
                className={classes.addButton}
                disabled={
                  showAddAnotherCurve || totalCurvesCount === DCC_MAX_CURVES || !isOwned
                }
              >
                {DCC_CHART_MESSAGES.ADD_ANOTHER}
              </Button>

              <Button
                variant='contained'
                className={classes.compareButton}
                disableElevation
                disabled={isCompareButtonDisabled}
                onClick={handleCompareClick}
              >
                {isComparing ? DCC_CHART_MESSAGES.COMPARING : DCC_CHART_MESSAGES.COMPARE}
              </Button>
            </Box>
          </Box>

          <Box style={{ position: 'relative' }}>
            <AWBHighchart options={options} ref={chartRef} immutable={true} />
            {isComparing && (
              <Box sx={styles.chartLoadingOverlaySx}>
                <Box sx={styles.chartLoadingContentSx}>
                  <CircularProgress size={40} />
                  <Box sx={{ fontSize: '14px', color: '#666' }}>
                    {DCC_CHART_MESSAGES.LOADING_CHART}
                  </Box>
                </Box>
              </Box>
            )}
            {showErrorOverlay && hasDataNotPresent && (
              <Box sx={styles.chartErrorOverlaySx}>
                <img
                  src={CloseIcon}
                  alt='Close'
                  style={styles.closeIconSx}
                  onClick={() => setShowErrorOverlay(false)}
                />
                <Box sx={styles.chartErrorContentSx}>
                  <Box sx={styles.chartErrorTitleSx}>
                    📉 {DCC_CHART_MESSAGES.NO_DATA_TITLE}
                  </Box>
                  <Box color={'#565E6E'} fontSize={'16px'} textAlign={'center'} mb={2}>
                    {DCC_CHART_MESSAGES.NO_DATA_DESCRIPTION}
                    <br />
                    {DCC_CHART_MESSAGES.TRY_AGAIN}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          <Dialog
            open={unsavedFiltersDialog.open}
            onClose={() => setUnsavedFiltersDialog({ ...unsavedFiltersDialog, open: false })}
            PaperProps={{ style: styles.unsavedFiltersDialogPaperSx }}
          >
            <DialogTitle sx={styles.unsavedFiltersDialogTitleSx}>
              {DCC_CHART_MESSAGES.UNSAVED_FILTERS_TITLE}
            </DialogTitle>
            <DialogContent sx={styles.unsavedFiltersDialogContentSx}>
              <DialogContentText
                sx={styles.unsavedFiltersDialogContentTextSx}
                dangerouslySetInnerHTML={{ __html: unsavedFiltersDialog.message }}
              />
            </DialogContent>
            <DialogActions sx={styles.unsavedFiltersDialogActionsSx}>
              <Button
                onClick={() => setUnsavedFiltersDialog({ ...unsavedFiltersDialog, open: false })}
                sx={styles.unsavedFiltersSecondaryButtonSx}
              >
                {DCC_CHART_MESSAGES.OK}
              </Button>
              <Button
                onClick={handleSkipAndSave}
                disabled={isSkipAndSaveLoading}
                sx={styles.unsavedFiltersPrimaryButtonSx}
              >
                {isSkipAndSaveLoading ? (
                  <CircularProgress size={20} sx={{ color: '#FFFFFF' }} />
                ) : (
                  DCC_CHART_MESSAGES.SKIP_AND_SAVE
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}
