import { Item } from '@/models/slip/Item'

export class SlipLike {
  constructor (
    public number: string,
    public description: string,
    public senderId: string,
    public approvedAt: string,
    public publishedAt: string,
    public items: Array<Item>,
    public receiverId?: string
  ) {}
}

export class Slip {
  constructor (
    public identity: string,
    public number: string,
    public description: string,
    public senderId: string,
    public receiverId: string,
    public approvedAt: string,
    public publishedAt: string,
    public items: Array<Item>
  ) {}
}
