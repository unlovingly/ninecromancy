import { Stock } from '@/models/Stock';
export class Shop {
  constructor(
    public id: string = "",
    public name: string,
    public stocks: Array<Stock>
  ) {
  }
}