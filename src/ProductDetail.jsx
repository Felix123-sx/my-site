export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-lg font-semibold tracking-wide">Velure Health</div>
            <div className="text-xs text-stone-500">
              Sexual Wellness · Private Care · Trusted Experience
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
              返回首页
            </button>
            <button className="rounded-xl bg-stone-900 px-4 py-2 text-sm text-white hover:opacity-90">
              立即购买
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* 面包屑 */}
        <div className="text-sm text-stone-500">
          首页 / 润滑护理 / SilkCare 水性润滑剂
        </div>

        {/* 主体 */}
        <section className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* 左侧图片区 */}
          <div>
            <div className="aspect-square rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-100 via-stone-100 to-stone-200 shadow-sm" />

            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="aspect-square rounded-2xl border border-stone-300 bg-stone-200" />
              <div className="aspect-square rounded-2xl border border-stone-200 bg-stone-100" />
              <div className="aspect-square rounded-2xl border border-stone-200 bg-stone-100" />
              <div className="aspect-square rounded-2xl border border-stone-200 bg-stone-100" />
            </div>
          </div>

          {/* 右侧信息区 */}
          <div>
            <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs text-stone-600 ring-1 ring-stone-200">
              高复购引流款
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              SilkCare 水性润滑剂
            </h1>

            <p className="mt-4 max-w-xl text-base leading-8 text-stone-600">
              一款更适合健康向网站表达的入门型产品，强调温和、低刺激、舒适体验和更自然的使用场景，
              适合用于建立第一层用户信任。
            </p>

            <div className="mt-6 text-3xl font-semibold">¥69</div>

            {/* 卖点 */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm">
                ✓ 温和水性配方
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm">
                ✓ 身体友好表达
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm">
                ✓ 隐私包装发货
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm">
                ✓ 适合新用户入门
              </div>
            </div>

            {/* 数量与按钮 */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center rounded-xl border border-stone-300 bg-white">
                <button className="px-4 py-3 text-sm text-stone-600">-</button>
                <div className="px-5 py-3 text-sm">1</div>
                <button className="px-4 py-3 text-sm text-stone-600">+</button>
              </div>

              <button className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm hover:bg-stone-100">
                加入购物车
              </button>

              <button className="rounded-xl bg-stone-900 px-6 py-3 text-sm text-white hover:opacity-90">
                立即购买
              </button>
            </div>

            {/* 额外说明 */}
            <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-stone-900">配送与隐私说明</div>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                所有订单均采用隐私包装发货，外箱不显示敏感商品信息。
                网站表达以健康护理和成熟审美为主，尽可能降低用户购买时的心理负担。
              </p>
            </div>
          </div>
        </section>

        {/* 下方详情模块 */}
        <section className="mt-16 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
            <div className="text-sm text-stone-500">产品介绍</div>
            <h2 className="mt-2 text-2xl font-semibold">为什么这款产品适合作为首页引流款</h2>
            <div className="mt-5 space-y-4 text-sm leading-8 text-stone-600">
              <p>
                对一个健康向成人用品网站来说，第一批产品不应该过于激进，而应该从低门槛、易理解、
                适合自然表达的品类切入。润滑护理类产品通常就是最合适的起点。
              </p>
              <p>
                它一方面更容易被新用户接受，另一方面也具备较强的复购逻辑。
                对网站前期建立信任和积累第一批客户来说，这类产品通常比高单价产品更有效。
              </p>
              <p>
                在页面表达上，也更适合强调材料、安全、隐私和舒适体验，
                从而让整站风格更接近护理品牌，而不是传统成人网站。
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="text-sm text-stone-500">核心参数</div>
              <div className="mt-4 space-y-3 text-sm text-stone-700">
                <div className="flex justify-between border-b border-stone-100 pb-3">
                  <span>品类</span>
                  <span>润滑护理</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-3">
                  <span>适用人群</span>
                  <span>新手 / 情侣</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-3">
                  <span>包装风格</span>
                  <span>简洁隐私</span>
                </div>
                <div className="flex justify-between">
                  <span>发货方式</span>
                  <span>隐私包装</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-stone-900 p-6 text-stone-50 shadow-sm">
              <div className="text-sm text-stone-400">购买建议</div>
              <h3 className="mt-2 text-xl font-semibold">适合作为第一单体验产品</h3>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                如果你的网站前期重点是建立信任、提高下单率和复购率，这类产品非常适合作为首批主推商品。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}