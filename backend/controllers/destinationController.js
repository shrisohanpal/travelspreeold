import asyncHandler from 'express-async-handler'
import Destination from '../models/destinationModel.js'

// @desc    Fetch all destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = asyncHandler(async (req, res) =>
{
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Destination.countDocuments({ ...keyword })
    const destinations = await Destination.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ destinations, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single destination
// @route   GET /api/destinations/:id
// @access  Public
const getDestinationById = asyncHandler(async (req, res) =>
{
    const destination = await Destination.findById(req.params.id)

    if (destination) {
        res.json(destination)
    } else {
        res.status(404)
        throw new Error('Destination not found')
    }
})

// @desc    Delete a destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
const deleteDestination = asyncHandler(async (req, res) =>
{
    const destination = await Destination.findById(req.params.id)

    if (destination) {
        await destination.remove()
        res.json({ message: 'Destination removed' })
    } else {
        res.status(404)
        throw new Error('Destination not found')
    }
})

// @desc    Create a destination
// @route   POST /api/destinations
// @access  Private/Admin
const createDestination = asyncHandler(async (req, res) =>
{
    const destination = new Destination({
        name: 'Sample name',
        user: req.user._id,
        image: '/images/sample.jpg',
        description: 'Sample description',
        //     location: whatever
    })

    const createdDestination = await destination.save()
    res.status(201).json(createdDestination)
})

// @desc    Update a destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
const updateDestination = asyncHandler(async (req, res) =>
{
    const {
        name,
        description,
        image,
        location,
    } = req.body

    const destination = await Destination.findById(req.params.id)

    if (destination) {
        destination.name = name
        destination.description = description
        destination.image = image
        destination.location = location

        const updatedDestination = await destination.save()
        res.json(updatedDestination)
    } else {
        res.status(404)
        throw new Error('Destination not found')
    }
})


export
{
    getDestinations,
    getDestinationById,
    deleteDestination,
    createDestination,
    updateDestination,
}