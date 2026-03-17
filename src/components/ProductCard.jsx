import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200" />

      <div className="mt-5 inline-flex rounded-full bg-white px-3 py-1 text-xs text-stone-600 ring-1 ring-stone-200">
        {product.tag}
      </div>

      <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
      <p className="mt-3 text-sm leading-7 text-stone-600">{product.desc}</p>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-lg font-semibold">{product.price}</div>

        <Link
          to={`/product/${product.id}`}
          className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm hover:bg-stone-100"
        >
          查看详情
        </Link>
      </div>
    </div>
  );
}