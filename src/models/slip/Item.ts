import { Product } from '../Product';

export class Item {
  constructor(
    public product: Product,
    public amount: Number,
    public price: Number,
  ) {
  }
}
