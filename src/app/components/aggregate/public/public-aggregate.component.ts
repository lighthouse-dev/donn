import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-aggregate',
  templateUrl: './public-aggregate.component.html',
  styleUrls: ['./public-aggregate.component.scss']
})
export class PublicAggregateComponent implements OnInit {
  isPublic: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
