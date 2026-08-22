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

    // Default admin password (you can change it here)
    if (password !== 'admin123') {
      return NextResponse.json({ error: 'Unauthorized: Wrong password' }, { status: 401 });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ message: 'Data updated successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}