import { randomUUID } from 'node:crypto';
import uploadFeature from '@adminjs/upload';
import { componentLoader } from '#src/admin/component-loader.js';

const treeImageUploadFeature = uploadFeature({
  componentLoader,
  provider: {
    aws: {
      bucket: process.env.AWS_S3_BUCKET,
      region: process.env.AWS_S3_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
  uploadPath: (record, filename) => {
    const safeName = filename.replace(/\s+/g, '-').toLowerCase();
    const idPart = record?.id?.() ?? randomUUID();
    return `trees/${idPart}/${Date.now()}-${safeName}`;
  },
  properties: {
    file: 'imageFile',
    filePath: 'imageUrl',
    key: 'imageKey',
    bucket: 'imageBucket',
    mimeType: 'imageMimeType',
    filename: 'imageFilename',
    filesize: 'imageFilesize',
  },
  validation: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 10 * 1024 * 1024,
  },
});

export default treeImageUploadFeature;
