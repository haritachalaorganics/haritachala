import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export interface ProductVariant {
  weight: string;
  price: number;
}

export interface OrganicProduct {
  name: string;
  tamil?: string | null;
  telugu?: string | null;
  category?: string;
  bestSeller?: boolean;
  variants?: ProductVariant[];
  ingredients?: string[];
  description?: string;
  images?: string[];
  stock: boolean;
}

const LOCAL_FILE = join(process.cwd(), 'data', 'organics_products.json');
const BLOB_PATHNAME = 'organics-products.json';

export async function getProducts(): Promise<OrganicProduct[]> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list({ prefix: BLOB_PATHNAME });
      const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
      if (blob) {
        const res = await fetch(blob.url, { cache: 'no-store' });
        if (res.ok) return (await res.json()) as OrganicProduct[];
      }
    } catch (e) {
      console.error('[products] blob read failed:', e);
    }
  }

  if (process.env.NODE_ENV === 'development') {
    try {
      return JSON.parse(readFileSync(LOCAL_FILE, 'utf-8')) as OrganicProduct[];
    } catch {}
  }

  const staticData = (await import('@/data/organics_products.json')).default;
  return staticData as unknown as OrganicProduct[];
}

export async function saveProducts(
  products: OrganicProduct[],
): Promise<{ success: boolean; message: string }> {
  const json = JSON.stringify(products, null, 2);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import('@vercel/blob');
      await put(BLOB_PATHNAME, json, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      return { success: true, message: 'Saved to blob storage.' };
    } catch (e) {
      console.error('[products] blob write failed:', e);
      return { success: false, message: 'Failed to save to blob storage.' };
    }
  }

  if (process.env.NODE_ENV === 'development') {
    try {
      writeFileSync(LOCAL_FILE, json, 'utf-8');
      return { success: true, message: 'Saved to local file.' };
    } catch (e) {
      return { success: false, message: `Failed to write file: ${e}` };
    }
  }

  return {
    success: false,
    message: 'No storage configured. Add BLOB_READ_WRITE_TOKEN to enable production saves.',
  };
}
