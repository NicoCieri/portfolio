export const products = [
  { id: "headphones", name: "Everyday headphones", category: "A little less noise.", price: 8900, variants: ["Lilac", "Ink"] },
  { id: "bag", name: "Daylight tote", category: "Take the day with you.", price: 3400, variants: ["Pink", "Ink"] },
  { id: "lamp", name: "Orbit desk lamp", category: "Make room for bright ideas.", price: 6500, variants: ["Lime", "Lilac"] },
] as const;

export type Product = (typeof products)[number];
export type CartLine = { productId: Product["id"]; variant: string; quantity: number };
export const MAX_QUANTITY = 9;
export const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;
export const getProduct = (id: Product["id"]) => products.find((product) => product.id === id)!;
export const cartTotal = (lines: CartLine[]) => lines.reduce((total, line) => total + getProduct(line.productId).price * line.quantity, 0);
