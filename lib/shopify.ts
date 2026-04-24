export async function shopifyFetch(query: string, variables = {}) {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Shopify error");
  }

  return json.data;
}