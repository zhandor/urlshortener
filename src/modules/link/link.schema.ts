import * as mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema(
	{
		user: { type: [mongoose.Types.ObjectId], required: true },
		createdAt: { type: Date },
		updatedAt: { type: Date },
	},
	{
		timestamps: true,
	},
);

export default LinkSchema;
