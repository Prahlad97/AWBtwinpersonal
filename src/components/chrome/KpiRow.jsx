import {
  Box,
  Typography,
} from '@mui/material';
import dropdownIcon from '../../assets/images/dropdown.svg';
import { getKpiDisplay } from '../../adapters/mockKpi';
import { AWB } from '../../theme/awbTokens';
import RefreshCache from '../../chrome/awb/RefreshCache';
import AccountsKpi from '../../chrome/awb/AccountsKpi';
import ConsumptionKpi from '../../chrome/awb/ConsumptionKpi';

const kpiBorder = '#D0D6E7';
const labelSx = { fontFamily: 'Roboto, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: '20px', color: AWB.textPrimary };
const valueSx = { fontFamily: 'Roboto, sans-serif', fontSize: 18, fontWeight: 700, lineHeight: '22px', color: AWB.textPrimary };

function SolarKpi({ value }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 164,
        height: 70,
        p: '12px',
        borderRadius: '4px',
        border: `1px solid ${kpiBorder}`,
        bgcolor: '#fff',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
        <Typography sx={labelSx}>Solar Generation</Typography>
      </Box>
      <Typography sx={{ ...valueSx, mt: 0.5 }}>{value}</Typography>
    </Box>
  );
}

export function KpiRow({ onSaveSegment }) {
  const kpi = getKpiDisplay();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
      <AccountsKpi
        bidgelyIds={kpi.bidgelyIds}
        customers={kpi.customers}
        premises={kpi.premises}
        meters={kpi.meters}
        onSaveSegment={onSaveSegment}
      />
      <ConsumptionKpi
        consumptionTotal={kpi.consumptionTotal}
        consumptionAvg={kpi.consumptionAvg}
        netDemandTotal={kpi.netDemandTotal}
        netDemandAvg={kpi.netDemandAvg}
      />
      <SolarKpi value={kpi.solarGeneration} />
      <RefreshCache />
    </Box>
  );
}
