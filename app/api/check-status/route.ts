import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { regdNo } = await req.json();

  const jwtClient = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  try {
    await jwtClient.authorize();

    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: 'Sheet1!A:B',
    });

    const rows = res.data.values || [];

    const match = rows.find((row) => row[0] === regdNo);

    if (!match) return NextResponse.json({ status: 'not_found' });

    return NextResponse.json({
      status: match[1]?.toLowerCase() === 'yes' ? 'issued' : 'not_issued',
    });
  } catch (err: any) {
    console.error('Google Sheets Error:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
