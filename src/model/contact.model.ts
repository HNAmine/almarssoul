export class Contact {
  id?: number;
  mail?: string;
  call?: string;
  location?: string;
  facebook?: string;
  twitter?: string;

  constructor(
    id: number,
    mail: string,
    call: string,
    location: string,
    facebook: string,
    twitter: string
  ) {
    this.id = id;
    this.mail = mail;
    this.call = call;
    this.location = location;
    this.facebook = facebook;
    this.twitter = twitter;
  }
}
