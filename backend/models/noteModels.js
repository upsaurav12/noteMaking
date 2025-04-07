import mongoose from "mongoose";

const noteBook = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        }
    }
)

export const Note = mongoose.model('note' , noteBook)
