import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import homeIcon from '../../assets/images/iconamoon_home.svg';
import { getSubtab, getTabByRoute } from '../../config/tabs';
import { AWB, font } from '../../theme/awbTokens';

const subTabSx = (active) => ({
  ...font.subTab,
  textTransform: 'capitalize',
  textDecoration: 'none',
  color: AWB.brandBlue,
  bgcolor: AWB.tabInactiveBg,
  minHeight: 36,
  py: '9px',
  px: '32px',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  pointerEvents: 'auto',
  ...(active && {
    bgcolor: '#fff',
    borderBottom: `2px solid ${AWB.tabActiveAccent}`,
  }),
});

/** Production chrome: `embed-dashboard-nuj.js` homeTab + tabButton */
export function SubTabNav() {
  const { tab, subtab } = useParams();
  const current = getTabByRoute(tab);
  const extraSubtabs = current.subtabs.filter((s) => s.id !== 'HOME');

  if (extraSubtabs.length === 0) return null;

  const activeSub = getSubtab(current, subtab);
  const homeActive = activeSub?.id === 'HOME';

  return (
    <Box
      component="nav"
      aria-label="Sub-views"
      sx={{
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
        rowGap: '10px',
        mt: '20px',
        mb: 1,
        px: 0,
      }}
    >
      <Link to={`/dashboards/${tab}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
        <Box sx={subTabSx(homeActive)} component="span">
          <Box component="img" src={homeIcon} alt="Home" sx={{ width: 18, height: 18, pointerEvents: 'none' }} />
        </Box>
      </Link>
      {extraSubtabs.map((sub) => {
        const active = activeSub?.id === sub.id;
        return (
          <Link
            key={sub.id}
            to={`/dashboards/${tab}/${sub.route}`}
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            <Box sx={subTabSx(active)} component="span">
              {sub.name}
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}
