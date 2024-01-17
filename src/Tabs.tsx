// Tabs.tsx
import React, { createContext, useContext, useCallback } from 'react';
import './Tabs.css';

type TabsContextProps = {
  selectedTab: string | null;
  selectTab: (tab: string) => void;
  tabsPrefix: string;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a TabsProvider');
  }
  return context;
}

function Tabs({
  children,
  defaultSelectedTab,
  tabsPrefix
}: {
  children: React.ReactNode;
  defaultSelectedTab: string;
  tabsPrefix: string;
}) {
  const [selectedTab, setSelectedTab] = React.useState<string>(defaultSelectedTab);

  const selectTab = React.useCallback((tab: string) => {
    setSelectedTab(tab);
  }, []);

  const defaultGetAriaControls = (tab: string) => `${tabsPrefix}-tabpanel-${tab}`;

  return (
    <TabsContext.Provider
      value={{
        selectedTab,
        selectTab,
        tabsPrefix
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

function TabList({
  children,
  tabListClass,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  tabListClass?: string;
  'aria-label': string;
}) {
  const refList = React.useRef<HTMLDivElement>(null);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const list = refList.current;
    if (!list) return;

    const tabs = Array.from<HTMLElement>(
      list.querySelectorAll('[role="tab"]:not([disabled])')
    );

    const index = tabs.indexOf(document.activeElement as HTMLElement);
    if (index < 0) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        const next = (index - 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        const next = (index + 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        break;
      }
    }
  }, []);

  return (
    <div ref={refList} role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown} className={`tab-list ${tabListClass}`}>
      {children}
    </div>
  );
}

function Tab({
  children,
  tab,
  tabClass,
  activeTabClass
}: {
  tab: string;
  children: React.ReactNode;
  tabClass?: string;
  activeTabClass?: string; 
}) {
  const { selectedTab, selectTab, tabsPrefix} = useTabsContext();

  return (
    <div
      role="tab"
      aria-selected={selectedTab === tab}
      aria-controls={`tab-${tabsPrefix}-tabpanel-${tab}`}
      onClick={() => {
        selectTab(tab);
      }}
      tabIndex={selectedTab === tab ? 0 : -1}
      style={{ fontWeight: selectedTab === tab ? 'bold' : 'normal' }}
      className={`tab ${tabClass} ${selectedTab === tab ? `active-tab ${activeTabClass}` : ''}`}
    >
      {children}
    </div>
  );
}

function TabPanel({
  children,
  tab,
  tabPanelClass
}: {
  tab: string;
  children: React.ReactNode;
  tabPanelClass?: string;
}) {
  const { selectedTab, tabsPrefix } = useTabsContext();

  if (selectedTab !== tab) return null;

  return (
    <div role="tabpanel" tabIndex={0} id={`tab-${tabsPrefix}-tabpanel-${tab}`} className={`tab-panel ${tabPanelClass}`}>
      {children}
    </div>
  );
}

export { Tabs, TabList, Tab, TabPanel, useTabsContext };
