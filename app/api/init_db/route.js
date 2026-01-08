import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/auth/user';
import AuditLog from '@/models/auth/auditlog';

export async function GET() {
    try {
        await dbConnect();

        // Explicitly create collections
        await User.createCollection();
        await AuditLog.createCollection();

        return NextResponse.json({ message: 'Collections created successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error creating collections:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
