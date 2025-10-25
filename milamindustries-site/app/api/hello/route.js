// app/api/hello/route.js
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

// GET health check (already working)
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/hello', accepts: 'POST multipart/form-data' });
}

// TEMPORARY: POST stub for audio upload (so we can verify end-to-end wiring)
// It just returns a fake https URL; once this works we’ll paste in the OneDrive code.
export async function POST(req) {
  try {
    const ct = (req.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('multipart/form-data')) {
      return NextResponse.json({ ok: false, error: 'Use multipart/form-data.' }, { status: 400 });
    }

    const form = await req.formData();
    const file = form.get('file');
    const vendorName = (form.get('vendorName') || 'Unknown Vendor').toString();

    if (!file || typeof file === 'string') {
      return NextResponse.json({ ok: false, error: 'No file (field must be "file").' }, { status: 400 });
    }

    const filename = file.name || 'audio.mp3';
    const audioUrl = `https://example.com/fake/${encodeURIComponent(filename)}`; // placeholder https link

    return NextResponse.json({
      ok: true,
      audioUrl,
      vendorFolder: `Vendors/${vendorName}/Recordings/test`,
      vendorName,
    });
  } catch (e) {
    console.error('hello POST stub error:', e);
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 });
  }
}
