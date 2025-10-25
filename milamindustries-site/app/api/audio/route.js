// app/api/audio/route.js
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: '/api/audio',
    accepts: 'POST multipart/form-data',
  });
}

export async function POST(req) {
  try {
    const ct = (req.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('multipart/form-data')) {
      return NextResponse.json(
        { ok: false, error: 'Use multipart/form-data.' },
        { status: 400 }
      );
    }

    const form = await req.formData();
    const file = form.get('file');
    const vendorName = (form.get('vendorName') || 'Unknown Vendor').toString();

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { ok: false, error: 'No file (field must be "file").' },
        { status: 400 }
      );
    }

    // TEMP success (swap to OneDrive helper later)
    const filename = file.name || 'audio.mp3';
    const audioUrl = `https://example.com/fake/${encodeURIComponent(filename)}`;

    return NextResponse.json({
      ok: true,
      audioUrl,
      vendorFolder: `Vendors/${vendorName}/Recordings/test`,
      vendorName,
    });
  } catch (e) {
    console.error('audio route error:', e);
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
  }
}
