export class Product {
  constructor (
    public identity: string = '',
    public name: string,
    public publisherId: string
  ) {}
}

export class ProductLike {
  constructor (public name: string, public publisherId: string) {}
}
