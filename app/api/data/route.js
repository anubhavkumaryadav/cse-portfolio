import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'portfolio.json');

// 1. GET Request: Read local data directly
export async function GET() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileData));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

// 2. POST Request: Updates portfolio.json directly on your GitHub repository
export async function POST(req) {
  try {
    const body = await req.json();
    const { password, data } = body;

    const SECRET_KEY = process.env.ADMIN_PASSWORD || 'Spidy#1234';
    if (password !== SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized: Incorrect passcode' }, { status: 401 });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || 'anubhavkumaryadav/cse-portfolio';
    const FILE_PATH = 'data/portfolio.json';

    if (!GITHUB_TOKEN) {
      // Local fallback for testing on localhost
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return NextResponse.json({ message: 'Saved locally!' });
    }

    // Fetch current file SHA from GitHub API
    const getRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'NextJS-Portfolio-App',
      },
      cache: 'no-store',
    });

    if (!getRes.ok) {
      const err = await getRes.json();
      return NextResponse.json({ error: `GitHub fetch error: ${err.message}` }, { status: 500 });
    }

    const fileMeta = await getRes.json();
    const sha = fileMeta.sha;

    // Convert updated JSON to Base64
    const contentEncoded = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

    // Commit changes directly to your GitHub repo
    const updateRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Portfolio-App',
      },
      body: JSON.stringify({
        message: 'update: portfolio content via admin dashboard',
        content: contentEncoded,
        sha: sha,
      }),
    });

    if (!updateRes.ok) {
      const err = await updateRes.json();
      return NextResponse.json({ error: `GitHub commit error: ${err.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: 'Saved to GitHub! Your site will rebuild on Vercel.' });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to save data' }, { status: 500 });
  }
}