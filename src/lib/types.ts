export interface Product {
  id: string,
  object: string,
  active: boolean,
  created: timestamp,
  default_price: string,
  description: string,
  images: string[],
  livemode: boolean,
  metadata: hash,
  name: string,
  package_dimensions: hash,
  shippable: boolean,
  statement_descriptor: string,
  tax_code: string,
  unit_label: string,
  updated: timestamp,
  url: string
}
