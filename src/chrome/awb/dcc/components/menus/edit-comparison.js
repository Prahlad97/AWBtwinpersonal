import React, { forwardRef } from 'react';
import { Box, Tooltip } from '@mui/material';
import { EDIT_COMPARISON_ITEMS } from '@/constants/demand-curve-constants';
import {
  editComparisonMenuStyles,
  MenuItemWrapper,
  StyledMenuItem,
  IconContainer,
  ImageIcon,
  MenuItemText,
} from './styles';

const EditComparisonOptionMenu = forwardRef(
  ({ handleItemClick, isOwned, isDownloadCSV, isPublished }, ref) => {
    const edit_comparison_items = EDIT_COMPARISON_ITEMS.filter((item) => {
      if (item.id !== 'downloadCSV' && !isOwned) {
        return false;
      } else if (item.id === 'downloadCSV' && !isDownloadCSV) {
        return false;
      }
      return true;
    });

    const isItemDisabled = (itemId) => {
      return itemId === 'publish' && isPublished;
    };

    const getTooltipTitle = (itemId) => {
      if (itemId === 'publish' && isPublished) {
        return 'Already published';
      }
      return '';
    };

    return (
      <MenuItemWrapper ref={ref}>
        {edit_comparison_items.map((item) => (
          <Box key={item.id}>
            <Tooltip
              title={getTooltipTitle(item.id)}
              placement='right'
              arrow
              slotProps={{
                tooltip: {
                  sx: editComparisonMenuStyles.tooltipSx,
                },
              }}
            >
              <span>
                <StyledMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isItemDisabled(item.id)) {
                      handleItemClick(item.id);
                    }
                  }}
                  disabled={isItemDisabled(item.id)}
                >
                  <IconContainer>
                    <ImageIcon src={item.icon} alt={`${item.title} icon`} />
                  </IconContainer>
                  <MenuItemText variant='body2'>{item.title}</MenuItemText>
                </StyledMenuItem>
              </span>
            </Tooltip>
          </Box>
        ))}
      </MenuItemWrapper>
    );
  }
);

export default EditComparisonOptionMenu;
