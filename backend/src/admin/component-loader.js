import { ComponentLoader } from 'adminjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentLoader = new ComponentLoader();

const DashboardComponent = componentLoader.add(
  'ResourceCardsDashboard',
  path.join(__dirname, 'components/dashboard.jsx')
);

export { componentLoader, DashboardComponent };
export default componentLoader;
