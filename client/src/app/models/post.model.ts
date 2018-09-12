import { Deserializable } from './deserializable.model';

export class Post implements Deserializable {
  id: number;
  title: string;
  description: string;
  author: number;
  data: Date;
  semester: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
