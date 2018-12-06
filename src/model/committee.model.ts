export class Committee {
  id: number;
  completeName: string;
  avatarUri?: string;
  constructor(
    id: number,
    completeName: string,
    avatarUri?: string
  ) {
    this.id = id;
    this.completeName = completeName;
    this.avatarUri = avatarUri;
  }
}
