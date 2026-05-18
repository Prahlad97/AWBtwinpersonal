import React from 'react';
import { Menu } from '@material-ui/core';

/** Vendored from production `components/customMenu.js`. */
const CustomMenu = React.forwardRef(
  ({ anchorEl, open, handleClose, listClassName, children, menuClass = '', paperClass = '', ...rest }, ref) => (
    <Menu
      ref={ref}
      id="basic-menu"
      elevation={0}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      className={menuClass}
      PaperProps={{ className: paperClass }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
        className: `${listClassName}`,
      }}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      {...rest}
    >
      {children}
    </Menu>
  )
);

CustomMenu.displayName = 'CustomMenu';

export default CustomMenu;
