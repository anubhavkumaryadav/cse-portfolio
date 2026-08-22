import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'portfolio.json');

export async function GET() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileData));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { password, data } = body;

    // Password is read securely from environment variables, or defaults to local pass
    const SECRET_KEY = process.env.ADMIN_PASSWORD || 'Spidy#1234';

    if (password !== SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized: Incorrect passcode' }, { status: 401 });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ message: 'Data updated successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Read-only environment: update data via portfolio.json and push to GitHub' }, { status: 500 });
  }
}