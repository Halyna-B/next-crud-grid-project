import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import User from "@/models/User";

connectDB();

interface UserRequestBody {
    name: string;
    email: string;
    companies: string[];
}

export async function GET() {
    try {
        const users = await User.find().lean();

        return NextResponse.json(users, { status: 200 });
    } catch (error: unknown) {
        console.error("Error fetching users:", error);
       return NextResponse.json(
            { message: "Error fetching users", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body: UserRequestBody = await req.json();
        const { name, email, companies } = body;

        if (!name || !email || !companies || companies.length === 0) {
            return NextResponse.json(
                { message: "Name, email, and at least one company are required" },
                { status: 400 }
            );
        }

        const newUser = await User.create({ name, email, companies });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: unknown) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { message: "Error creating user", error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}


