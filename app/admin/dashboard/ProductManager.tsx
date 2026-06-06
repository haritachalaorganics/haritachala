'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { OrganicProduct, ProductVariant } from '@/lib/products';

const CATEGORIES = [
  'HERBAL POWDERS',
  'PREPARED PRODUCTS',
  'FRUITS',
  'VEGETABLES',
  'WILD FORAGED GREENS',
  'HERBS FRESH',
  'OTHER',
];

const EMPTY_PRODUCT: OrganicProduct = {
  name: '',
  tamil: '',
  telugu: '',
  category: 'HERBAL POWDERS',
  bestSeller: false,
  variants: [{ weight: '', price: 0 }],
  ingredients: [],
  description: '',
  stock: true,
};

interface Props {
  initialProducts: OrganicProduct[];
}

export default function ProductManager({ initialProducts }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<OrganicProduct[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStock, setFilterStock] = useState('ALL');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; index: number | null } | null>(null);
  const [form, setForm] = useState<OrganicProduct>(EMPTY_PRODUCT);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [ingredientInput, setIngredientInput] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  // ── Filtered view ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = search.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(q);
      const catMatch = filterCategory === 'ALL' || p.category === filterCategory;
      const stockMatch =
        filterStock === 'ALL' ||
        (filterStock === 'IN' && p.stock) ||
        (filterStock === 'OUT' && !p.stock);
      return nameMatch && catMatch && stockMatch;
    });
  }, [products, search, filterCategory, filterStock]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: products.length,
    inStock: products.filter((p) => p.stock).length,
    outOfStock: products.filter((p) => !p.stock).length,
  }), [products]);

  // ── Save to API ───────────────────────────────────────────────────────────
  const persist = useCallback(async (updated: OrganicProduct[]) => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      setSaveMsg({ ok: res.ok, text: data.message ?? (res.ok ? 'Saved!' : 'Save failed') });
    } catch {
      setSaveMsg({ ok: false, text: 'Network error' });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 4000);
    }
  }, []);

  // ── Toggle stock ──────────────────────────────────────────────────────────
  async function toggleStock(index: number) {
    const updated = products.map((p, i) =>
      i === index ? { ...p, stock: !p.stock } : p
    );
    setProducts(updated);
    await persist(updated);
  }

  // ── Delete product ────────────────────────────────────────────────────────
  async function deleteProduct(index: number) {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    setDeleteConfirm(null);
    await persist(updated);
  }

  // ── Open modal ────────────────────────────────────────────────────────────
  function openAdd() {
    setForm(EMPTY_PRODUCT);
    setIngredientInput('');
    setModal({ mode: 'add', index: null });
  }

  function openEdit(index: number) {
    const p = products[index];
    setForm({ ...p, ingredients: Array.isArray(p.ingredients) ? [...p.ingredients] : [] });
    setIngredientInput('');
    setModal({ mode: 'edit', index });
  }

  // ── Submit modal form ─────────────────────────────────────────────────────
  async function submitForm() {
    const trimmed: OrganicProduct = {
      ...form,
      name: form.name.trim(),
      tamil: form.tamil?.trim() || null,
      telugu: form.telugu?.trim() || null,
      description: form.description?.trim() || undefined,
      variants: (form.variants ?? []).filter((v) => v.weight.trim()),
      ingredients: (form.ingredients ?? []).filter(Boolean),
    };

    if (!trimmed.name) return;

    let updated: OrganicProduct[];
    if (modal?.mode === 'add') {
      updated = [...products, trimmed];
    } else {
      updated = products.map((p, i) => (i === modal?.index ? trimmed : p));
    }

    setProducts(updated);
    setModal(null);
    await persist(updated);
  }

  // ── Variant helpers ───────────────────────────────────────────────────────
  function updateVariant(i: number, field: keyof ProductVariant, value: string | number) {
    const variants = [...(form.variants ?? [])];
    variants[i] = { ...variants[i], [field]: field === 'price' ? Number(value) : value };
    setForm((f) => ({ ...f, variants }));
  }

  function addVariant() {
    setForm((f) => ({ ...f, variants: [...(f.variants ?? []), { weight: '', price: 0 }] }));
  }

  function removeVariant(i: number) {
    setForm((f) => ({ ...f, variants: (f.variants ?? []).filter((_, idx) => idx !== i) }));
  }

  // ── Ingredient helpers ────────────────────────────────────────────────────
  function addIngredient() {
    const val = ingredientInput.trim();
    if (!val) return;
    setForm((f) => ({ ...f, ingredients: [...(f.ingredients ?? []), val] }));
    setIngredientInput('');
  }

  function removeIngredient(i: number) {
    setForm((f) => ({ ...f, ingredients: (f.ingredients ?? []).filter((_, idx) => idx !== i) }));
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  async function logout() {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">H</span>
          </div>
          <div>
            <h1 className="font-semibold text-stone-800 text-sm leading-tight">Haritachala Admin</h1>
            <p className="text-xs text-stone-400 leading-tight">India Products</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${saveMsg.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {saveMsg.text}
            </span>
          )}
          {saving && <span className="text-xs text-stone-400">Saving…</span>}
          <a
            href="/admin/audit"
            className="text-xs text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            Audit Log
          </a>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
          >
            {loggingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Products', value: stats.total, color: 'bg-stone-100 text-stone-700' },
            { label: 'In Stock', value: stats.inStock, color: 'bg-green-100 text-green-700' },
            { label: 'Out of Stock', value: stats.outOfStock, color: 'bg-red-100 text-red-700' },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-xl px-4 py-3 text-center`}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-40 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="ALL">All Stock</option>
            <option value="IN">In Stock</option>
            <option value="OUT">Out of Stock</option>
          </select>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <span className="text-lg leading-none">+</span> Add Product
          </button>
        </div>

        {/* Product table */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-stone-400 text-sm">No products match your filters.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 hidden md:table-cell">Variants</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((product, visibleIdx) => {
                  // Find the real index in products array for mutations
                  const realIdx = products.indexOf(product);
                  return (
                    <tr key={realIdx} className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-stone-800">{product.name}</p>
                          {(product.tamil || product.telugu) && (
                            <p className="text-xs text-stone-400 mt-0.5">
                              {[product.tamil, product.telugu].filter(Boolean).join(' · ')}
                            </p>
                          )}
                          {product.bestSeller && (
                            <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Best Seller</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                          {product.category ?? '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-stone-500 text-xs">
                        {(product.variants ?? []).map((v) => `${v.weight} ₹${v.price}`).join(', ') || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleStock(realIdx)}
                          title={product.stock ? 'Click to mark Out of Stock' : 'Click to mark In Stock'}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1 ${
                            product.stock ? 'bg-green-500' : 'bg-stone-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                              product.stock ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <p className={`text-xs mt-0.5 ${product.stock ? 'text-green-600' : 'text-stone-400'}`}>
                          {product.stock ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(realIdx)}
                            className="text-xs px-3 py-1.5 border border-stone-300 hover:border-stone-400 rounded-lg text-stone-600 hover:text-stone-800 transition-colors"
                          >
                            Edit
                          </button>
                          {deleteConfirm === realIdx ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => deleteProduct(realIdx)}
                                className="text-xs px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-xs px-3 py-1.5 border border-stone-300 rounded-lg text-stone-600 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(realIdx)}
                              className="text-xs px-3 py-1.5 border border-red-200 hover:border-red-400 rounded-lg text-red-500 hover:text-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <p className="text-xs text-stone-400 text-right">
          Showing {filtered.length} of {products.length} products
        </p>
      </main>

      {/* ── Add / Edit Modal ─────────────────────────────────────────────── */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-8 px-4 pb-8 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
              <h2 className="font-semibold text-stone-800">
                {modal.mode === 'add' ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="text-stone-400 hover:text-stone-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Name */}
              <Field label="Product Name *">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={INPUT}
                  placeholder="e.g. Amla Powder"
                />
              </Field>

              {/* Tamil / Telugu */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Tamil Name">
                  <input
                    type="text"
                    value={form.tamil ?? ''}
                    onChange={(e) => setForm((f) => ({ ...f, tamil: e.target.value }))}
                    className={INPUT}
                    placeholder="நெல்லிக்காய்"
                  />
                </Field>
                <Field label="Telugu Name">
                  <input
                    type="text"
                    value={form.telugu ?? ''}
                    onChange={(e) => setForm((f) => ({ ...f, telugu: e.target.value }))}
                    className={INPUT}
                    placeholder="ఉసిరికాయ"
                  />
                </Field>
              </div>

              {/* Category */}
              <Field label="Category">
                <select
                  value={form.category ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className={INPUT}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.stock}
                    onChange={(e) => setForm((f) => ({ ...f, stock: e.target.checked }))}
                    className="w-4 h-4 accent-green-700"
                  />
                  <span className="text-sm text-stone-700">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.bestSeller ?? false}
                    onChange={(e) => setForm((f) => ({ ...f, bestSeller: e.target.checked }))}
                    className="w-4 h-4 accent-amber-600"
                  />
                  <span className="text-sm text-stone-700">Best Seller</span>
                </label>
              </div>

              {/* Variants */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Variants (weight & price)</label>
                <div className="space-y-2">
                  {(form.variants ?? []).map((v, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={v.weight}
                        onChange={(e) => updateVariant(i, 'weight', e.target.value)}
                        placeholder="e.g. 100g"
                        className={`${INPUT} flex-1`}
                      />
                      <span className="text-stone-400 text-sm">₹</span>
                      <input
                        type="number"
                        value={v.price}
                        min={0}
                        onChange={(e) => updateVariant(i, 'price', e.target.value)}
                        className={`${INPUT} w-24`}
                      />
                      <button
                        onClick={() => removeVariant(i)}
                        className="text-stone-400 hover:text-red-500 text-xl leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addVariant}
                  className="mt-2 text-xs text-green-700 hover:text-green-900 font-medium"
                >
                  + Add variant
                </button>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Ingredients</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(form.ingredients ?? []).map((ing, i) => (
                    <span key={i} className="flex items-center gap-1 bg-green-50 text-green-800 text-xs px-2 py-1 rounded-full">
                      {ing}
                      <button onClick={() => removeIngredient(i)} className="text-green-500 hover:text-red-500 leading-none">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                    placeholder="Type ingredient, press Enter"
                    className={`${INPUT} flex-1`}
                  />
                  <button
                    onClick={addIngredient}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Description */}
              <Field label="Description">
                <textarea
                  value={form.description ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className={`${INPUT} resize-none`}
                  placeholder="Describe the product…"
                />
              </Field>
            </div>

            <div className="px-5 py-4 border-t border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 border border-stone-300 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitForm}
                disabled={!form.name.trim()}
                className="px-5 py-2 bg-green-700 hover:bg-green-800 disabled:bg-stone-300 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {modal.mode === 'add' ? 'Add Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Small helpers ──────────────────────────────────────────────────────────
const INPUT = 'w-full border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
