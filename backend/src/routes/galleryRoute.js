import express from 'express';
import multer from 'multer';
import bytes from 'bytes';
import {
  createGalleryItem,
  getAllGalleryItems,
  getGalleryItemById,
  updateGalleryItemById,
  deleteGalleryItemById,
  validateGallery,
  showValidateResult,
} from '#src/controllers/galleryController.js';
import { storage } from '#root/config/cloudstorage.js';
// import { authorize } from '#src/middlewares/authorization.js';

const router = express.Router();
/*

const storage = multer.diskStorage({
  destination: (req, file, cb) => { //where to store the file
    cb(null, './storages');
  },
  filename: (req, file, cb) => { //generate a new filename
    console.log("the file is", file)
    const ext = file.mimetype.split('/')[1];
    const originalNameExtension = file.originalname.split('.')[0];

    cb(null, `${originalNameExtension}-${Date.now()}.${ext}`); //this will be the filename
  }
});

*/

const upload = multer({
  storage: storage,
  limits: { fileSize: bytes('3MB') },
  fileFilter: (req, file, cb) => {
    console.log('File Info:', file);
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true);
    } else {
      return cb(new Error('Only jpeg images allowed'));
    }
  },
});

router.post(
  '/create',
  upload.single('image'),
  validateGallery,
  showValidateResult,
  createGalleryItem
);
router.get('/', getAllGalleryItems);
router.get('/:id', getGalleryItemById);
router.put('/update/:id', validateGallery, updateGalleryItemById);
router.delete('/delete/:id', deleteGalleryItemById);

export default router;
