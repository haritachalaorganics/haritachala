import { requireAuth } from '@/lib/auth';
import { getProducts } from '@/lib/products';
import ProductManager from './ProductManager';

export default async function DashboardPage() {
  await requireAuth();
  const products = await getProducts();

  return <ProductManager initialProducts={products} />;
}
