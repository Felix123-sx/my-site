import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="tone-card group rounded-[1.6rem] p-4 transition duration-300 hover:-translate-y-[2px] sm:p-5">
      <div className="relative overflow-hidden rounded-[1.25rem]">
        <div className="aspect-[4/5] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_30%),linear-gradient(145deg,#d6b58b_0%,#f4e8d7_32%,#ccb39c_60%,#7d6559_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(27,18,15,0.2)] via-transparent to-[rgba(255,255,255,0.16)]" />
      </div>

      <div className="mt-5">
        <div className="eyebrow">{product.tag}</div>

        <h3 className="font-editorial mt-4 text-[1.6rem] font-semibold leading-none text-[#241914] sm:text-[1.9rem]">
          {product.name}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#65564d]">
          {product.desc}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a897e]">
            价格
          </div>
          <div className="mt-1 text-lg font-semibold text-[#241914]">
            {product.price}
          </div>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center justify-center rounded-full bg-[rgba(184,144,90,0.12)] px-4 py-2 text-sm text-[#241914] transition hover:bg-[rgba(184,144,90,0.18)]"
        >
          查看详情
        </Link>
      </div>
    </article>
  );
}
