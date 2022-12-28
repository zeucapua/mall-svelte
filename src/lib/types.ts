export interface Product {
  id: string, // Product id (prod_<id>)
  active: boolean,
  default_price: string, // Price id (price_<id>)
  description: string,
  images: string[],
  livemode: boolean,
  metadata: Record<string, unknown>,
  name: string,
  unit_label: string,
}

export interface Price {
  id: string, // Price id (price_<id>)
  object: string,
  active: boolean,
  currency: string,
  product: string, // Product id (prod_<id>)
  type: string,
  unit_amount: number,
}
