export class ProgramItem {
  id: number;
  title: string;
  pdf?:string;
  constructor(id: number, title: string, pdf?: string) {
    this.id = id;
    this.title = title;
    this.pdf = pdf;
  }
}

export class Program {
  id: number;
  title: string;
  days: ProgramItem[];
  constructor(id: number, title: string,days: ProgramItem[]) {
    this.id = id;
    this.title = title;
    this.days = days;
  }
}
