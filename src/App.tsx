// App.tsx
import { Tabs, TabList, Tab, TabPanel} from './Tabs';
import "./App.css"

function App() {

  return (
    <div>
      <Tabs defaultSelectedTab="tab1" tabsPrefix="tabs1" >
        <TabList aria-label="TabList1" tabListClass="tab-list-class">
          <Tab tab="tab1" tabClass="tab-class" activeTabClass="active-tab-class">tab 1</Tab>
          <Tab tab="tab2" tabClass="tab-class" activeTabClass="active-tab-class">tab 2</Tab>
          <Tab tab="tab3" tabClass="tab-class" activeTabClass="active-tab-class">tab 3</Tab>
        </TabList>
        <TabPanel tab="tab1" tabPanelClass="tab-panel-class">Content for tab 1</TabPanel>
        <TabPanel tab="tab2" tabPanelClass="tab-panel-class">Content for tab 2</TabPanel>
        <TabPanel tab="tab3" tabPanelClass="tab-panel-class">Content for tab 3</TabPanel>
      </Tabs>

      <Tabs defaultSelectedTab="tabA" tabsPrefix="tabs2" >
        <TabList aria-label="TabList2">
          <Tab tab="tabA">tab A</Tab>
          <Tab tab="tabB">tab B</Tab>
          <Tab tab="tabC">tab C</Tab>
        </TabList>
        <TabPanel tab="tabA">Content for tab A</TabPanel>
        <TabPanel tab="tabB">Content for tab B</TabPanel>
        <TabPanel tab="tabC">Content for tab C</TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
