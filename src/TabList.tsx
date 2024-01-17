// TabList.tsx

import React, { ReactNode } from 'react';

interface TabListProps {
  children: ReactNode;
}

export const TabList: React.FC<TabListProps> = ({ children }) => {
  return <div role="tablist">{children}</div>;
};
