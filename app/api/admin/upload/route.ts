import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, verifySessionToken } from '@/lib/auth';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';


async function assertAuth() {
  const token = await getSessionToken();
  if (!token || !verifySessionToken(token)) return false;
  return true;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

const MAX_FILE_SIZE = 40 * 1024 * 1024; // 40 MB

export async function POST(req: NextRequest) {
  if (!(await assertAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const productName = formData.get('productName') as string | null;
  const files = formData.getAll('files') as File[];

  if (!productName?.trim()) {
    return NextResponse.json({ error: 'Missing productName' }, { status: 400 });
  }
  if (files.length === 0) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 });
  }

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: `File "${file.name}" is not an image` }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `File "${file.name}" exceeds 40 MB limit` }, { status: 400 });
    }
  }

  const slug = slugify(productName) || 'unnamed';
  const uploadedPaths: string[] = [];

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import('@vercel/blob');
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const blob = await put(`product_images/${slug}/${safeName}`, Buffer.from(arrayBuffer), {
          access: 'public',
          contentType: file.type,
          addRandomSuffix: false,
        });
        uploadedPaths.push(blob.url);
      }
      return NextResponse.json({ paths: uploadedPaths });
    } catch (e) {
      console.error('[upload] blob write failed:', e);
      return NextResponse.json({ error: 'Upload to blob storage failed' }, { status: 500 });
    }
  }

  if (process.env.NODE_ENV === 'development') {
    const dir = join(
      process.cwd(),
      'public',
      'images',
      'pages',
      'india',
      'product_images',
      slug,
    );
    try {
      mkdirSync(dir, { recursive: true });
    } catch (e) {
      return NextResponse.json({ error: `Could not create directory: ${e}` }, { status: 500 });
    }

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      writeFileSync(join(dir, safeName), Buffer.from(arrayBuffer));
      uploadedPaths.push(`/images/pages/india/product_images/${slug}/${safeName}`);
    }
    return NextResponse.json({ paths: uploadedPaths });
  }

  return NextResponse.json(
    { error: 'No storage configured. Set BLOB_READ_WRITE_TOKEN for production uploads.' },
    { status: 500 },
  );
}
