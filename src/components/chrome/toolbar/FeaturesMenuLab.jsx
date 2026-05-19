import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import downloadIcon from '../../../assets/images/download-csv.svg';
import printIcon from '../../../assets/images/print-pdf.svg';
import uploadIcon from '../../../assets/images/upload-csv.svg';
import analyticsIcon from '../../../assets/images/analytics_tab.svg';

const paperSx = {
  maxWidth: 367,
  borderRadius: '12px',
  bgcolor: '#fff',
  boxShadow: '-1px 2px 4px 0px rgba(96, 97, 112, 0.16), 0px -1px 1px 0px rgba(40, 41, 61, 0.04)',
  p: 1,
};

const itemSx = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 1.5,
  py: 1.5,
  px: 2,
  borderRadius: '8px',
  '&:hover': { bgcolor: '#F3F8FD' },
};

/** Production: `FeaturesMenu` + `FeaturesList` — hamburger opens icon + title + description rows. */
export function FeaturesMenuLab({ anchorEl, open, onClose }) {
  const features = [
    {
      icon: analyticsIcon,
      title: 'Demand curve comparison',
      description: 'Compare hourly load shapes across segments',
      to: '/comparisons',
    },
    { icon: downloadIcon, title: 'Download', description: 'Download dashboard data as CSV', onClick: onClose },
    { icon: printIcon, title: 'Print', description: 'Print dashboard as PDF', onClick: onClose },
    { icon: uploadIcon, title: 'Upload CSV', description: 'Upload a CSV file', onClick: onClose },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{ paper: { sx: paperSx }, list: { sx: { p: 0 } } }}
    >
      {features.map((f, i) => (
        <Box key={f.title}>
          <MenuItem
            component={f.to ? Link : 'li'}
            to={f.to}
            onClick={() => {
              f.onClick?.();
              onClose();
            }}
            sx={itemSx}
          >
            <Box component="img" src={f.icon} alt="" sx={{ width: 20, height: 20, mt: 0.25, flexShrink: 0 }} />
            <Box>
              <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#3A4245', fontFamily: 'Roboto, sans-serif', lineHeight: '20px' }}>
                {f.title}
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#51585B', fontFamily: 'Roboto, sans-serif', lineHeight: '16px' }}>
                {f.description}
              </Typography>
            </Box>
          </MenuItem>
          {i < features.length - 1 && (
            <Box sx={{ height: 1, bgcolor: 'rgba(153,153,153,0.1)', my: 0.75, mx: 1 }} />
          )}
        </Box>
      ))}
    </Menu>
  );
}
