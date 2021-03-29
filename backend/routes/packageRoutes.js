import express from 'express'
const router = express.Router()
import
{
    getPackages,
    getPackageById,
    deletePackage,
    createPackage,
    updatePackage,
    createPackageReview,
} from '../controllers/packageController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPackages).post(protect, admin, createPackage)
router.route('/:id/reviews').post(protect, createPackageReview)
router
    .route('/:id')
    .get(getPackageById)
    .delete(protect, admin, deletePackage)
    .put(protect, admin, updatePackage)

export default router