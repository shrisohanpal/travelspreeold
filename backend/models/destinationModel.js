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
        description: {
            type: String,
            required: true,
        },
        location: {
            langitude: {
                type: String
            },
            longitude: {
                type: String
            }
        }
    },
    {
        timestamps: true,
    }
)

const destination = mongoose.model('destination', destinationSchema)

export default destination