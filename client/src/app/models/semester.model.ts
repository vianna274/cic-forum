import { Class } from './class.model';
import { Deserializable } from './deserializable.model';

export class Semester implements Deserializable {
  id: number;
  name: string;
  semester: number;
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
