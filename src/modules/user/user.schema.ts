import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: String,
	token: String,
});

export default UserSchema;
