import path from 'node:path';
import { bundle } from '@adminjs/bundler';
import { componentLoader } from '../src/admin/component-loader.js';

const destinationDir = path.resolve(process.cwd(), '.adminjs');

await bundle({ componentLoader, destinationDir });
