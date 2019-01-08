import { BasketState } from "./basket.model";

export class Product {
  id?: number;
  label?: string;
  cost?: number;
  description?: string;
  createdAt?:Date;
  expiredAt?:Date;
  canbeExpired?:boolean;
  enable?:boolean;
}

export class Assignment {
  quantity: number;
  totalCost: number;
  product: Product;
}

export class AssignmentGlobal{
  assignments?: Assignment[];
  totalCost?: number;
  createdAt?: Date;
	state?: BasketState;
	ownerRate?: number;
	ownerComment?: string;
	deliveryRate?: number;
  deliveryComment?: string;
  deliveryCost?: number;
}

export enum Action {
  ADD = 'ADD', UPDATE= 'UPDATE', DELETE= 'DELETE', SUBMIT= 'SUBMIT'
}

export class AssignmentPayload {
  idProduct?: number;;
	quantity?: number;
	action?: Action;
  submit?: boolean;
  address?:string;
}