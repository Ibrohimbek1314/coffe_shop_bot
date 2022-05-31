import mongoose, { Document } from "mongoose";
import { v4 } from "uuid";

export interface IMenyu {
	_id: string;
	coffename: string; 
    description: string;
    price: number;
}

const menyuSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	coffename: {
		type: String,
		required: true
	},
    description:{
		type: [String],
		required: true,
	},
    price: {
        type: Number,
        required: true
    }
})

export default mongoose.model<IMenyu>("Menyu", menyuSchema);