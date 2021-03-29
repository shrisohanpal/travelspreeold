import mongoose from 'mongoose'

const destinationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        location: {
            lat: {
                type: Number
            },
            lon: {
                type: Number
            }
        },
        tours: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
)

const destination = mongoose.model('destination', destinationSchema)

export default destination