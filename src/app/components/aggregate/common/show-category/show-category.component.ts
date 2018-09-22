import { Component } from '@angular/core';
import { SpendService } from '../../../../service/spend.service';
import { FormControl } from '@angular/forms';

import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

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
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ShowCategoryComponent {
  totalAmount: Number = 0;
  categorySum: any = [];
  searchMonth = new FormControl(moment());

  constructor(private spendService: SpendService) {
    this.getPublicSpendList();
  }

  /**
   * getPublicSpendList
   * 支出リストを取得
   *
   * @param searchMonth
   */
  getPublicSpendList(searchMonth = null) {
    // 支出リストを取得
    const spendList = (searchMonth === null) ? this.spendService.getPublicSpendList() : this.spendService.getPublicSpendList(searchMonth);

    // カテゴリー別合計、総合計を計算
    this.computeSumByCategory(spendList);
  }

  /**
   * computeSumByCategory
   * カテゴリー別合計、総合計を計算
   *
   * @param spendList
   */
  computeSumByCategory(spendList) {
    // 初期化（月を変えた時に、リセットする必要があるため）
    this.categorySum = [];
    this.totalAmount = 0;

    spendList.snapshotChanges().subscribe(item => {
      // 該当の月のデータが存在しない場合
      if (item == '') {
        this.categorySum = null;
        return;
      }

      item.forEach(element => {
        const json = element.payload.toJSON();
        json['$key'] = element.key;

        // カテゴリー別合計を計算
        if (typeof this.categorySum[json['category']] === 'undefined') { // 初期化
          this.categorySum[json['category']] = 0;
        }
        this.categorySum[json['category']] += json['amount'];

        // 支出総合計を計算
        this.totalAmount += json['amount'];
      });
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

    this.getPublicSpendList(this.searchMonth.value);

    datepicker.close();
  }
}
