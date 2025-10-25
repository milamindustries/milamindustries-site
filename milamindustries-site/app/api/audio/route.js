// app/api/audio/route.js
import { NextResponse } from 'next/server';
import { uploadToOneDrive } from '../../../lib/onedrive'; // adjust if your lib path differs

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/audio', accepts: 'POST multipart/form-data' });
}

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

    // Basic validation
    const allowed = ['audio/mpeg', 'audio/mp3'];
    if (!allowed.includes(file.type) && !file.name?.toLowerCase().endsWith('.mp3')) {
      return NextResponse.json({ ok: false, error: 'Only MP3 files are allowed.' }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: 'Max size 10MB.' }, { status: 400 });
    }

    const result = await uploadToOneDrive(file, vendorName);
    return NextResponse.json({
      ok: true,
      audioUrl: result.audioUrl,
      vendorFolder: result.vendorFolder,
      name: result.name,
    });
  } catch (err) {
    console.error('audio upload error:', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Upload error.' },
      { status: 500 },
    );
  }
}
