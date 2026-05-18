import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DashboardGrid } from '../components/charts/ChartPanel';
import { BarChart } from '../components/charts/BarChart';
import { HeatmapChart } from '../components/charts/HeatmapChart';
import { EvMonthlyOwnershipCombo } from '../components/charts/EvMonthlyOwnershipCombo';
import {
  evAdoptionByZip,
  evChargerAmplitudeBars,
  evChargingDurationBars,
  evChargingFrequencyBars,
  evChargingHeatmap,
  evGridImpactTableRows,
  evHourlyConsumptionBars,
  evMonthlyOwnershipTrend,
} from '../fixtures';

function LabMapPlaceholder({ title, caption }) {
  return (
    <Box
      sx={{
        border: '1px dashed #c5cdd8',
        borderRadius: '4px',
        p: 3,
        textAlign: 'center',
        bgcolor: '#fafbfc',
        minHeight: 220,
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#1E232E' }}>{title}</Typography>
      <Typography sx={{ fontSize: 12, color: '#6b7280', mt: 1 }}>{caption}</Typography>
    </Box>
  );
}

function utilizationColor(pct) {
  if (pct >= 85) return '#ef4444';
  if (pct >= 65) return '#f59e0b';
  return '#22c55e';
}

function EvGridImpactTable() {
  return (
    <Box sx={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'auto', p: 2, bgcolor: '#fff' }}>
      <Typography sx={{ fontWeight: 600, fontSize: 14, textAlign: 'center', mb: 2, color: '#1E232E' }}>
        Impact of EVs on Grid Assets
      </Typography>
      <Table size="small" sx={{ '& td': { fontSize: 11 }, '& th': { fontSize: 11 } }}>
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Peak hour</TableCell>
            <TableCell align="right">Capacity (MW)</TableCell>
            <TableCell align="right">Total EVs</TableCell>
            <TableCell align="right">Consumption (MWh)</TableCell>
            <TableCell align="right">Max (MWh)</TableCell>
            <TableCell align="right">Penetration</TableCell>
            <TableCell align="center">Utilization</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {evGridImpactTableRows.map((row) => (
            <TableRow key={row.asset}>
              <TableCell>{row.asset}</TableCell>
              <TableCell>{row.peakHour}</TableCell>
              <TableCell align="right">{row.capacityMw.toFixed(2)}</TableCell>
              <TableCell align="right">{row.totalEvs}</TableCell>
              <TableCell align="right">{row.consumptionMwh.toFixed(2)}</TableCell>
              <TableCell align="right">{row.maxMwh.toFixed(2)}</TableCell>
              <TableCell align="right">{row.penetration}%</TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    height: 10,
                    borderRadius: 1,
                    bgcolor: utilizationColor(row.utilizationPct),
                    minWidth: 48,
                    mx: 'auto',
                  }}
                  title={`${row.utilizationPct}%`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export function EvAnalyticsView({ subId }) {
  /** Matches Bidgely "EV Charging Behavior": hourly consumption, ownership trend, charger amplitude. */
  if (subId === 'CHARGING_BEHAVIOR') {
    return (
      <DashboardGrid
        rows={[
          { columns: '1fr', cells: [<BarChart key="hr" {...evHourlyConsumptionBars} height={320} />] },
          {
            columns: '1fr',
            cells: [<EvMonthlyOwnershipCombo key="mo" {...evMonthlyOwnershipTrend} />],
          },
          { columns: '1fr', cells: [<BarChart key="amp" {...evChargerAmplitudeBars} height={300} />] },
        ]}
      />
    );
  }

  if (subId === 'EV_ADOPTION') {
    return (
      <DashboardGrid
        rows={[
          {
            columns: '1fr',
            cells: [
              <BarChart
                key="zip"
                {...evAdoptionByZip}
                horizontal
                height={440}
              />,
            ],
          },
        ]}
      />
    );
  }

  if (subId === 'EV_GRID_IMPACT') {
    return (
      <DashboardGrid
        rows={[
          { columns: '1fr', cells: [<BarChart key="freq" {...evChargingFrequencyBars} height={280} />] },
          { columns: '1fr', cells: [<BarChart key="dur" {...evChargingDurationBars} height={320} />] },
          {
            columns: '1fr',
            cells: [
              <HeatmapChart
                key="hm"
                title={evChargingHeatmap.title}
                columnCategories={evChargingHeatmap.columnCategories}
                rowCategories={evChargingHeatmap.rowCategories}
                data={evChargingHeatmap.data}
                height={520}
              />,
            ],
          },
          {
            columns: '1fr 1fr',
            cells: [
              <LabMapPlaceholder
                key="p1"
                title="EV Penetration"
                caption="GIS map preview — Lab fixture focuses on charts and table."
              />,
              <LabMapPlaceholder
                key="p2"
                title="Utilization of Grid Assets"
                caption="GIS map preview — Lab fixture focuses on charts and table."
              />,
            ],
          },
          { columns: '1fr', cells: [<EvGridImpactTable key="tbl" />] },
        ]}
      />
    );
  }

  return null;
}
