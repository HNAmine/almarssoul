export class Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  avatar?:string;
  quantity?:number;
  outStock?:boolean;
  constructor(
    id: number,
    name: string,
    price: number,
    description?: string,
    avatar?:string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.avatar = avatar;
  }
}
