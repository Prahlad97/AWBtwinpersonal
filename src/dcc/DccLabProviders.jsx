import { DemandCurveProvider } from '@/contexts/demand-curve-context';
import { SnackbarProvider } from '@/contexts/snackbar-context';
import { SegmentProvider } from '@/contexts/segment-context';
import { LookerExtensionMockProvider } from '@/providers/LookerExtensionMock.jsx';

/** Providers required by vendored production DCC UI (fixture-backed). */
export function DccLabProviders({ children }) {
  return (
    <LookerExtensionMockProvider>
      <SnackbarProvider>
        <SegmentProvider>
          <DemandCurveProvider>{children}</DemandCurveProvider>
        </SegmentProvider>
      </SnackbarProvider>
    </LookerExtensionMockProvider>
  );
}
