import express from 'express'
import mongoose from 'mongoose'
import { PORT  , MONGO_DB_URL} from './config.js'
import { Note } from './models/noteModels.js'
import cors from 'cors'
const app = express()

app.use(express.json())

app.use(cors())


app.get('/', (req , res) => {
    return res.status(201).send({message : "Hello Hello world"})
})


app.get('/notes' , async (req , res) => {
    try {
        const notes = await Note.find({})
        return res.status(201).send({
            length : notes.length,
            body: notes
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})


app.post('/notes' , async (req , res) => {
    try {
        if (!req.body.content) {
            return res.status(404).send({message: "fields are required"})
        }

        const newNote = {
            content : req.body.content
        }

        const note = await Note.create(newNote);
        return res.status(201).send({message: note})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})
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
