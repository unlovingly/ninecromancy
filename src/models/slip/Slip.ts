import { Item } from '@/models/slip/Item';

export class Slip {
  constructor(
    public identity: string = "",
    public number: string,
    // public description: string,
    public senderId: string,
    public receiverId: string,
    public approvedAt: Date = new Date(),
    public publishedAt: Date,
    public items: Array<Item>,
  ) {
  }
}