export class Speaker {
  id: number;
  completeName: string;
  profession?: string;
  description?: string;
  avatarUri?: string;
  constructor(
    id: number,
    completeName: string,
    profession?: string,
    description?: string,
    avatarUri?: string
  ) {
    this.id = id;
    this.completeName = completeName;
    this.profession = profession;
    this.description = description;
    this.avatarUri = avatarUri;
  }
}
