// TabPanel.tsx

import React, { ReactNode } from 'react';

interface TabPanelProps {
  isActive: boolean;
  children: ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ isActive, children }) => {
  return <div role="tabpanel" hidden={!isActive} aria-hidden={!isActive}>{children}</div>;
};
