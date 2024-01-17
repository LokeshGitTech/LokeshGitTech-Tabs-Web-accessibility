// Tab.tsx

import React, { ReactNode, KeyboardEvent } from 'react';

interface TabProps {
  index: number | any;
  isActive: boolean;
  onTabChange: (index: number) => void;
  children: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ index, isActive, onTabChange, children }) => {
  const handleTabClick = () => {
    onTabChange(index);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTabClick();
    }
  };

  return (
    <div
      role="tab"
      tabIndex={isActive ? 0 : -1}
      onClick={handleTabClick}
      onKeyPress={handleKeyPress}
      aria-selected={isActive}
      aria-controls={`panel-${index}`}
    >
      {children}
    </div>
  );
};
