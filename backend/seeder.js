import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import users from './data/users.js'
import packages from './data/packages.js'
import destinations from './data/destinations.js'

import User from './models/userModel.js'
import Package from './models/packageModel.js'
import Destination from './models/destinationModel.js'
//import Order from './models/orderModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () =>
{
    try {
        //  await Order.deleteMany()
        await Destination.deleteMany()
        await Package.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const samplePackages = packages.map((singlePackage) =>
        {
            return { ...singlePackage, user: adminUser }
        })

        const sampleDestinations = destinations.map((destination) =>
        {
            return { ...destination, user: adminUser }
        })

        await Package.insertMany(samplePackages)
        await Destination.insertMany(sampleDestinations)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () =>
{
    try {
        //   await Order.deleteMany()
        await Destination.deleteMany()
        await Package.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}