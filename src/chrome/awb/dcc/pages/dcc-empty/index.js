import React from 'react';
import { Box, Button } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import DemandCurveImg from '@/assets/images/demand-curve-img.svg';
import { CreateDemandCurveModal } from '../../components/modals';
import { useDccEmptyStyles } from './styles';
import { useDccEmpty } from '../../hooks/use-dcc-empty';

export default function DemandCurveEmpty() {
  const classes = useDccEmptyStyles();
  const {
    handleBackClick,
    openModal,
    setOpenModal,
    openCreateModal,
    isLoading,
    allComparisons,
    createComparison,
  } = useDccEmpty();

  return (
    <>
      <Box className={classes.root}>
        <img src={DemandCurveImg} alt='demand curve comparison image' width={400} />

        <Box className={classes.buttons}>
          <Button variant='text' className={classes.backButton} onClick={handleBackClick}>
            Back to Analytics Dashboard
          </Button>

          <Button
            variant='contained'
            color='primary'
            className={classes.createButton}
            startIcon={<AddIcon />}
            onClick={openCreateModal}
          >
            Create new Comparison
          </Button>
        </Box>
      </Box>

      <CreateDemandCurveModal
        open={openModal}
        setOpen={setOpenModal}
        onCreate={createComparison}
        allComparisons={allComparisons}
        isLoading={isLoading}
      />
    </>
  );
}
