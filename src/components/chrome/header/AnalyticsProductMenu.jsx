import { useState } from 'react';
import {
  Box,
  ListSubheader,
  Menu,
  MenuItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dropdownCaret from '../../../assets/images/basil_caret-left-solid.svg';
import avistaLogo from '../../../assets/images/Avista.svg';
import { ACTIVE_PRODUCT_ID, HEADER_PRODUCTS } from '../../../config/headerProducts';
import { AWB } from '../../../theme/awbTokens';

const whiteIconSx = {
  width: 24,
  height: 24,
  flexShrink: 0,
  filter: 'brightness(0) invert(1)',
};

const caretSx = {
  width: 20,
  height: 20,
  filter: 'brightness(0) invert(1)',
  display: 'block',
};

const pilotLogoSx = {
  height: 32,
  maxWidth: 120,
  objectFit: 'contain',
  filter: 'brightness(0) invert(1)',
  display: 'block',
  flexShrink: 0,
};

const pillDividerSx = {
  width: '1px',
  height: 25,
  bgcolor: '#3c77c3',
  opacity: 0.5,
  flexShrink: 0,
  mx: '8px',
};

const menuItemSx = {
  mt: 1,
  border: '1px solid #EAEDF6',
  borderRadius: '8px',
  py: '16px',
  px: '20px',
  '&:hover': {
    bgcolor: '#EFF5FF',
    border: '1px solid #1D5ED8',
  },
  '&.Mui-selected': {
    bgcolor: '#EFF5FF',
    border: '1px solid #1D5ED8',
  },
  '&.Mui-disabled': {
    opacity: 0.55,
  },
};

const menuPaperSx = {
  top: '54px !important',
  px: 2,
  py: 1,
  maxWidth: 340,
  width: '100%',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
};

function ProductMenuItem({ product, selected, onSelect }) {
  return (
    <MenuItem
      selected={selected}
      disabled={!product.enabled}
      onClick={() => product.enabled && onSelect(product)}
      sx={menuItemSx}
    >
      <Tooltip title={product.enabled ? '' : 'This product is not enabled for your organization'}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box component="img" src={product.icon} alt="" sx={{ width: 24, height: 24, mr: 1 }} />
          <ListItemText
            primary={product.label}
            primaryTypographyProps={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 16,
              fontWeight: 500,
              color: '#1e232e',
            }}
          />
        </Box>
      </Tooltip>
    </MenuItem>
  );
}

/** Production: `logo-header-nuj` analytics product dropdown. */
export function AnalyticsProductMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const active = HEADER_PRODUCTS.find((p) => p.id === ACTIVE_PRODUCT_ID) || HEADER_PRODUCTS[0];
  const workbench = HEADER_PRODUCTS.filter((p) => p.section === 'workbench');
  const other = HEADER_PRODUCTS.filter((p) => p.section === 'other');

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          py: '10px',
          px: '16px',
          bgcolor: AWB.analyticsDropdownBg,
          color: '#fff',
          borderRadius: '6px',
          cursor: 'pointer',
          border: `1px solid ${AWB.analyticsDropdownBorder}`,
          fontFamily: 'Roboto, sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: '24px',
          letterSpacing: 'normal',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          '&:hover': { bgcolor: AWB.analyticsDropdownHover },
        }}
      >
        <Box component="img" src={avistaLogo} alt="Avista" sx={pilotLogoSx} />
        <Box sx={pillDividerSx} aria-hidden />
        <Box component="img" src={active.icon} alt="" sx={{ ...whiteIconSx, mr: '8px' }} />
        <Box component="span">{active.label}</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, lineHeight: 0 }}>
          <Box component="img" src={dropdownCaret} alt="" sx={caretSx} />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: menuPaperSx }, list: { sx: { py: 0 } } }}
      >
        <ListSubheader disableSticky sx={{ lineHeight: '130%', px: 1, py: 0.5, fontSize: 14, fontWeight: 600, color: '#666' }}>
          Analytics Workbench
        </ListSubheader>
        {workbench.map((product) => (
          <ProductMenuItem
            key={product.id}
            product={product}
            selected={product.id === ACTIVE_PRODUCT_ID}
            onSelect={(p) => {
              setAnchorEl(null);
              navigate(p.path);
            }}
          />
        ))}
        <ListSubheader disableSticky sx={{ lineHeight: '130%', px: 1, pt: 1.5, pb: 0.5, fontSize: 14, fontWeight: 600, color: '#666' }}>
          Other Dashboards
        </ListSubheader>
        {other.map((product) => (
          <ProductMenuItem key={product.id} product={product} selected={false} onSelect={() => setAnchorEl(null)} />
        ))}
      </Menu>
    </>
  );
}
