export class SalesSlipItem {
  constructor (
    public pluCode: string,
    public amount: Number,
    public price: Number
  ) {}
}

export class SalesSlipLike {
  constructor (
    public number: string,
    public description: string,
    public senderId: string,
    public approvedAt: string,
    public publishedAt: string,
    public items: Array<SalesSlipItem>,
    public receiverId?: string
  ) {}
}

export class SalesSlip {
  constructor (
    public identity: string,
    public number: string,
    public description: string,
    public senderId: string,
    public receiverId: string,
    public approvedAt: string,
    public publishedAt: string,
    public items: Array<SalesSlipItem>
  ) {}
}
