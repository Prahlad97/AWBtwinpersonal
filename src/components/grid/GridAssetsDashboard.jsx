import { useState } from 'react';
import { Box } from '@mui/material';
import { GRID_ASSETS_TABLE_SECTIONS } from '../../fixtures/gridAssetsTables';
import { GridAssetsTable } from './GridAssetsTable';
import { Nwa8760Toolbar } from './Nwa8760Toolbar';

/** Grid Asset → Assets — substation, feeder, transformer demand tables. */
export function GridAssetsDashboard() {
  const [tempScale, setTempScale] = useState('C');

  return (
    <Box sx={{ width: '100%' }}>
      <Nwa8760Toolbar tempScale={tempScale} onTempScaleChange={setTempScale} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {GRID_ASSETS_TABLE_SECTIONS.map((section) => (
          <GridAssetsTable
            key={section.id}
            title={section.title}
            rows={section.rows}
            unit={section.unit}
            allowNegativeMin={section.allowNegativeMin}
          />
        ))}
      </Box>
    </Box>
  );
}
