import { useMemo, useState } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DashboardGrid } from '../charts/ChartPanel';
import { EvGridImpactMapPanel } from './EvGridImpactMapPanel';
import {
  EV_GRID_IMPACT_DATASETS,
  EV_GRID_IMPACT_VIEW_OPTIONS,
} from '../../fixtures/evGridImpact';
import { AWB } from '../../theme/awbTokens';

function utilizationCellColor(pct) {
  if (pct >= 90) return '#B71C1C';
  if (pct >= 75) return '#E53935';
  if (pct >= 60) return '#FB8C00';
  if (pct >= 40) return '#FDD835';
  return '#43A047';
}

function CapacityCell({ mw, barColor, maxMw }) {
  const widthPct = Math.min(100, (mw / maxMw) * 100);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
      <Box sx={{ flex: 1, height: 10, bgcolor: '#eef1f6', borderRadius: '2px', overflow: 'hidden' }}>
        <Box sx={{ width: `${widthPct}%`, height: '100%', bgcolor: barColor, borderRadius: '2px' }} />
      </Box>
      <Typography sx={{ fontSize: 11, color: '#1E232E', whiteSpace: 'nowrap' }}>{mw.toFixed(2)} MW</Typography>
    </Box>
  );
}

function EvGridImpactTable({ rows }) {
  const maxCapacity = useMemo(() => Math.max(...rows.map((r) => r.capacityMw)), [rows]);

  return (
    <Box sx={{ border: `1px solid ${AWB.border}`, borderRadius: '4px', overflow: 'auto', bgcolor: '#fff' }}>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: '#1E232E',
          textAlign: 'center',
          py: 1.5,
          borderBottom: `1px solid ${AWB.border}`,
        }}
      >
        Impact of EVs on Grid Assets
      </Typography>
      <Table size="small" sx={{ '& th': { fontSize: 11, fontWeight: 600, bgcolor: '#f8fafc' }, '& td': { fontSize: 11 } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 120 }} />
            <TableCell>Peak Hour</TableCell>
            <TableCell sx={{ minWidth: 160 }}>Capacity</TableCell>
            <TableCell align="right">Total EVs</TableCell>
            <TableCell align="right">Total EV Consumption</TableCell>
            <TableCell align="right">Max EV Consumption</TableCell>
            <TableCell align="right">EV Penetration</TableCell>
            <TableCell align="center" sx={{ minWidth: 72 }}>
              Utilization
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.asset} hover>
              <TableCell sx={{ fontWeight: 500 }}>{row.asset}</TableCell>
              <TableCell>{row.peakHour}</TableCell>
              <TableCell>
                <CapacityCell mw={row.capacityMw} barColor={row.capacityBarColor} maxMw={maxCapacity} />
              </TableCell>
              <TableCell align="right">{row.totalEvs}</TableCell>
              <TableCell align="right">{row.consumptionKwh.toFixed(2)} kWh</TableCell>
              <TableCell align="right">{row.maxConsumptionKwh.toFixed(2)} kWh</TableCell>
              <TableCell align="right">{row.penetration.toFixed(1)}%</TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: utilizationCellColor(row.utilizationPct),
                  color: row.utilizationPct >= 60 ? '#fff' : '#1E232E',
                  fontWeight: 600,
                  p: 0,
                }}
              >
                <Box sx={{ py: 0.75, px: 1 }}>{row.utilizationPct}%</Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

/** EV Grid Impact — dual maps, view-by dropdown, assets table (production layout). */
export function EvGridImpactDashboard() {
  const [viewBy, setViewBy] = useState('SUBSTATION');
  const rows = EV_GRID_IMPACT_DATASETS[viewBy].rows;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 1.5, gap: 1 }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={viewBy}
            onChange={(e) => setViewBy(e.target.value)}
            displayEmpty
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              fontSize: 13,
              bgcolor: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: AWB.border },
            }}
          >
            {EV_GRID_IMPACT_VIEW_OPTIONS.map((opt) => (
              <MenuItem key={opt.id} value={opt.id} sx={{ fontSize: 13 }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <DashboardGrid
        rows={[
          {
            columns: '1fr 1fr',
            cells: [
              <EvGridImpactMapPanel key="pen" title="EV Penetration" variant="penetration" />,
              <EvGridImpactMapPanel key="util" title="Utilization of Grid Assets" variant="utilization" />,
            ],
          },
          { columns: '1fr', cells: [<EvGridImpactTable key="tbl" rows={rows} />] },
        ]}
      />
    </Box>
  );
}
