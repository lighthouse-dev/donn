import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SpendService } from '../../../service/spend.service';
import { AuthService } from '../../../core/auth.service';
import { Spend } from '../../../model/spend';
import { AlertMessageComponent } from '../../common/alert-message/alert-message.component';
import store from '../../../store/spendType';
import * as Const from '../../../shared/data.service';

@Component({
  selector: 'app-edit-fixed-spend',
  templateUrl: './edit-fixed-spend.component.html',
  styleUrls: ['./edit-fixed-spend.component.scss']
})
export class EditFixedSpendComponent {
  spendData: Spend;
  spendForm: FormGroup;
  categories = Const.publicCategory;
  storeObj   = store;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Spend,
    public dialogRef: MatDialogRef<EditFixedSpendComponent>,
    private fb: FormBuilder,
    private spendService: SpendService,
    public authService: AuthService,
    private alertMessageComponent: AlertMessageComponent
  ) {
    this.spendData  = data;

    this.spendForm  = this.fb.group({
      category: [ this.spendData['category'], Validators.required ],
      amount: [ this.spendData['amount'], Validators.required ],
      memo: [ this.spendData['memo'] ],
    });
  }

  edit(spend) {
    const editSpend: Spend = {
      uid: this.authService.uid,
      category: spend['category'],
      createDate: new Date().toISOString(),
      amount: spend['amount'],
      memo: spend['memo'],
    };

    this.spendService.editFixedSpend(this.spendData['$key'], editSpend)
      .then(ref => {
        this.dialogRef.close();
        this.alertMessageComponent.openSnackBar('固定支出を編集しました ✏️');
      }).catch(err => {
        this.alertMessageComponent.openSnackBar('固定支出を編集できませんでした 😱');
        console.error(err);
      });
  }
}
