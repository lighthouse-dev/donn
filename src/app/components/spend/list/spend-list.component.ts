import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-spend-list',
  templateUrl: './spend-list.component.html',
  styleUrls: ['./spend-list.component.scss']
})
export class SpendListComponent implements OnInit {
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
