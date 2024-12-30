import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    companies: string[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    companies: [{ type: String }]
},{
    timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);