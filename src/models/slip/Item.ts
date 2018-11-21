import { Product } from '@/models/Product';

export class Item {
  constructor(
    public product: Product,
    public amount: Number,
    public price: Number,
  ) {
  }
}
