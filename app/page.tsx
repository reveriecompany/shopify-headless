import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";

export default async function HomePage() {
  const data = await shopifyFetch(`
    {
      products(first: 8) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `);

  const products = data.products.edges.map((e: any) => e.node);

  return (
    <main className="bg-white text-neutral-900">

      {/* HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {products[0]?.featuredImage?.url && (
            <img
              src={products[0].featuredImage.url}
              className="h-full w-full object-cover"
              alt=""
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex h-full items-center px-10">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
              Modern feminine essentials
            </h1>
            <p className="mt-4 text-lg text-neutral-200">
              Soft silhouettes, timeless textures, and effortless style.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="/search"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
              >
                Shop Now
              </Link>

              <Link
                href="/search"
                className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold">New arrivals</h2>
          <p className="text-neutral-500 mt-2">
            Fresh pieces just added to the collection
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {products.map((p: any) => (
            <Link
              key={p.id}
              href={`/product/${p.handle}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
                {p.featuredImage?.url && (
                  <img
                    src={p.featuredImage.url}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    alt={p.title}
                  />
                )}
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-medium">{p.title}</h3>
                <p className="text-sm text-neutral-500">
                  ${Number(p.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SPLIT BANNER */}
      <section className="grid md:grid-cols-2">
        <div className="bg-neutral-100 p-12 flex flex-col justify-center">
          <h3 className="text-3xl font-semibold">
            Crafted for everyday elegance
          </h3>
          <p className="mt-4 text-neutral-600">
            Lightweight fabrics, breathable textures, and timeless cuts designed
            to move with you.
          </p>

          <Link
            href="/search"
            className="mt-6 inline-block text-sm font-semibold underline"
          >
            Discover more →
          </Link>
        </div>

        <div className="h-[400px] md:h-auto">
          {products[1]?.featuredImage?.url && (
            <img
              src={products[1].featuredImage.url}
              className="h-full w-full object-cover"
              alt=""
            />
          )}
        </div>
      </section>

      {/* SIMPLE FOOTER CTA */}
      <section className="bg-neutral-900 text-white text-center py-16 px-6">
        <p className="text-sm uppercase tracking-widest text-neutral-400">
          Moongchi
        </p>
        <h3 className="mt-4 text-md font-semibold">
          Where Designers Unite
        </h3>
      </section>
    </main>
  );
}