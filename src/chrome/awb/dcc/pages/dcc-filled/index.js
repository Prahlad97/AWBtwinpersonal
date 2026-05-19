import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Button } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import BackIcon from '@/assets/images/back-icon.svg';
import ComparisonCard from '../../components/cards/comparison';
import SearchIcon from '@/assets/images/search-icon.svg';
import { SortPopover, FilterPopover, CreateDemandCurveModal } from '../../components/modals';
import { useDccFilledStyles, dccFilledStyles } from './styles';
import { useDccFilled } from '../../hooks/use-dcc-filled';

export default function DemandCurveFilled() {
  const classes = useDccFilledStyles();
  const {
    allComparisons,
    comparisonItemsData,
    creators,
    searchText,
    selectedId,
    handleSortApply,
    handleFilterApply,
    handleSelectComparison,
    handleBackClick,
    handleSearchChange,
    openModal,
    setOpenModal,
    isCreateLoading,
    createComparison,
    openCreateModal,
  } = useDccFilled();

  return (
    <Box>
      <Box className={classes.header}>
        <Box className={classes.titleSection}>
          <Box
            component='img'
            src={BackIcon}
            alt='BackIcon'
            sx={dccFilledStyles.backIconSx}
            onClick={handleBackClick}
          />
          <Typography variant='h6' sx={dccFilledStyles.titleSx}>
            Demand curve comparison
          </Typography>
        </Box>

        <Box className={classes.titleSection}>
          <SortPopover onSortApply={handleSortApply} />
          <FilterPopover creators={creators} onApply={handleFilterApply} />

          <Box className={classes.searchContainer}>
            <Box component='img' src={SearchIcon} alt='Search' sx={dccFilledStyles.searchIconSx} />
            <input
              type='text'
              placeholder='Search comparison'
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </Box>
          <Button
            variant='contained'
            color='primary'
            className={classes.createButton}
            startIcon={<AddIcon />}
            onClick={openCreateModal}
          >
            Create new
          </Button>
          <CreateDemandCurveModal
            open={openModal}
            setOpen={setOpenModal}
            onCreate={createComparison}
            allComparisons={allComparisons}
            isLoading={isCreateLoading}
          />
        </Box>
      </Box>

      <Box display='flex' justifyContent='center' mt={2}>
        <Box className={classes.comparisonCard}>
          <Box>
            {comparisonItemsData?.map((item, index) => (
              <Box key={index} width='100%'>
                <ComparisonCard
                  comparison={item}
                  highlighted={item?.dcc_id === selectedId}
                  onSelect={() => handleSelectComparison(item.dcc_id)}
                  allComparisons={allComparisons}
                />
                <Divider />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
