import * as mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
		url_source: { type: String, required: true },
		url_target: { type: String, required: true },
		uri: { type: String, required: true, unique: true },
		enable: { type: Boolean, required: true, default: true },
		stats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stats' }],
	},
	{
		timestamps: true,
	},
);

export default LinkSchema;
