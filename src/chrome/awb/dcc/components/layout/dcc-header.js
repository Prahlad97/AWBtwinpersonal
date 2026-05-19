import React from 'react';
import { Box, Tooltip } from '@mui/material';
import BackIcon from '@/assets/images/back-icon.svg';
import SaveIcon from '@/assets/images/SaveAccounts.svg';
import LineChartIcon from '@/assets/images/linechart-icon.svg';
import SpeedometerIcon from '@/assets/images/speedometer-icon.svg';
import EditIcon from '@/assets/images/edit-icon.svg';
import { ConsumptionOptionsMenu, DemandCurveOptionsMenu, EditComparisonOptionMenu } from '../menus';
import {
  EditDemandCurveModal,
  DeleteDemandCurveModal,
  PublishDemandCurveModal,
  SaveDemandCurveModal,
} from '../modals';
import { PROPERTIES } from '@/constants/demand-curve-constants';
import { CSVLink } from 'react-csv';
import CustomMenu from '@/components/custom-menu';
import ChevronDownIcon from '@/assets/images/ChevronDown.svg';
import {
  dccHeaderStyles,
  HeaderBox,
  TitleSection,
  TitleText,
  ActionButtonsBox,
  IconButtonStyled,
  EditItemIconButton,
} from './styles';
import { useDccHeader } from '../../hooks/use-dcc-header';

const DemandCurveComparisonHeader = ({
  history,
  comparisonData,
  handleSaveComparison,
  demandCurveOptionBtnText,
  handleDemandCurveOptionChange,
  handleConsumptionOptionChange,
  handleApply,
}) => {
  const header = useDccHeader({
    history,
    comparisonData,
    handleSaveComparison,
    handleDemandCurveOptionChange,
    handleConsumptionOptionChange,
    handleApply,
  });

  return (
    <HeaderBox>
      <TitleSection>
        <Box
          component='img'
          src={BackIcon}
          alt='BackIcon'
          sx={dccHeaderStyles.backIconSx}
          onClick={header.handleBackClick}
        />
        <Tooltip
          title={comparisonData?.comparison?.name || ''}
          placement='bottom-start'
          enterDelay={300}
        >
          <TitleText variant='h6' sx={dccHeaderStyles.headerComparisonNameSx}>
            {comparisonData?.comparison?.name}
          </TitleText>
        </Tooltip>
        {header.isOwned && (
          <img
            className='save-icon'
            src={SaveIcon}
            alt='save'
            onClick={() => header.setOpenSaveModal(true)}
          />
        )}
        <EditItemIconButton onClick={header.handleOpen}>
          <img src={EditIcon} alt='EditIcon' />
        </EditItemIconButton>
        <CSVLink
          data={header.csvData}
          filename={`comparison-${comparisonData?.comparison?.name || 'data'}.csv`}
          style={dccHeaderStyles.csvLinkSx}
          ref={header.csvLinkRef}
        >
          Download
        </CSVLink>
        <CustomMenu
          anchorEl={header.anchorEl}
          open={header.open}
          handleClose={header.handleClose}
          paperClass={dccHeaderStyles.menuPaperSx}
          listClassName={dccHeaderStyles.menuListSx}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <EditComparisonOptionMenu
            handleItemClick={header.handleItemClick}
            isOwned={header.isOwned}
            isDownloadCSV={true}
            isPublished={comparisonData?.comparison?.isShared}
          />
        </CustomMenu>
      </TitleSection>
      <ActionButtonsBox>
        <IconButtonStyled type='button' onClick={header.handleDemandCurveMenuOpen}>
          <img src={LineChartIcon} alt='icon' style={dccHeaderStyles.iconImgSmallSx} />
          {demandCurveOptionBtnText}
          <img src={ChevronDownIcon} alt='icon' style={dccHeaderStyles.iconImgChevronSx} />
        </IconButtonStyled>
        <IconButtonStyled type='button' onClick={header.handleConsumptionMenuOpen}>
          <img src={SpeedometerIcon} alt='icon' style={dccHeaderStyles.iconImgSmallSx} />
          {header.consumptionLabel}
          <img src={ChevronDownIcon} alt='icon' style={dccHeaderStyles.iconImgChevronSx} />
        </IconButtonStyled>
      </ActionButtonsBox>
      <EditDemandCurveModal
        value={comparisonData?.comparison?.name}
        descriptionValue={comparisonData?.comparison?.description}
        isShared={comparisonData?.comparison?.isShared ?? comparisonData?.comparison?.is_shared}
        open={header.openEditModal}
        setOpen={header.setOpenEditModal}
        onSave={header.handleEditModalSave}
        allComparisons={header.allComparisons}
        isLoading={header.isLoading}
      />
      <DeleteDemandCurveModal
        open={header.openDeleteModal}
        setOpen={header.setOpenDeleteModal}
        onDelete={header.handleDeleteModalRemove}
        value={comparisonData?.comparison?.name}
        isLoading={header.isDeleteModalLoading}
      />
      <PublishDemandCurveModal
        open={header.openPublishModal}
        setOpen={header.setOpenPublishModal}
        onShare={header.handlePublishModalShare}
        value={comparisonData?.comparison?.name}
        isLoading={header.isPublishModalLoading}
      />
      <CustomMenu
        anchorEl={header.demandCurveAnchorEl}
        open={Boolean(header.demandCurveAnchorEl)}
        handleClose={() => header.setDemandCurveAnchorEl(null)}
        paperClass={dccHeaderStyles.menuPaperSx}
        listClassName={dccHeaderStyles.menuListSx}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <DemandCurveOptionsMenu
          selected={header.demandCurveData}
          onChange={handleDemandCurveOptionChange}
          onApply={header.handleDemandCurveMenuClose}
        />
      </CustomMenu>
      <CustomMenu
        anchorEl={header.consumptionAnchorEl}
        open={Boolean(header.consumptionAnchorEl)}
        handleClose={() => header.setConsumptionAnchorEl(null)}
        paperClass={dccHeaderStyles.menuPaperSx}
        listClassName={dccHeaderStyles.menuListSx}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <ConsumptionOptionsMenu
          selected={comparisonData?.comparison?.[PROPERTIES.SHOW_AVERAGE] ? 'AVERAGE' : 'TOTAL'}
          onChange={handleConsumptionOptionChange}
          onApply={header.handleConsumptionMenuClose}
        />
      </CustomMenu>
      <SaveDemandCurveModal
        open={header.openSaveModal}
        setOpen={header.setOpenSaveModal}
        onSave={header.handleDemandCurveSave}
        onCancel={header.handleSaveModalClose}
        value={comparisonData?.comparison?.name}
        isLoading={header.isSaveModalLoading}
        disableBackdropClick={true}
      />
    </HeaderBox>
  );
};

export default DemandCurveComparisonHeader;