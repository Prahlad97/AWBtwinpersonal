import React from 'react';
import { Box, Divider, MenuItem, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LineChartIcon from '@/assets/images/linechart-icon.svg';
import InfoIcon from '@/assets/images/Info.svg';
import DeleteIcon from '@/assets/images/delete-icon.svg';
import EditIcon from '@/assets/images/rename-icon.svg';
import { DeleteDemandCurveModal } from '../modals';
import {
  deltaCurveCardStyles,
  DeltaCard,
  FieldRow,
  TitleSection,
  DeltaLabel,
  LabelIcon,
  DeltaSelect,
  ActionButton,
  CheckUncheckButton,
  InfoButton,
  DeltaCurveName,
  EditCurveName,
} from './styles';
import { useDeltaCurveCard } from '../../hooks/use-delta-curve-card';

export default function DeltaCurveCard({
  curveDetails,
  demandCurves,
  handlePropertyChange,
  showDelete,
  removeDeltaCurveCard,
  handleDeltaCurveDelete,
  handleDeltaCurveUpdate,
  isOwned,
}) {
  const card = useDeltaCurveCard({
    curveDetails,
    handlePropertyChange,
    showDelete,
    removeDeltaCurveCard,
    handleDeltaCurveDelete,
    handleDeltaCurveUpdate,
    isOwned,
  });

  if (!curveDetails) return null;

  return (
    <DeltaCard
      sx={{ backgroundColor: curveDetails?.bgColor }}
      elevation={0}
      onMouseEnter={() => card.setIsHovered(true)}
      onMouseLeave={() => card.setIsHovered(false)}
      onMouseMove={() => !card.isHovered && card.setIsHovered(true)}
    >
      <TitleSection>
        {!card.showEditButtons ? (
          <DeltaCurveName variant='h6' gutterBottom>
            {card.curveName}
          </DeltaCurveName>
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
        {!card.showEditButtons && (
          <Tooltip
            title='Demand Curve 1 - Demand Curve 2'
            arrow
            placement='bottom'
            componentsProps={{
              tooltip: { sx: deltaCurveCardStyles.tooltipSx },
              arrow: { sx: deltaCurveCardStyles.tooltipArrowSx },
            }}
          >
            <InfoButton src={InfoIcon} alt='InfoIcon' />
          </Tooltip>
        )}
        {card.isHovered && !card.showEditButtons && isOwned && (
          <>
            <ActionButton
              component='img'
              src={EditIcon}
              alt='EditIcon'
              sx={deltaCurveCardStyles.editButtonSx}
              onClick={() => card.setShowEditButtons(true)}
            />
            {showDelete && (
              <ActionButton
                component='img'
                src={DeleteIcon}
                alt='DeleteIcon'
                sx={deltaCurveCardStyles.deleteButtonSx}
                onClick={() => card.setOpenDeleteModal(true)}
              />
            )}
          </>
        )}
        {card.showEditButtons && (
          <TitleSection>
            <CheckUncheckButton
              onClick={card.isSaveDisabled ? undefined : card.saveChanges}
              sx={{
                opacity: card.isSaveDisabled ? 0.4 : 1,
                cursor: card.isSaveDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              <CheckIcon fontSize='small' sx={deltaCurveCardStyles.checkIconSx} />
            </CheckUncheckButton>
            <CheckUncheckButton ml={1} onClick={card.discardChanges}>
              <CloseIcon fontSize='small' sx={deltaCurveCardStyles.checkIconSx} />
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
        <LabelIcon component='img' src={LineChartIcon} alt='curveIcon' />
        <DeltaLabel>Demand Curve 1</DeltaLabel>
        <DeltaSelect
          id='delta-curve-1-select'
          value={curveDetails?.demandCurveId1 || 'DEFAULT'}
          onChange={(e) => card.handleSelect(e, 'demandCurveId1')}
        >
          <MenuItem value='DEFAULT' disabled>
            Select
          </MenuItem>
          {demandCurves.map((demandCurve) => (
            <MenuItem
              key={demandCurve.demandCurveId}
              value={demandCurve.demandCurveId}
              disabled={curveDetails?.demandCurveId1 === demandCurve.demandCurveId}
            >
              {demandCurve.name}
            </MenuItem>
          ))}
        </DeltaSelect>
      </FieldRow>

      <FieldRow>
        <LabelIcon component='img' src={LineChartIcon} alt='curveIcon' />
        <DeltaLabel>Demand Curve 2</DeltaLabel>
        <DeltaSelect
          id='delta-curve-2-select'
          value={curveDetails?.demandCurveId2 || 'DEFAULT'}
          onChange={(e) => card.handleSelect(e, 'demandCurveId2')}
        >
          <MenuItem value='DEFAULT' disabled>
            Select
          </MenuItem>
          {demandCurves.map((demandCurve) => (
            <MenuItem
              key={demandCurve.demandCurveId}
              value={demandCurve.demandCurveId}
              disabled={curveDetails?.demandCurveId1 === demandCurve.demandCurveId}
            >
              {demandCurve.name}
            </MenuItem>
          ))}
        </DeltaSelect>
      </FieldRow>

      <DeleteDemandCurveModal
        title='Delete Curve'
        open={card.openDeleteModal}
        setOpen={card.setOpenDeleteModal}
        onDelete={card.handleDeleteModalRemove}
        value={curveDetails?.name}
        isLoading={card.isLoading}
      />
    </DeltaCard>
  );
}
