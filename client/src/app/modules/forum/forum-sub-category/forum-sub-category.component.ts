import { Component, OnInit, Input } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { subCategoryAnimation } from '../../../animations/sub-category.animation';

@Component({
  selector: 'app-forum-sub-category',
  templateUrl: './forum-sub-category.component.html',
  styleUrls: ['./forum-sub-category.component.css'],
  animations: [subCategoryAnimation]
})
export class ForumSubCategoryComponent implements OnInit {
  @Input() class: Class;
  @Input() currentState: any;

  constructor() { }

  ngOnInit() {
  }

}
