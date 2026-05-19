import { useContext, useMemo } from 'react';
import { LabExtensionProvider, LabExtensionContext } from './LabExtensionProvider.jsx';

const LAB_USER = {
  id: 'lab-user-1',
  first_name: 'Alex',
  last_name: 'Morgan',
  email: 'lab@bidgely.com',
};

function EnhanceExtension({ children }) {
  const parent = useContext(LabExtensionContext);
  const value = useMemo(() => {
    if (!parent) return parent;
    return {
      ...parent,
      state: {
        ...parent.state,
        allowedPilotName: 'demo',
        allowedPilotIds: [1],
        userInfo: LAB_USER,
        userAttributeIds: {},
        isAwbV2: true,
        isAwbNUJ: true,
      },
    };
  }, [parent]);
  return <LabExtensionContext.Provider value={value}>{children}</LabExtensionContext.Provider>;
}

/** ExtensionContext with DCC fields expected by production hooks. */
export function LabDccExtensionProvider({ children }) {
  return (
    <LabExtensionProvider>
      <EnhanceExtension>{children}</EnhanceExtension>
    </LabExtensionProvider>
  );
}

export { LabExtensionContext };
