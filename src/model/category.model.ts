import { Product } from "./product.model";

export class Category {
  id: number;
  name: string;
  description?: string;
  avatar?:string;
  products:Product[];
  constructor(
    id: number,
    name: string,
    description?: string,
    avatar?:string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.avatar = avatar;
  }
}
