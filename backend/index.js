import express from 'express'
import mongoose, { connect } from 'mongoose'
import { PORT  , MONGO_DB_URL} from './config.js'
const app = express()

mongoose
.connect(MONGO_DB_URL)
.then(() => {
    console.log("MongoDB is connected successfully")
    app.listen(PORT , () => {
        console.log(`The Apps is running on the PORT ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})
