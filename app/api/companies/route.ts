import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Company from "@/models/Company";

connectDB();

interface CompanyRequestBody {
    name: string;
    address: string;
    users: string[];
}

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
        const body: CompanyRequestBody = await req.json();
        const { name, address, users } = body;

        if (!name || !address || !users || users.length === 0) {
            return NextResponse.json(
                { message: "Name, address, and at least one user are required" },
                { status: 400 }
            );
        }

        const newCompany = await Company.create({ name, address, users });

        return NextResponse.json(newCompany, { status: 201 });
    } catch (error: unknown) {
        console.error("Error creating company:", error);
        return NextResponse.json(
            { message: "Error creating company", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}