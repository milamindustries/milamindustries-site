// lib/onedrive.js

// Requires these Vercel env vars (you already have them):
// MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_DRIVE_ID, MS_FOLDER_PATH
//
// Uploads to: drives/{MS_DRIVE_ID}/root:/{MS_FOLDER_PATH}/{vendorName}/{filename}

const GRAPH = 'https://graph.microsoft.com/v1.0';

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function getToken() {
  const tenant = required('MS_TENANT_ID');
  const clientId = required('MS_CLIENT_ID');
  const clientSecret = required('MS_CLIENT_SECRET');

  const res = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
      scope: 'https://graph.microsoft.com/.default',
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Token error: ${res.status} ${JSON.stringify(json)}`);
  return json.access_token;
}

async function ensureFolderPath(driveId, token, parts) {
  // Create folders step-by-step under /root
  let currentPath = '';
  for (const part of parts) {
    const safe = String(part).replace(/[\\/:*?"<>|]/g, '_').trim() || 'Unnamed';
    currentPath = currentPath ? `${currentPath}/${safe}` : safe;

    // Check if exists
    const check = await fetch(`${GRAPH}/drives/${driveId}/root:/${encodeURI(currentPath)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (check.status === 404) {
      // Create
      const parent = currentPath.split('/').slice(0, -1).join('/');
      const name = safe;
      const url = parent
        ? `${GRAPH}/drives/${driveId}/root:/${encodeURI(parent)}:/children`
        : `${GRAPH}/drives/${driveId}/root/children`;

      const createRes = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, folder: {}, '@microsoft.graph.conflictBehavior': 'replace' }),
      });

      if (!createRes.ok) {
        const txt = await createRes.text();
        throw new Error(`Create folder failed: ${createRes.status} ${txt}`);
      }
    } else if (!check.ok) {
      const txt = await check.text();
      throw new Error(`Check folder failed: ${check.status} ${txt}`);
    }
  }
  return currentPath; // e.g. VendorAudio/LeadBanc
}

export async function uploadToOneDrive(file, vendorName) {
  const driveId = required('MS_DRIVE_ID');
  const baseFolder = required('MS_FOLDER_PATH'); // e.g. "VendorAudio"

  const token = await getToken();

  const filename = (file?.name || 'audio.mp3').replace(/[\\/:*?"<>|]/g, '_').trim();
  const safeVendor = String(vendorName || 'Unknown Vendor').replace(/[\\/:*?"<>|]/g, '_').trim();

  // Ensure folders exist
  const folderPath = await ensureFolderPath(driveId, token, [baseFolder, safeVendor]);

  // Upload content (small files direct upload)
  const bytes = Buffer.from(await file.arrayBuffer());
  const putUrl = `${GRAPH}/drives/${driveId}/root:/${encodeURI(folderPath)}/${encodeURIComponent(filename)}:/content`;

  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: bytes,
  });
  const item = await putRes.json();
  if (!putRes.ok) {
    throw new Error(`Upload failed: ${putRes.status} ${JSON.stringify(item)}`);
  }

  // item.webUrl is a clickable OneDrive link to the file
  return {
    ok: true,
    audioUrl: item.webUrl,
    vendorFolder: folderPath, // e.g. "VendorAudio/LeadBanc"
    driveItemId: item.id,
    name: item.name,
  };
}
