export interface Value<T> {
  value: T;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}

export interface Pageable {
  page: number;
  size: number;
  search: string;
  sort?: string;
}
