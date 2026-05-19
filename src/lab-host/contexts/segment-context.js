import { createContext, useMemo, useState } from 'react';

const SegmentContext = createContext(null);

export function SegmentProvider({ children }) {
  const [segmentSnapshots] = useState([
    { segmentSnapshotId: 'snap-1', segmentSnapshotName: 'Winter peak cohort' },
    { segmentSnapshotId: 'snap-2', segmentSnapshotName: 'EV homes — Feeder A' },
  ]);
  const [savedFilters, setSavedFilters] = useState([
    { id: 'sf-1', name: 'AMI filters', filters: {} },
    { id: 'sf-2', name: 'DEFAULT', filters: {} },
  ]);
  const [currentDrProgramData] = useState([]);
  const [selectedDrEventIdsForDcc, setSelectedDrEventIdsForDcc] = useState({});

  const value = useMemo(
    () => ({
      state: {
        segmentSnapshots,
        savedFilters,
        currentDrProgramData,
        selectedDrEventIdsForDcc,
      },
      actions: {
        setSavedFilters,
        setSelectedDrEventIdsForDcc,
      },
    }),
    [segmentSnapshots, savedFilters, currentDrProgramData, selectedDrEventIdsForDcc]
  );

  return <SegmentContext.Provider value={value}>{children}</SegmentContext.Provider>;
}

export { SegmentContext };
