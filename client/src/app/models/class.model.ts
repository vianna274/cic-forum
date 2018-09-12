import { Semester } from './semester.model';
import { Deserializable } from './deserializable.model';

export class Class extends Semester implements Deserializable {

  posts: number[];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
