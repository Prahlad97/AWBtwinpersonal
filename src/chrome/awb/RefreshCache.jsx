import { useState } from 'react';
import { CircularProgress, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useLabExtension } from '../../providers/LabExtensionProvider';

/**
 * Vendored from production `RefreshCache.js` — stub handlers, no Looker API.
 */
export default function RefreshCache({ hideMenu = false }) {
  const {
    state: { isDashboardLoading },
    actions: { clearCacheQueryResults, updateFromLookerCache },
  } = useLabExtension();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    handleClose();
    setIsLoading(true);
    updateFromLookerCache(false);
    clearCacheQueryResults();
    setIsLoading(false);
  };

  if (hideMenu) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-label="Refresh cache"
        disabled={isLoading || isDashboardLoading}
        title="Refresh Cache"
      >
        {isLoading ? <CircularProgress size={20} /> : <MoreVertIcon />}
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        id="refresh-cache-menu"
        MenuListProps={{ 'aria-labelledby': 'refresh-cache-button' }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={handleRefresh}>
          <div>Clear Cache and refresh</div>
        </MenuItem>
      </Menu>
    </>
  );
}
