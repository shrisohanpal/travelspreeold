import express from 'express'
const router = express.Router()
import
{
    getDestinations,
    getDestinationById,
    deleteDestination,
    createDestination,
    updateDestination,
} from '../controllers/destinationController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getDestinations).post(protect, admin, createDestination)
router
    .route('/:id')
    .get(getDestinationById)
    .delete(protect, admin, deleteDestination)
    .put(protect, admin, updateDestination)

export default router