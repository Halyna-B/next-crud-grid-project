import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
    name: string;
    address: string;
    users: string[];
}

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    users: [{ type: String }],
}, {
    timestamps: true
});

export default mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);
