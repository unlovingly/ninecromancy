export class Stock {
  constructor (
    public pluCode: string = '',
    public shopId: string,
    public productId: string,
    public amount: number,
    public price: number
  ) {}
}

export class StockLike {
  constructor (
    public shopId: string,
    public productId: string,
    public amount: number,
    public price: number
  ) {}
}
