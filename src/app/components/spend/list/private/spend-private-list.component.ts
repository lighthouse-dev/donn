import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { MatBottomSheet } from '@angular/material';
import { FormControl } from '@angular/forms';

import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

import { SpendService } from '../../../../service/spend.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Spend } from '../../../../model/spend';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM',
  },
  display: {
    dateInput: 'YYYY/MM',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};

@Component({
  selector: 'app-spend-private-list',
  templateUrl: './spend-private-list.component.html',
  styleUrls: ['./spend-private-list.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SpendPrivateListComponent {
  displayedColumns: string[] = ['createDate', 'category', 'amount', 'action'];
  dataSource: MatTableDataSource<Spend>;
  spendList: Spend[];
  resultsLength = 0;
  searchMonth = new FormControl(moment());

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private spendService: SpendService,
    private bottomSheet: MatBottomSheet
  ) {
    this.getPrivateSpendList();
  }

  getPrivateSpendList(searchMonth = null) {
    const data = (searchMonth === null) ? this.spendService.getPrivateSpendList() : this.spendService.getPrivateSpendList(searchMonth);

    this.dataSource = null;
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

  /**
   * chosenMonthHandler
   * [期間検索]のカレンダーから月を選択した時に、以下の処理を行う
   *  - 年、月まで取得し、画面上の入力欄に反映
   *  - 選択された期間で支出リストを再取得
   *  - カレンダーを閉じる
   *
   * @param normlizedMonth
   * @param datepicker
   */
  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.searchMonth.value;
    ctrlValue.year(normlizedMonth.year());
    ctrlValue.month(normlizedMonth.month());

    this.searchMonth.setValue(ctrlValue);

    this.getPrivateSpendList(this.searchMonth.value);

    datepicker.close();
  }
}
