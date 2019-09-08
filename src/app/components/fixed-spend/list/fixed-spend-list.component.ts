import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatBottomSheet } from '@angular/material';
import { Spend } from '../../../model/spend';
import { SpendService } from '../../../service/spend.service';
import { AddFixedSpendComponent } from '../add/add-fixed-spend.component';
import { BottomSheetComponent } from '../../common/bottom-sheet/bottom-sheet.component';
import store from '../../../store/spendType';

@Component({
  selector: 'app-fixed-spend-list',
  templateUrl: './fixed-spend-list.component.html',
  styleUrls: ['./fixed-spend-list.component.scss']
})
export class FixedSpendListComponent {
  fixedSpendList: Spend[];
  spendTempList: Spend[];
  totalAmount: Number   = 0;
  storeObj = store;

  constructor(
    private spendService: SpendService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
    this.getFixedSpendList();
    this.storeObj.setShowFooter();
  }

  getFixedSpendList() {
    const data = this.spendService.getFixedSpendList();

    data.snapshotChanges().subscribe(item => {
      // 初期化
      this.spendTempList  = [];
      this.totalAmount    = 0;

      item.forEach(element => {
        const json = element.payload.toJSON();
        json['$key'] = element.key;
        this.spendTempList.push(json as Spend);

        // 合計計算
        this.totalAmount += json['amount'];
      });

      this.fixedSpendList = this.spendTempList;
    });
  }

  openAddDialog() {
    this.dialog.open(AddFixedSpendComponent, { width: '75%' });
  }

  /**
   * openBottomSheet
   * アクションメニューを表示（変更、削除）
   *
   * @param spend
   */
  openBottomSheet(spend): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: { spend, isFixedSpendData: true },
    });
  }
}
