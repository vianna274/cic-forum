import { Class } from '../../../models/class.model';
import { Component, OnInit,  Input } from '@angular/core';
import { Semester } from 'src/app/models/semester.model';
import { subCategoryAnimation } from 'src/app/animations/sub-category.animation';
@Component({
  selector: 'app-forum-category',
  templateUrl: './forum-category.component.html',
  styleUrls: ['./forum-category.component.css'],
  animations: [subCategoryAnimation]
})

export class ForumCategoryComponent implements OnInit {
  @Input() classes: Class;
  @Input() semester: Semester;
  toState = 'state1';
  expanded = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggle() {
    this.expanded = !this.expanded;
    if (this.toState == 'state1')
      this.toState = 'state2';
    else 
      this.toState = 'state1';
  }

}
