import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SpendService } from '../../service/spend.service';
import { Spend } from '../../model/spend';

@Component({
  selector: 'app-spend-list',
  templateUrl: './spend-list.component.html',
  styleUrls: ['./spend-list.component.scss']
})

export class SpendListComponent implements OnInit {
  displayedColumns: string[] = ['category', 'createDate', 'amount'];
  dataSource: Observable<Spend[]>;

  constructor(private spendService: SpendService) {
    this.dataSource = this.spendService.getSpendList(true)
        .snapshotChanges()
        .pipe( map(changes =>
          changes.map( c => ({
            key: c.payload.key, ...c.payload.val()
          })).reverse()
        )
      );
    console.log(this.dataSource);
  }

  ngOnInit() { }
}
