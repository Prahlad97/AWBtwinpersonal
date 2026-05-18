import { useState } from 'react';
import { Box, Button, Divider, Menu, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import resetPasswordIcon from '../../../assets/images/resetPassword.svg';
import signOutIcon from '../../../assets/images/sign-out.svg';

const menuPaperSx = {
  maxWidth: 280,
  borderRadius: '12px',
  boxShadow: '-1px 2px 4px 0px #60617029, 0px -1px 1px 0px #28293d0a',
  p: 1,
};

const userMenuPaperSx = {
  p: 3,
  minWidth: 260,
  borderRadius: '12px',
  boxShadow: '-1px 2px 4px 0px #60617029, 0px -1px 1px 0px #28293d0a',
};

/** Production: `logo-header-nuj` profile menu (non-admin user path). */
export function ProfileMenu({ displayName = 'Demo User' }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          p: 0,
          minWidth: 0,
          textTransform: 'uppercase',
          color: '#fff',
          fontWeight: 600,
          fontFamily: 'Roboto, sans-serif',
          fontSize: 15,
          lineHeight: '24px',
          gap: '6px',
          '& .MuiButton-startIcon': { mr: 0 },
          '&:hover': { bgcolor: 'transparent' },
        }}
        startIcon={<AccountCircleIcon sx={{ fontSize: '24px !important' }} />}
      >
        {displayName.split(' ')[0]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: userMenuPaperSx } }}
      >
        <Typography
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 20,
            fontWeight: 600,
            lineHeight: '30px',
            color: '#1e232e',
            mb: 1,
          }}
        >
          {displayName}
        </Typography>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
          <Button
            color="inherit"
            onClick={() => setAnchorEl(null)}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              textTransform: 'none',
              color: '#1e232e',
              py: 1,
            }}
          >
            <Box component="img" src={resetPasswordIcon} alt="" sx={{ width: 20, height: 20, mr: 1 }} />
            <Typography sx={{ fontSize: 16, fontWeight: 400, fontFamily: 'Roboto, sans-serif' }}>Reset Password</Typography>
          </Button>
          <Button
            color="inherit"
            onClick={() => setAnchorEl(null)}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              textTransform: 'none',
              color: '#1e232e',
              py: 1,
            }}
          >
            <Box component="img" src={signOutIcon} alt="" sx={{ width: 20, height: 20, mr: 1 }} />
            <Typography sx={{ fontSize: 16, fontWeight: 400, fontFamily: 'Roboto, sans-serif' }}>Sign Out</Typography>
          </Button>
        </Box>
      </Menu>
    </>
  );
}

/** Admin-style compact menu (Pilot Settings path) — exported if needed later. */
export function ProfileAdminMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ p: 0, minWidth: 0, '&:hover': { bgcolor: 'transparent' } }}
        startIcon={<AccountCircleIcon sx={{ fontSize: '24px !important', color: '#fff' }} />}
      >
        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: 16, textTransform: 'none' }}>Admin</Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: menuPaperSx } }}
      >
        {['Pilot Settings', 'Admin Settings', 'Reset Password', 'Sign Out'].map((label) => (
          <Box
            key={label}
            onClick={() => setAnchorEl(null)}
            sx={{
              borderRadius: '8px',
              px: 2,
              py: 1.5,
              cursor: 'pointer',
              fontFamily: 'Roboto, sans-serif',
              fontSize: 16,
              '&:hover': { bgcolor: '#f3f8fd' },
            }}
          >
            {label}
          </Box>
        ))}
      </Menu>
    </>
  );
}
