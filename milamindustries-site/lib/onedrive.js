// lib/onedrive.js
export async function uploadToOneDrive(file, vendorName) {
  // temporary placeholder to allow successful build and deployment
  const filename = file?.name || 'audio.mp3';
  return {
    ok: true,
    audioUrl: `https://example.com/fake/${encodeURIComponent(filename)}`,
    vendorFolder: `Vendors/${vendorName}/Recordings/test`,
  };
}
