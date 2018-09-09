import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { MatBottomSheet } from '@angular/material';

import { SpendService } from '../../../../service/spend.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Spend } from '../../../../model/spend';

@Component({
  selector: 'app-spend-private-list',
  templateUrl: './spend-private-list.component.html',
  styleUrls: ['./spend-private-list.component.scss']
})
export class SpendPrivateListComponent {
  displayedColumns: string[] = ['createDate', 'category', 'amount'];
  dataSource: MatTableDataSource<Spend>;
  spendList: Spend[];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private spendService: SpendService,
    private bottomSheet: MatBottomSheet
  ) {
    const data = this.spendService.getPrivateSpendList();

    data.snapshotChanges().subscribe(item => {
      this.spendList = [];
      this.resultsLength = item.length;

      item.forEach(element => {
        const json = element.payload.toJSON();
        json['$key'] = element.key;
        this.spendList.push(json as Spend);
        this.dataSource = new MatTableDataSource(this.spendList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  openBottomSheet(spend): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {spend: spend, isPublic: false}
    });
  }
}
