import { useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AWB } from '../../theme/awbTokens';

const DEMAND_BAR = '#4A90E2';
const CAPACITY_BAR = '#9B59B6';

function utilizationCellColor(pct) {
  if (pct >= 90) return '#B71C1C';
  if (pct >= 75) return '#E53935';
  if (pct >= 60) return '#FB8C00';
  if (pct >= 40) return '#FDD835';
  return '#43A047';
}

function formatValue(value, unit) {
  if (unit === 'kW') {
    return `${value.toFixed(1)} kW`;
  }
  return `${value.toFixed(2)} MW`;
}

/** Left-aligned bar from zero (demand avg/max, capacity). */
function PositiveBarCell({ value, maxValue, unit, barColor }) {
  const widthPct = maxValue > 0 ? Math.min(100, (Math.abs(value) / maxValue) * 100) : 0;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 130 }}>
      <Box sx={{ flex: 1, height: 10, bgcolor: '#eef1f6', borderRadius: '2px', overflow: 'hidden' }}>
        <Box sx={{ width: `${widthPct}%`, height: '100%', bgcolor: barColor, borderRadius: '2px' }} />
      </Box>
      <Typography sx={{ fontSize: 11, color: '#1E232E', whiteSpace: 'nowrap', minWidth: 56 }}>
        {formatValue(value, unit)}
      </Typography>
    </Box>
  );
}

/**
 * Bidirectional bar: zero at center; negative extends left, positive extends right.
 * Bar width is capped at 50% of track per side, scaled to maxAbs across the column.
 */
function BidirectionalBarCell({ value, maxAbs, unit, barColor }) {
  const halfPct = maxAbs > 0 ? Math.min(50, (Math.abs(value) / maxAbs) * 50) : 0;
  const isNegative = value < 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 130 }}>
      <Box
        sx={{
          flex: 1,
          height: 10,
          bgcolor: '#eef1f6',
          borderRadius: '2px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 1,
            bgcolor: '#c5cdd8',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        />
        {isNegative ? (
          <Box
            sx={{
              position: 'absolute',
              right: '50%',
              top: 0,
              height: '100%',
              width: `${halfPct}%`,
              bgcolor: barColor,
              borderRadius: '2px 0 0 2px',
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              height: '100%',
              width: `${halfPct}%`,
              bgcolor: barColor,
              borderRadius: '0 2px 2px 0',
            }}
          />
        )}
      </Box>
      <Typography sx={{ fontSize: 11, color: '#1E232E', whiteSpace: 'nowrap', minWidth: 56 }}>
        {formatValue(value, unit)}
      </Typography>
    </Box>
  );
}

function DemandBarCell({ value, maxPositive, maxAbsForMin, unit, allowNegativeMin, isMinColumn }) {
  if (isMinColumn && allowNegativeMin) {
    return <BidirectionalBarCell value={value} maxAbs={maxAbsForMin} unit={unit} barColor={DEMAND_BAR} />;
  }
  return <PositiveBarCell value={value} maxValue={maxPositive} unit={unit} barColor={DEMAND_BAR} />;
}

export function GridAssetsTable({ title, rows, unit = 'MW', allowNegativeMin = false }) {
  const scales = useMemo(() => {
    const demandFields = ['minDemand', 'avgDemand', 'maxDemand'];
    const maxPositive = Math.max(
      ...demandFields.flatMap((f) => rows.map((r) => Math.max(0, r[f]))),
      ...rows.map((r) => r.capacity),
      0.01
    );
    const maxAbsMin = allowNegativeMin
      ? Math.max(...rows.map((r) => Math.abs(r.minDemand)), 0.01)
      : maxPositive;
    const maxCapacity = Math.max(...rows.map((r) => r.capacity), 0.01);
    return { maxPositive, maxAbsMin, maxCapacity };
  }, [rows, allowNegativeMin]);

  return (
    <Box sx={{ border: `1px solid ${AWB.border}`, borderRadius: '4px', overflow: 'auto', bgcolor: '#fff' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.5,
          py: 1,
          borderBottom: `1px solid ${AWB.border}`,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1E232E' }}>
          {title}
        </Typography>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} aria-hidden />
      </Box>

      <Table
        size="small"
        sx={{
          '& th': { fontSize: 11, fontWeight: 600, bgcolor: '#f8fafc', whiteSpace: 'nowrap' },
          '& td': { fontSize: 11, py: 0.75 },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 200 }}>Asset Name</TableCell>
            <TableCell sx={{ minWidth: 150 }}>Hourly Minimum Demand</TableCell>
            <TableCell sx={{ minWidth: 150 }}>Hourly Average Demand</TableCell>
            <TableCell sx={{ minWidth: 150 }}>Hourly Maximum Demand</TableCell>
            <TableCell sx={{ minWidth: 150 }}>Capacity</TableCell>
            <TableCell align="center" sx={{ minWidth: 88 }}>
              Utilization
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name} hover>
              <TableCell sx={{ fontWeight: 500 }}>
                <Box component="span" sx={{ color: '#6b7280', mr: 1 }}>
                  {index + 1}
                </Box>
                {row.name}
              </TableCell>
              <TableCell>
                <DemandBarCell
                  value={row.minDemand}
                  maxPositive={scales.maxPositive}
                  maxAbsForMin={scales.maxAbsMin}
                  unit={unit}
                  allowNegativeMin={allowNegativeMin}
                  isMinColumn
                />
              </TableCell>
              <TableCell>
                <DemandBarCell
                  value={row.avgDemand}
                  maxPositive={scales.maxPositive}
                  maxAbsForMin={scales.maxAbsMin}
                  unit={unit}
                  allowNegativeMin={allowNegativeMin}
                />
              </TableCell>
              <TableCell>
                <DemandBarCell
                  value={row.maxDemand}
                  maxPositive={scales.maxPositive}
                  maxAbsForMin={scales.maxAbsMin}
                  unit={unit}
                  allowNegativeMin={allowNegativeMin}
                />
              </TableCell>
              <TableCell>
                <PositiveBarCell
                  value={row.capacity}
                  maxValue={scales.maxCapacity}
                  unit={unit}
                  barColor={CAPACITY_BAR}
                />
              </TableCell>
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
