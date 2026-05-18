import { useMemo, useState } from 'react';
import { Badge, Box, Divider, LinearProgress, Popover, Typography } from '@mui/material';
import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import notificationIcon from '../../../assets/images/notification-icon.svg';
import segmentIcon from '../../../assets/images/segment-icon.svg';
import csvIcon from '../../../assets/images/csv-notification.svg';

const INITIAL_NOTIFICATIONS = [
  {
    executionId: 'lab-csv-1',
    title: 'CSV export ready',
    message: 'Your Avista analytics export is ready to download.',
    eventType: 'DOWNLOAD_CSV',
    status: 'SUCCESS',
    isRead: false,
    updatedAt: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    executionId: 'lab-seg-1',
    title: 'Segment snapshot complete',
    message: 'Winter peak segment finished processing.',
    eventType: 'SEGMENT_SNAPSHOT_UPLOAD',
    status: 'SUCCESS',
    isRead: false,
    updatedAt: Date.now() - 26 * 60 * 60 * 1000,
  },
];

const FILTERS = ['All', 'Segments', 'Downloads'];

function relativeTime(ts) {
  const hours = Math.floor((Date.now() - ts) / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function NotificationTypeIcon({ eventType }) {
  const src = eventType === 'DOWNLOAD_CSV' ? csvIcon : segmentIcon;
  return (
    <Box
      sx={{
        bgcolor: '#eff5ff',
        p: '10px',
        borderRadius: '4px',
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <Box component="img" src={src} alt="" sx={{ width: 24, height: 24 }} />
    </Box>
  );
}

function NotificationRow({ item, unread, onMarkRead }) {
  const processing = item.status === 'IN_PROGRESS';
  return (
    <Box sx={{ px: 1, py: 0.5 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          p: 2,
          borderRadius: '8px',
          bgcolor: '#fff',
          alignItems: 'flex-start',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'relative', flexShrink: 0 }}>
          <NotificationTypeIcon eventType={item.eventType} />
          {unread && (
            <Box
              sx={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: '#f97316',
                border: '1px solid #fff',
              }}
            />
          )}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#1e232e', fontFamily: 'Roboto, sans-serif' }}>
            {item.title}
          </Typography>
          <Typography sx={{ fontSize: 16, color: '#565e6e', fontFamily: 'Roboto, sans-serif' }}>
            {item.message}
          </Typography>
          {processing ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <LinearProgress sx={{ flex: 1, height: 6, borderRadius: 3 }} />
              <Typography sx={{ fontSize: 14, color: '#b3bcd0' }}>Processing…</Typography>
            </Box>
          ) : (
            <Typography
              component="button"
              type="button"
              onClick={() => onMarkRead(item.executionId)}
              sx={{
                mt: 0.5,
                p: 0,
                border: 'none',
                bgcolor: 'transparent',
                color: '#0c6ae9',
                fontSize: 16,
                fontFamily: 'Roboto, sans-serif',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {item.eventType === 'DOWNLOAD_CSV' ? 'Download CSV' : 'View segment'}
            </Typography>
          )}
        </Box>
        <Typography sx={{ fontSize: 14, color: '#b3bcd0', flexShrink: 0, fontFamily: 'Roboto, sans-serif' }}>
          {relativeTime(item.updatedAt)}
        </Typography>
      </Box>
    </Box>
  );
}

/** Lab notifications popover — styled like production `notification-panel.js`. */
export function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState('All');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [readIds, setReadIds] = useState(new Set());

  const unreadCount = useMemo(
    () => notifications.filter((n) => !readIds.has(n.executionId) && n.status === 'SUCCESS').length,
    [notifications, readIds]
  );

  const filtered = useMemo(() => {
    if (filter === 'Segments') {
      return notifications.filter((n) => n.eventType === 'SEGMENT_SNAPSHOT_UPLOAD');
    }
    if (filter === 'Downloads') {
      return notifications.filter((n) => n.eventType === 'DOWNLOAD_CSV');
    }
    return notifications;
  }, [notifications, filter]);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setFilterAnchor(null);
  };

  const markRead = (id) => {
    setReadIds((prev) => new Set(prev).add(id));
  };

  return (
    <>
      <Badge
        badgeContent={unreadCount}
        invisible={unreadCount === 0}
        overlap="rectangular"
        sx={{
          cursor: 'pointer',
          '& .MuiBadge-badge': {
            bgcolor: '#FF7F50',
            color: '#fff',
            fontSize: 11,
            fontWeight: 600,
            minWidth: 18,
            height: 18,
          },
        }}
        onClick={handleOpen}
      >
        <Box component="img" src={notificationIcon} alt="Notifications" sx={{ width: 24, height: 24, display: 'block' }} />
      </Badge>
      {open && (
        <Box
          onClick={handleClose}
          sx={{ position: 'fixed', inset: 0, zIndex: 1399, bgcolor: 'rgba(0,0,0,0.3)' }}
        />
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 520,
              maxHeight: 600,
              borderRadius: '12px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
            },
          },
        }}
        sx={{ zIndex: 1400 }}
      >
        <Box sx={{ bgcolor: '#fff', display: 'flex', flexDirection: 'column', maxHeight: 600 }}>
          <Box sx={{ borderBottom: '1px solid #eaedf6', px: 3, py: 1.5, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#1e232e', fontFamily: 'Roboto, sans-serif' }}>
                Notifications
              </Typography>
              <Box
                onClick={(e) => setFilterAnchor(e.currentTarget)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: '#f4f6fa',
                  borderRadius: '6px',
                  px: 1.5,
                  py: 1,
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontSize: 16, color: '#1e232e', fontFamily: 'Roboto, sans-serif' }}>{filter}</Typography>
                {filterAnchor ? (
                  <ExpandLessSharpIcon sx={{ fontSize: 20, color: '#1e232e' }} />
                ) : (
                  <ExpandMoreSharpIcon sx={{ fontSize: 20, color: '#1e232e' }} />
                )}
              </Box>
            </Box>
            <MenuLikeFilter
              anchorEl={filterAnchor}
              open={Boolean(filterAnchor)}
              onClose={() => setFilterAnchor(null)}
              options={FILTERS}
              value={filter}
              onSelect={(v) => {
                setFilter(v);
                setFilterAnchor(null);
              }}
            />
          </Box>
          <Box sx={{ overflow: 'auto', flex: 1, py: 1, bgcolor: '#f4f6fa' }}>
            {filtered.length === 0 ? (
              <Typography sx={{ p: 3, textAlign: 'center', color: '#565e6e', fontFamily: 'Roboto, sans-serif' }}>
                No notifications
              </Typography>
            ) : (
              filtered.map((item, i) => (
                <Box key={item.executionId}>
                  <NotificationRow
                    item={item}
                    unread={!readIds.has(item.executionId)}
                    onMarkRead={markRead}
                  />
                  {i < filtered.length - 1 && (
                    <Box sx={{ px: 2 }}>
                      <Divider sx={{ borderColor: 'rgba(153, 162, 184, 0.1)' }} />
                    </Box>
                  )}
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Popover>
    </>
  );
}

function MenuLikeFilter({ anchorEl, open, onClose, options, value, onSelect }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{ paper: { sx: { mt: 0.5, borderRadius: '8px', minWidth: 140 } } }}
    >
      {options.map((opt) => (
        <Box
          key={opt}
          onClick={() => onSelect(opt)}
          sx={{
            px: 2,
            py: 1,
            cursor: 'pointer',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 14,
            bgcolor: opt === value ? '#eff5ff' : 'transparent',
            '&:hover': { bgcolor: '#f3f8fd' },
          }}
        >
          {opt}
        </Box>
      ))}
    </Popover>
  );
}
