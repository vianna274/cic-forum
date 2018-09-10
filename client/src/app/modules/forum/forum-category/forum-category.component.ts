import { Component, OnInit, Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';


export class CategoryNode {
  id: number;
  name: string;
  link: string;
  semester: number;
  isSemester: boolean;
  categories: CategoryNode[];
}

export class CategoryFlatNode {
  constructor(
    public id: number,
    public name: string,
    public link: string,
    public semester: number,
    public isSemester: boolean,
    public expandable: boolean,
    public level: number,
  ) {}
}

const CLASSES_DATA = JSON.stringify([
  {
    id: 1,
    name: "Alg Prog",
    semester: 1
  },
  {
    id: 2,
    name: "Racket",
    semester: 1
  },
  {
    id: 3,
    name: "Calculo 1",
    semester: 1
  },
  {
    id: 4,
    name: "ARQ 0",
    semester: 1
  },
  {
    id: 5,
    name: "Discreta",
    semester: 1
  }
]);

const SEMESTER_DATA = JSON.stringify(
  {
    id: 1,
    name: "Primeiro",
    number: "1",
    link: "",
    semester: "1",
    isSemester: true,
    classes: CLASSES_DATA
  }
);


@Component({
  selector: 'app-forum-category',
  templateUrl: './forum-category.component.html',
  styleUrls: ['./forum-category.component.css']
})

export class ForumCategoryComponent implements OnInit {
  treeControl: FlatTreeControl<CategoryFlatNode>;
  treeFlattener: MatTreeFlattener<CategoryNode, CategoryFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryNode, CategoryFlatNode>;
  dataChange = new BehaviorSubject<CategoryNode[]>([]);

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<CategoryFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.dataChange.subscribe(data => this.dataSource.data = data);
  }

  get data(): CategoryNode[] { return this.dataChange.value; }

  ngOnInit() {
    let data = SEMESTER_DATA;
    let dataobj = this.buildTree(data);
    this.dataChange.next(dataobj);
  }

  buildTree(obj: string): CategoryNode[] {
    let hashObj = JSON.parse(obj);

    let category = new CategoryNode();
    category.id = hashObj.id;
    category.name = hashObj.name;
    category.link = hashObj.link;
    category.semester = hashObj.semester;
    category.isSemester = hashObj.isSemester;
    category.categories = JSON.parse(hashObj.classes);

    let categories = [];
    categories.push(category);
    return categories;
  }

  transformer = (node: CategoryNode, level: number) => {
    return new CategoryFlatNode(node.id, node.name, node.link,
      node.semester, node.isSemester, !!node.categories, level);
  }

  private _getLevel = (node: CategoryFlatNode) => node.level;

  private _isExpandable = (node: CategoryFlatNode) => node.expandable;

  private _getChildren = (node: CategoryNode): Observable<CategoryNode[]> => observableOf(node.categories);

  hasChild = (_: number, _nodeData: CategoryFlatNode) => _nodeData.expandable;
}
