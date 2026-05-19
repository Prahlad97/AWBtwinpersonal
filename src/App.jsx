import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StylesProvider, ThemeProvider as MuiV4ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { FilterProvider } from './context/FilterContext';
import { MapViewProvider } from './context/MapViewContext';
import { LabExtensionProvider } from './providers/LabExtensionProvider';
import { DccLabProviders } from './dcc/DccLabProviders';
import DemandCurveLayout from '@dcc/components/layout/dcc-layout';
import DemandCurveMain from '@dcc/dcc-main';
import DemandCurveComparison from '@dcc/pages/dcc-details';
import { AnalyticsLayout } from './layouts/AnalyticsLayout';
import { DashboardContent } from './views/DashboardContent';
import { theme } from './theme';

const muiV4Theme = createMuiTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StylesProvider injectFirst>
        <MuiV4ThemeProvider theme={muiV4Theme}>
          <LabExtensionProvider>
            <FilterProvider>
              <MapViewProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboards/account" replace />} />
                    <Route
                      path="/comparisons"
                      element={
                        <DccLabProviders>
                          <DemandCurveLayout>
                            <DemandCurveMain />
                          </DemandCurveLayout>
                        </DccLabProviders>
                      }
                    />
                    <Route
                      path="/comparisons/:dccId"
                      element={
                        <DccLabProviders>
                          <DemandCurveLayout>
                            <DemandCurveComparison />
                          </DemandCurveLayout>
                        </DccLabProviders>
                      }
                    />
                    <Route path="/dashboards/:tab" element={<AnalyticsLayout />}>
                      <Route index element={<DashboardContent />} />
                      <Route path=":subtab" element={<DashboardContent />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/dashboards/account" replace />} />
                  </Routes>
                </BrowserRouter>
              </MapViewProvider>
            </FilterProvider>
          </LabExtensionProvider>
        </MuiV4ThemeProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}
