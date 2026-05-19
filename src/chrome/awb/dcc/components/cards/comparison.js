import React, { useContext, useState, useCallback } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import moment from 'moment';

import DemandCurveIcon from '@/assets/images/demand-curve-icon.svg';
import CustomMenu from '@/components/custom-menu';
import { EditComparisonOptionMenu } from '../menus';
import EditIcon from '@/assets/images/edit-icon.svg';
import ProfileIcon from '@/assets/images/profile-icon.svg';
import CalendarIcon from '@/assets/images/calendar-icon.svg';
import { EditDemandCurveModal, DeleteDemandCurveModal, PublishDemandCurveModal } from '../modals';
import useComparisonCard from '../../hooks/use-comparison-card';
import { ExtensionContext } from '@/extension-context';
import { SnackbarContext } from '@/contexts/snackbar-context';
import { SNACKBAR_MESSAGES } from '@/constants/features-constants';
import {
  comparisonCardStyles,
  CardBox,
  HighlightedBox,
  EditItemIconButton,
  IconWrapper,
  SubtitleTypography,
  InfoRow,
  InfoItem,
  DescriptionTypography,
} from './styles';

const MENU_ACTIONS = {
  rename: 'openEdit',
  delete: 'openDelete',
  publish: 'openPublish',
};

const showSnackbar = (openSnackBar, id, message) =>
  openSnackBar({ id, message, actionAllowed: true });

export default function ComparisonCard({ comparison, highlighted, onSelect, allComparisons }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPublishModal, setOpenPublishModal] = useState(false);

  const { state: { userInfo } } = useContext(ExtensionContext);
  const { actions: { openSnackBar } } = useContext(SnackbarContext);
  const { isLoading, updateComparisonData, deleteComparisonData } = useComparisonCard();

  const closeMenu = useCallback((e) => {
    e?.stopPropagation?.();
    setOpen(false);
  }, []);

  const openMenu = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }, []);

  const closeModal = useCallback((setter) => () => {
    setter(false);
    setOpen(false);
  }, []);

  const handleItemClick = useCallback((id) => {
    const setters = { openEdit: setOpenEditModal, openDelete: setOpenDeleteModal, openPublish: setOpenPublishModal };
    if (setters[MENU_ACTIONS[id]]) setters[MENU_ACTIONS[id]](true);
    setOpen(false);
  }, []);

  const handleEditSave = useCallback(async (comparisonName, publish, description) => {
    const payload = {
      comparison: { ...comparison, name: comparisonName?.trimEnd(), description, is_shared: publish },
      demand_curves: [],
      delta_curves: [],
    };
    try {
      await updateComparisonData(comparison.dcc_id, payload, closeModal(setOpenEditModal));
      showSnackbar(openSnackBar, `comparison-update-${comparison.dcc_id}`, `${comparisonName?.trimEnd()} ${SNACKBAR_MESSAGES.UPDATED}`);
    } catch (err) {
      console.error(err);
      showSnackbar(openSnackBar, `comparison-update-error-${comparison.dcc_id}`, 'Failed to update comparison');
    }
  }, [comparison, updateComparisonData, openSnackBar, closeModal]);

  const handleDelete = useCallback(async () => {
    const name = comparison?.name || 'Comparison';
    try {
      await deleteComparisonData(comparison.dcc_id, closeModal(setOpenDeleteModal));
      showSnackbar(openSnackBar, `comparison-delete-${comparison.dcc_id}`, `${name} ${SNACKBAR_MESSAGES.DELETED}`);
    } catch (err) {
      console.error(err);
      showSnackbar(openSnackBar, `comparison-delete-error-${comparison.dcc_id}`, 'Failed to delete comparison');
    }
  }, [comparison, deleteComparisonData, openSnackBar, closeModal]);

  const handlePublish = useCallback(async () => {
    const name = comparison?.name || 'Comparison';
    const payload = { comparison: { ...comparison, is_shared: true }, demand_curves: [], delta_curves: [] };
    try {
      await updateComparisonData(comparison.dcc_id, payload, closeModal(setOpenPublishModal));
      showSnackbar(openSnackBar, `comparison-publish-${comparison.dcc_id}`, `${name} ${SNACKBAR_MESSAGES.SHARED}`);
    } catch (err) {
      console.error(err);
      showSnackbar(openSnackBar, `comparison-publish-error-${comparison.dcc_id}`, 'Failed to publish comparison');
    }
  }, [comparison, updateComparisonData, openSnackBar, closeModal]);

  const handleCardClick = useCallback((e) => {
    if (openEditModal || openDeleteModal || openPublishModal) {
      e.stopPropagation();
      return;
    }
    onSelect();
  }, [onSelect, openEditModal, openDeleteModal, openPublishModal]);

  if (!comparison) return null;

  const CardComponent = highlighted ? HighlightedBox : CardBox;
  const createdAt = moment.utc(Number(comparison?.created_at)).local().format('MMMM D, YYYY');
  const isOwner = comparison?.user_id === userInfo?.id;

  return (
    <CardComponent onClick={handleCardClick}>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' alignItems='center' minWidth={0} flex={1}>
          <IconWrapper src={DemandCurveIcon} alt='DemandCurveIcon' />
          <Tooltip title={comparison?.name || ''} placement='bottom-start' enterDelay={300}>
            <SubtitleTypography variant='subtitle1' sx={comparisonCardStyles.comparisonNameSx}>{comparison?.name}</SubtitleTypography>
          </Tooltip>
        </Box>
        <InfoRow>
          {comparison?.user_name && (
            <InfoItem>
              <img src={ProfileIcon} alt='ProfileIcon' />
              <Typography variant='body2' color='textSecondary'>{comparison.user_name}</Typography>
            </InfoItem>
          )}
          <InfoItem>
            <img src={CalendarIcon} alt='CalendarIcon' />
            <Typography variant='body2' color='textSecondary'>Created on {createdAt}</Typography>
          </InfoItem>
        </InfoRow>
        <DescriptionTypography variant='body2' color='textSecondary' sx={comparisonCardStyles.descriptionSx}>
          {comparison?.description}
        </DescriptionTypography>
      </Box>
      {isOwner && (
        <EditItemIconButton onClick={openMenu}>
          <img src={EditIcon} alt='EditIcon' />
        </EditItemIconButton>
      )}
      <CustomMenu anchorEl={anchorEl} open={open} handleClose={closeMenu} paperClass={comparisonCardStyles.menuPaperSx} listClassName={comparisonCardStyles.menuListSx}>
        <EditComparisonOptionMenu
          handleItemClick={handleItemClick}
          isOwned={isOwner}
          isDownloadCSV={false}
          isPublished={comparison?.is_shared}
        />
      </CustomMenu>
      <EditDemandCurveModal
        value={comparison?.name}
        descriptionValue={comparison?.description}
        isShared={comparison?.is_shared}
        open={openEditModal}
        setOpen={setOpenEditModal}
        onSave={handleEditSave}
        allComparisons={allComparisons}
        isLoading={isLoading}
      />
      <DeleteDemandCurveModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onDelete={handleDelete}
        value={comparison?.name}
        isLoading={isLoading}
      />
      <PublishDemandCurveModal
        open={openPublishModal}
        setOpen={setOpenPublishModal}
        onShare={handlePublish}
        value={comparison?.name}
        isLoading={isLoading}
      />
    </CardComponent>
  );
}
