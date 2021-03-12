import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		token: { type: String, required: true, default: uuidv4() },
		link: { type: [mongoose.Types.ObjectId] },
		createdAt: { type: Date },
		updatedAt: { type: Date },
	},
	{
		timestamps: true,
	},
);

export default UserSchema;
