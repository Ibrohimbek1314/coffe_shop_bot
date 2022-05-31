import mongoose, { Document } from "mongoose";
import { v4 } from "uuid";

export interface IQuiz {
	_id: string;
	question: string;
	answers: string[];
    trueAnswer: string;
    order: number;
	created_at: number;
}



const quizSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	question: {
		type: String,
		required: true,
	},
	answers: {
		type: [String],
		required: true,
	},
	trueAnswer: {
		type: String,
		required: true,
    },
    order: {
        type: Number,
        required: true
    },
	created_at: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model<IQuiz>("Quiz", quizSchema);
