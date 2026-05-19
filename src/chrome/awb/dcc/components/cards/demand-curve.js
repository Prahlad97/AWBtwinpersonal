import React from 'react';
import { Box, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SegmentCloseIcon from '@/segments/assets/close_icon.svg';
import SegmentIcon from '@/assets/images/segment-icon.svg';
import FilterIcon from '@/assets/images/saved-filter-icon.svg';
import TimeIcon from '@/assets/images/time-interval.svg';
import ChevronDownIcon from '@/assets/images/ChevronDown.svg';
import CustomDateRangeSelector from '@/headers/date-filters/custom-date-filter';
import EditIcon from '@/assets/images/rename-icon.svg';
import DeleteIcon from '@/assets/images/delete-icon.svg';
import { DeleteDemandCurveModal } from '../modals';
import DemandCurveSegment from '../dcc-segments';
import FilterPane from '@/headers/custom-headers/filters/filter-pane';
import SaveFilterPopup from '@/headers/custom-headers/filters/save-filter-popup';
import {
  demandCurveCardStyles,
  DemandCard,
  FieldRow,
  DemandLabel,
  LabelIcon,
  SegmentSelectBox,
  FilterButton,
  TitleSection,
  ActionButton,
  CheckUncheckButton,
  DemandCurveName,
  EditCurveName,
} from './styles';
import { useDemandCurveCard } from '../../hooks/use-demand-curve-card';

export default function DemandCurveCard({
  curveDetails,
  handlePropertyChange,
  showDelete,
  removeDemandCurveCard,
  handleDemandCurveDelete,
  handleDemandCurveUpdate,
  isCardToTrim,
  isOwned,
}) {
  const card = useDemandCurveCard({
    curveDetails,
    handlePropertyChange,
    showDelete,
    removeDemandCurveCard,
    handleDemandCurveDelete,
    handleDemandCurveUpdate,
    isCardToTrim,
    isOwned,
  });

  const isInverted = card.selectedSegment?.invert || card.selectedProgramSegment?.invert;
  const hasSegment =
    card.selectedSegment?.segment_name ||
    card.selectedSegment?.segmentSnapshotName ||
    card.selectedSegment?.name ||
    card.selectedProgramSegment?.program_id;
  const selectedSegmentsForSegment = card.selectedSegment?.segment_name ||
    card.selectedSegment?.segmentSnapshotName ||
    card.selectedSegment?.name
      ? [card.selectedSegment]
      : card.selectedProgramSegment?.program_id
      ? [card.selectedProgramSegment]
      : [];

  return (
    <DemandCard
      sx={{ backgroundColor: curveDetails?.bgColor }}
      elevation={0}
      onMouseEnter={() => card.setIsHovered(true)}
      onMouseLeave={() => card.setIsHovered(false)}
      onMouseMove={() => !card.isHovered && card.setIsHovered(true)}
    >
      {card.curveProperties && (
        <>
      <TitleSection>
        {!card.showEditButtons ? (
          <DemandCurveName variant='h6' gutterBottom>
            {card.curveName}
          </DemandCurveName>
        ) : (
          <Box>
            <EditCurveName
              variant='standard'
              value={card.curveName}
              onChange={(e) => card.setCurveName(e.target.value)}
              InputProps={{ disableUnderline: true }}
              inputProps={{ style: { width: `${card.curveName.length}ch`, minWidth: '150px' } }}
            />
          </Box>
        )}
        {card.isHovered && !card.showEditButtons && isOwned && (
          <>
            <ActionButton
              component='img'
              src={EditIcon}
              alt='EditIcon'
              sx={demandCurveCardStyles.editButtonSx}
              onClick={() => card.setShowEditButtons(true)}
            />
            {showDelete && (
              <ActionButton
                component='img'
                src={DeleteIcon}
                alt='DeleteIcon'
                sx={demandCurveCardStyles.deleteButtonSx}
                onClick={() => card.setOpenDeleteModal(true)}
              />
            )}
          </>
        )}
        {card.showEditButtons && (
          <TitleSection ml={2}>
            <CheckUncheckButton
              onClick={card.isSaveDisabled ? undefined : card.saveChanges}
              sx={{
                opacity: card.isSaveDisabled ? 0.4 : 1,
                cursor: card.isSaveDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              <CheckIcon fontSize='small' sx={demandCurveCardStyles.checkIconSx} />
            </CheckUncheckButton>
            <CheckUncheckButton ml={1} onClick={card.discardChanges}>
              <CloseIcon fontSize='small' sx={demandCurveCardStyles.checkIconSx} />
            </CheckUncheckButton>
          </TitleSection>
        )}
      </TitleSection>

      <Divider
        sx={{
          borderColor: curveDetails?.bgColor,
          borderBottomWidth: '1px',
        }}
      />

      <FieldRow>
        <LabelIcon component='img' src={SegmentIcon} alt='SegmentIcon' />
        <DemandLabel>Segment</DemandLabel>
        <SegmentSelectBox
          sx={[
            demandCurveCardStyles.segmentSelectSx,
            card.narrowWidth && demandCurveCardStyles.selectWidthSx,
          ]}
          onClick={card.openSegmentSelect}
        >
          <DemandLabel component='span' sx={demandCurveCardStyles.segmentLabelSx}>
            {card.segmentName}
          </DemandLabel>
          {hasSegment && isInverted ? (
            <Box sx={demandCurveCardStyles.invertedBadgeSx}>Inverted</Box>
          ) : null}
          {hasSegment ? (
            <Box
              component='img'
              src={SegmentCloseIcon}
              alt='Remove segment'
              onClick={card.handleRemoveSegment}
              sx={demandCurveCardStyles.removeSegmentSx}
            />
          ) : null}
          <Box
            component='img'
            src={ChevronDownIcon}
            alt='Chevron Down'
            sx={demandCurveCardStyles.chevronSx}
          />
        </SegmentSelectBox>
        <DemandCurveSegment
          openSegmentSelectModal={card.openSegmentSelectModal}
          handleSegmentModalClose={() => {
            card.setOpenSegmentSelectModal(false);
            card.setOpenSegmentList(false);
          }}
          selectedSegments={selectedSegmentsForSegment}
          handleSegmentsSelect={card.handleSegmentSelect}
          anchorEl={card.segmentAnchorEl}
          openSegmentList={card.openSegmentList}
          setOpenSegmentList={card.setOpenSegmentList}
          currentDrProgramData={card.currentDrProgramData}
        />
      </FieldRow>

      <FieldRow>
        <LabelIcon component='img' src={FilterIcon} alt='FilterIcon' />
        <DemandLabel>Filter</DemandLabel>
        <FilterButton
          ref={card.filterButtonRef}
          sx={card.narrowWidth ? demandCurveCardStyles.selectWidthSx : undefined}
          onClick={() => card.setIsFilterPaneOpen(true)}
        >
          <DemandLabel>
            {card.selectedFilter?.name && card.selectedFilter?.name !== 'DEFAULT'
              ? card.selectedFilter?.name
              : 'Select'}
          </DemandLabel>
          <Box
            component='img'
            src={ChevronDownIcon}
            alt='Chevron Down'
            sx={demandCurveCardStyles.chevronSx}
          />
        </FilterButton>
      </FieldRow>

      <FieldRow>
        <LabelIcon component='img' src={TimeIcon} alt='TimeIcon' />
        <DemandLabel sx={demandCurveCardStyles.timeIntervalLabelSx}>Time Interval</DemandLabel>
        <FilterButton
          sx={[
            card.narrowWidth && demandCurveCardStyles.selectWidthSx,
            demandCurveCardStyles.timeIntervalWrapperSx,
          ]}
        >
          <CustomDateRangeSelector
            index={1}
            timeInterval={card.selectedTimeInterval}
            updateTimeRange={card.updateTimeInterval}
            isDemandCurveDateRange={true}
            isProgramSegment={false}
          />
        </FilterButton>
      </FieldRow>

      <Box ref={card.centeredTriggerRef} sx={demandCurveCardStyles.filterPaneTriggerSx} />
      <FilterPane
        anchorEl={card.centeredTriggerRef.current}
        open={card.isFilterPaneOpen}
        setOpen={card.setIsFilterPaneOpen}
        onClose={card.handleFilterPaneClose}
        onSaveFilters={card.openSaveFilterModal}
        onApplyFilters={card.handleApplyFilters}
        parent='demandCurve'
        initialFilters={card.selectedFilter?.filters || {}}
        updateSavedFilterList={card.updateSavedFilterList}
        setUpdateSavedFilterList={card.setUpdateSavedFilterList}
        savedFiltersLoading={card.savedFiltersLoading}
      />
      <SaveFilterPopup
        modalOpen={card.isSaveFilterModalOpen}
        setModalOpen={card.setIsSaveFilterModalOpen}
        updateSavedFilterList={card.updateSavedFilterList}
        setUpdateSavedFilterList={card.setUpdateSavedFilterList}
        filters={card.filtersToSave}
        onFilterSaved={card.handleFilterSaved}
      />
        </>
      )}
      <DeleteDemandCurveModal
        title='Delete Curve'
        open={card.openDeleteModal}
        setOpen={card.setOpenDeleteModal}
        onDelete={card.handleDeleteModalRemove}
        value={curveDetails?.name}
        isLoading={card.isLoading}
      />
    </DemandCard>
  );
}
