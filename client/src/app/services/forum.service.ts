import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Class } from '../models/class.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  classes = new BehaviorSubject<Class[]>(null);
  posts = new BehaviorSubject<Post[]>(null);

  constructor() { }
  /* Ugly hack to accept array of category */
  setClasses(classes: any) {
    this.classes.next(classes);
  }

  /* Ugly hack to accept array of post */
  setPosts(posts: any) {
    this.posts.next(posts);
  }

  getClasses() {
    return this.classes.getValue();
  }

  getPosts() {
    return this.posts.getValue();
  }
}
