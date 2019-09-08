import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SpendService } from '../../../service/spend.service';
import { AuthService } from '../../../core/auth.service';
import { Spend } from '../../../model/spend';
import { AlertMessageComponent } from '../../common/alert-message/alert-message.component';
import store from '../../../store/spendType';
import * as Const from '../../../shared/data.service';

@Component({
  selector: 'app-add-fixed-spend',
  templateUrl: './add-fixed-spend.component.html',
  styleUrls: ['./add-fixed-spend.component.scss']
})
export class AddFixedSpendComponent {
  spendData: Spend;
  spendForm: FormGroup;
  categories = Const.publicCategory;
  storeObj   = store;

  constructor(
    public dialogRef: MatDialogRef<AddFixedSpendComponent>,
    private fb: FormBuilder,
    private spendService: SpendService,
    public authService: AuthService,
    private alertMessageComponent: AlertMessageComponent
  ) {
    this.createSpendForm();
  }

  createSpendForm() {
    this.spendForm  = this.fb.group({
      category: [ null, Validators.required ],
      amount: [ null, Validators.required ],
      memo: [ null, Validators.required ],
    });
  }

  save(spend) {
    const fixedSpend: Spend = {
      uid: this.authService.uid,
      category: spend['category'],
      createDate: new Date().toISOString(),
      amount: spend['amount'],
      memo: spend['memo'],
    };

    this.spendService.addFixedSpend(fixedSpend)
      .then(ref => {
        this.createSpendForm();
        this.dialogRef.close();
        this.alertMessageComponent.openSnackBar('固定支出を入力しました 💰');
      });
  }
}
