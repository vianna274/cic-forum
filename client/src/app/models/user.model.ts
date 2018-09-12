import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  posts: number[];
  favoritePosts: number[];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
