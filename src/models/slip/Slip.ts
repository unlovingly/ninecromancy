import { Product } from '@/models/Product';
import { Item } from '@/models/slip/Item';

export class Slip {
  constructor(
    public id: string = "",
    public description: string,
    public publisherId: string,
    public approvedAt: Date = new Date(),
    public publishedAt: Date,
    public products: Array<Item>,
  ) {
  }
}