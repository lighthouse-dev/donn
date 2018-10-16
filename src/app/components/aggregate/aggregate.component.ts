import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import store from '../../store/spendType';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss']
})
export class AggregateComponent {
  selectedTab = store.privateTapNum;

  constructor(private route: ActivatedRoute) {
    // 初期表示TABを指定
    this.selectedTab = store.isPublic ? store.publicTapNum : store.privateTapNum;
  }

}
