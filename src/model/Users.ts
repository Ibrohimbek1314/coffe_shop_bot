import mongoose, { Schema, Document } from "mongoose";

export interface IUsers {
	_id: string;
	chat_id: number;
	username: string;
	phoneNumber: number;
	step: number;
	role: string;
}

const userSchema = new Schema(
	{
		chat_id: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
		},
		phoneNumber: {
			type: Number,
		},
		step: {
			type: Number,
			default: 0,
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IUsers>("Users", userSchema);
