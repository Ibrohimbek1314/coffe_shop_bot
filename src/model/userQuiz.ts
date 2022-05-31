import mongoose, { Document } from "mongoose";
import { v4 } from "uuid";

export interface IUserQuiz extends Document {
	_id: string;
	trueAnswers: number;
	falseAnswers: number;
	user_id: string;
}

const userQuizSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	trueAnswers: {
		type: Number,
		default: 0,
	},
	falseAnswers: {
		type: Number,
		default: 0,
	},
	user_id: {
		type: String,
		required: true,
		ref: "Users",
	},
});

export default mongoose.model<IUserQuiz>("UserQuiz", userQuizSchema);
