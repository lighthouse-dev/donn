import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Spend } from '../../../../model/spend';
import { SpendService } from '../../../../service/spend.service';
import { DeleteSpendDialogComponent } from './dialog/delete-spend-dialog.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  spendData: Spend = null;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    public dialog: MatDialog,
    private spendService: SpendService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.spendData = data;
  }

  deleteAlertDialog() {
    // 削除確認のDialogを表示
    const dialogRef = this.dialog.open(DeleteSpendDialogComponent, {
      data: this.spendData
    });

    // bottomSheetを閉じる
    this.bottomSheetRef.dismiss();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSpend();
      }
    });
  }

  // 削除処理
  deleteSpend() {
    this.spendService.deleteSpend(
      this.spendData['spend']['$key'],
      this.spendData['isPublic']
    ).then(ref => {
      // todo:: 成功したら、メッセージを表示する (MatSnackBarModule)
    });
  }

}
