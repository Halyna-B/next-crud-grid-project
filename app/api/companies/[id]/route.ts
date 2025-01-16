import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Company from "@/models/Company";

connectDB();

interface CompanyRequestBody {
    name: string;
    address: string;
    users: string[];
}

// GET: Fetch company by ID
export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        const company = await Company.findById(id).lean();

        if (!company) {
            return NextResponse.json(
                { message: "Company not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(company, { status: 200 });
    } catch (error: unknown) {
        console.error("Error fetching company by ID:", error);
        return NextResponse.json(
            { message: "Error fetching company", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// PUT: Update company by ID
export async function PUT(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        const body: CompanyRequestBody = await req.json();
        const { name, address, users } = body;

        if (!name || !address || !users || users.length === 0) {
            return NextResponse.json(
                { message: "Name, address, and at least one user are required" },
                { status: 400 }
            );
        }

        const updatedCompany = await Company.findByIdAndUpdate(id, { name, address, users }, { new: true }).lean();

        if (!updatedCompany) {
            return NextResponse.json(
                { message: "Company not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedCompany, { status: 200 });
    } catch (error: unknown) {
        console.error("Error updating company by ID:", error);
        return NextResponse.json(
            { message: "Error updating company", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { message: "Company ID is required for deletion" },
                { status: 400 }
            );
        }

        const deletedCompany = await Company.findByIdAndDelete(id);

        if (!deletedCompany) {
            return NextResponse.json(
                { message: "Company not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Company deleted successfully", company: deletedCompany },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error deleting company:", error);
        return NextResponse.json(
            { message: "Error deleting company", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
