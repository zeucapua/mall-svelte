export interface Product {
  id: string,
  object: string,
  active: boolean,
  created: unknown,
  default_price: string,
  description: string,
  images: string[],
  livemode: boolean,
  metadata: Record<string, unknown>,
  name: string,
  package_dimensions: Record<string, unknown>,
  shippable: boolean,
  statement_descriptor: string,
  tax_code: string,
  unit_label: string,
  updated: unknown,
  url: string
}
