import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="tone-card rounded-[1.35rem] p-4 transition duration-200 hover:-translate-y-[1px] hover:bg-[#f8f8f4] sm:p-5">
      <div className="aspect-[4/3] rounded-[1.1rem] bg-gradient-to-br from-[#f5f4ef] via-[#f0f1eb] to-[#dce7dd]" />

      <div className="mt-5">
        <div className="eyebrow">{product.tag}</div>

        <h3 className="font-editorial mt-4 text-xl font-semibold text-[#2f342e] sm:text-2xl">
          {product.name}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#5b645b]">
          {product.desc}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.12em] text-[#7a8378]">
            Price
          </div>
          <div className="mt-1 text-base font-semibold text-[#2f342e]">
            {product.price}
          </div>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center justify-center rounded-full bg-[#f4f4ef] px-4 py-2 text-sm text-[#2f342e] transition hover:bg-[#ecebe5]"
        >
          查看详情
        </Link>
      </div>
    </article>
  );
}
