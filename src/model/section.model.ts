import { Speaker } from "./speaker.model";
export class Section {
  id: number;
  title: string;
  programmedOn: string;
  Date:string;
  heure:string;
  subject: string;
  moderator: string;
  speackers: Speaker[];
  constructor(
    id: number,
    title: string,
    programmedOn: string,
    subject: string,
    moderator: string,
    speakers: Speaker[]
  ) {
    this.id = id;
    this.title = title;
    this.programmedOn = programmedOn;
    this.subject = subject;
    this.moderator = moderator;
    this.speackers = speakers;
  }
}
