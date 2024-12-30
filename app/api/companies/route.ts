import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Company from "@/models/Company";

connectDB();

export async function GET() {
    try {
        const companies = await Company.find().lean();

        return NextResponse.json(companies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching companies", error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, address, users } = body;

        const newCompany = await Company.create({ name, address, users });
        return NextResponse.json(newCompany, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }
}