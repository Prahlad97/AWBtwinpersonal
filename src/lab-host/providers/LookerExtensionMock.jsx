import { createContext } from 'react';

export const ExtensionContext = createContext({
  extensionSDK: {
    localStorageGetItem: async (key) => (key === 'access_token' ? 'lab-token' : null),
    localStorageSetItem: async () => {},
  },
  core40SDK: {},
});

export function LookerExtensionMockProvider({ children }) {
  const value = {
    extensionSDK: {
      localStorageGetItem: async (key) => (key === 'access_token' ? 'lab-token' : null),
      localStorageSetItem: async () => {},
    },
    core40SDK: {},
  };
  return <ExtensionContext.Provider value={value}>{children}</ExtensionContext.Provider>;
}
