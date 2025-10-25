// lib/onedrive.js
export async function uploadToOneDrive(file, vendorName) {
  // TEMP placeholder so the site builds & you can test end-to-end.
  const filename = file?.name || 'audio.mp3';
  return {
    ok: true,
    audioUrl: `https://example.com/fake/${encodeURIComponent(filename)}`,
    vendorFolder: `Vendors/${vendorName}/Recordings/test`,
  };
}
