import asyncHandler from 'express-async-handler'
import Package from '../models/packageModel.js'

// @desc    Fetch all packages
// @route   GET /api/packages
// @access  Public
const getPackages = asyncHandler(async (req, res) =>
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

    const count = await Package.countDocuments({ ...keyword })
    const packages = await Package.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ packages, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single package
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = asyncHandler(async (req, res) =>
{
    const singlePackage = await Package.findById(req.params.id)

    if (singlePackage) {
        res.json(singlePackage)
    } else {
        res.status(404)
        throw new Error('Package not found')
    }
})

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = asyncHandler(async (req, res) =>
{
    const singlePackage = await Package.findById(req.params.id)

    if (singlePackage) {
        await singlePackage.remove()
        res.json({ message: 'Package removed' })
    } else {
        res.status(404)
        throw new Error('Package not found')
    }
})

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = asyncHandler(async (req, res) =>
{
    const singlePackage = new Package({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdPackage = await singlePackage.save()
    res.status(201).json(createdPackage)
})

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = asyncHandler(async (req, res) =>
{
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const singlePackage = await Package.findById(req.params.id)

    if (singlePackage) {
        singlePackage.name = name
        singlePackage.price = price
        singlePackage.description = description
        singlePackage.image = image
        singlePackage.brand = brand
        singlePackage.category = category
        singlePackage.countInStock = countInStock

        const updatedPackage = await singlePackage.save()
        res.json(updatedPackage)
    } else {
        res.status(404)
        throw new Error('Package not found')
    }
})

// @desc    Create new review
// @route   POST /api/packages/:id/reviews
// @access  Private
const createPackageReview = asyncHandler(async (req, res) =>
{
    const { rating, comment } = req.body

    const singlePackage = await Package.findById(req.params.id)

    if (singlePackage) {
        const alreadyReviewed = singlePackage.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Package already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        singlePackage.reviews.push(review)

        singlePackage.numReviews = singlePackage.reviews.length

        singlePackage.rating =
            singlePackage.reviews.reduce((acc, item) => item.rating + acc, 0) /
            singlePackage.reviews.length

        await singlePackage.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Package not found')
    }
})


export
{
    getPackages,
    getPackageById,
    deletePackage,
    createPackage,
    updatePackage,
    createPackageReview,
}