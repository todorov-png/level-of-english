import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        token: { type: String, required: true },
    },
    { versionKey: false }
);

export default model('User', userSchema);
