// app/api/hello/route.js
import { NextResponse } from 'next/server';
import { uploadToOneDrive } from '@/lib/onedrive'; // your helper
export const runtime = 'nodejs';

// Health check
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/hello', accepts: 'POST multipart/form-data' });
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

    // Validate MP3
    const MAX_BYTES = 10 * 1024 * 1024;
    const validTypes = ['audio/mpeg', 'audio/mp3'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.mp3')) {
      return NextResponse.json({ ok: false, error: 'Audio must be an .mp3 file.' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: 'Audio file must be 10MB or smaller.' }, { status: 400 });
    }

    // If your helper expects a Buffer, uncomment these two lines and pass buffer, otherwise pass file directly.
    // const arrayBuffer = await file.arrayBuffer();
    // const uploadResult = await uploadToOneDrive({ name: file.name, type: file.type, buffer: Buffer.from(arrayBuffer) }, vendorName);

    const uploadResult = await uploadToOneDrive(file, vendorName);

    if (!uploadResult?.ok) {
      throw new Error(uploadResult?.error || 'OneDrive upload failed.');
    }

    return NextResponse.json({
      ok: true,
      audioUrl: uploadResult.audioUrl,
      vendorFolder: uploadResult.vendorFolder,
      vendorName,
    });
  } catch (err) {
    console.error('hello uploader error:', err);
    return NextResponse.json({ ok: false, error: err.message || 'Upload failed.' }, { status: 500 });
  }
}
