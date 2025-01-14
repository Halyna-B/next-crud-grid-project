import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import User from "@/models/User";

connectDB();

interface UserRequestBody {
    name: string;
    email: string;
    companies: string[];
}

// GET: Fetch user by ID
export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        const user = await User.findById(id).lean();

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: unknown) {
        console.error("Error fetching user by ID:", error);
        return NextResponse.json(
            { message: "Error fetching user", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// PUT: Update user by ID
export async function PUT(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        const body: UserRequestBody = await req.json();
        const { name, email, companies } = body;

        if (!name || !email || !companies || companies.length === 0) {
            return NextResponse.json(
                { message: "Name, email, and at least one company are required" },
                { status: 400 }
            );
        }

        const updatedUser = await User.findByIdAndUpdate(id, { name, email, companies }, { new: true }).lean();

        if (!updatedUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: unknown) {
        console.error("Error updating user by ID:", error);
        return NextResponse.json(
            { message: "Error updating user", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { message: "User ID is required for deletion" },
                { status: 400 }
            );
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User deleted successfully", user: deletedUser },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { message: "Error deleting user", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
