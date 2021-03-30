import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        bookingPackage: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Package',
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking