export class Topic {
  id: number;
  value: string;
  questions?: Question[];
}

export class Question {
  id: number;
  content: string;
  detail: string;

  constructor(id: number, content: string, detail: string) {
    this.id = id;
    this.content = content;
    this.detail = detail;
  }
}
