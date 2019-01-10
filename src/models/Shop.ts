import { Stock } from '@/models/Stock'

export class Shop {
  constructor (
    public identity: string = '',
    public name: string,
    public stocks: Array<Stock>
  ) {}
}

export class ShopLike {
  constructor (public name: string) {}
}
