import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const DashboardComponent = componentLoader.add(
  'ResourceCardsDashboard',
  './components/dashboard.jsx'
);

export { componentLoader, DashboardComponent };
