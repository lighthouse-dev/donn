import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss']
})
export class AggregateComponent implements OnInit {
  isPublic: Boolean = false;
  publicTapNum: Number  = 0;
  privateTapNum: Number = 1;
  selectedTab = this.privateTapNum;

  constructor(private route: ActivatedRoute) {
    // 初期表示TABを指定
    this.route.queryParams
      .filter(params => params.isPublic)
      .subscribe(params => {
        this.selectedTab = params.isPublic === 'true' ? this.publicTapNum : this.privateTapNum;
      });
  }

  ngOnInit() {
  }

}
