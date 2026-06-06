import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, verifySessionToken } from '@/lib/auth';
import { getProducts, saveProducts, OrganicProduct } from '@/lib/products';

async function assertAuth() {
  const token = await getSessionToken();
  if (!token || !verifySessionToken(token)) return false;
  return true;
}

export async function GET() {
  if (!(await assertAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function PUT(req: NextRequest) {
  if (!(await assertAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let products: OrganicProduct[];
  try {
    products = await req.json();
    if (!Array.isArray(products)) throw new Error('Expected array');
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const result = await saveProducts(products);
  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}
