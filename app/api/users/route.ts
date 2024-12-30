import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import User from "@/models/User";

connectDB();

export async function GET() {
    try {
        const users = await User.find().lean();

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, companies } = body;

        const newUser = await User.create({ name, email, companies });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }
}

