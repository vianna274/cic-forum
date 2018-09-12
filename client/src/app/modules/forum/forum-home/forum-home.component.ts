import { ForumService } from './../../../services/forum.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { first, map, catchError, toArray } from 'rxjs/operators';
import { Class } from '../../../models/class.model';
import { Post } from 'src/app/models/post.model';
import { throwError, Subscription } from 'rxjs';
import { Semester } from '../../../models/semester.model';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {
  classes: Class[];
  posts: Post[];
  semesters: Semester[];
  postsSubscription: Subscription;
  classesSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private forumService: ForumService) { }

  ngOnInit() {
    this.postsSubscription = this.forumService.posts
      .subscribe(posts => this.posts = posts);

    this.classesSubscription = this.forumService.classes
      .subscribe(classes => this.classes = classes);

    this.semesters = this.createSemesters();
    this.getCategories();
  }

  getCategories() {
    this.dataService.getCategories()
    .pipe()
    .subscribe(data => {
      this.forumService.setClasses(data);
    });
  }

  getPosts() {
    this.dataService.getPosts(1)
    .pipe(
      map(async (res: Response) => {
        let jsoned = await res.json();
        this.posts = jsoned.map((post: Post) => new Post().deserialize(post));
      }), catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  createSemesters(): Semester[] {
    let semesters = [];
    for(let i = 1; i <= 8; i++) {
      let semester = new Semester();
      semester.id = i;
      semester.name = i + " Semestre";
      semester.semester = i;
      semesters.push(semester);
    }
    return semesters;
  }

}
