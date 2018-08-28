import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SpendService } from '../../service/spend.service';
import { AuthService } from '../../core/auth.service';
import { Spend } from '../../model/spend';
import * as Const from '../../shared/data.service';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.scss']
})
export class SpendComponent {
  isPublic: Boolean = false;
  spendForm: FormGroup;
  categories = this.isPublic ? Const.publicCategory : Const.privateCategory;
  spend: Spend;

  get spendArray(): AbstractControl | null { return this.spendForm.get('spendArray'); }

  constructor(
    private fb: FormBuilder,
    private spendService: SpendService,
    public authService: AuthService) {
    this.createSpendForm();
  }

  createSpendForm() {
    this.spendForm = this.fb.group({
      spendArray: this.fb.array([
        this.fb.group({
          category: ['', Validators.required ],
        }),
        this.fb.group({
          date: ['', Validators.required ],
          amount: ['', Validators.required ],
          memo: [''],
        }),
      ])
    });
  }

  changeSpendType(val) {
    this.isPublic = val;

    // Formをリセット
    this.createSpendForm();

    // PublicかPrivateかによって、カテゴリーリストを変える
    this.categories = this.isPublic ? Const.publicCategory : Const.privateCategory;
  }

  save(spend) {
    this.spend = {
      uid: this.authService.uid,
      category: spend['spendArray']['0']['category'],
      createDate: new Date( spend['spendArray']['1']['date'] ).toISOString(),
      amount: spend['spendArray']['1']['amount'],
      memo: spend['spendArray']['1']['memo']
    };
    console.log(this.spend);

    this.spendService.addSpend(this.spend, this.isPublic)
      .then(ref => {
        console.log(ref);
        // todo:: 成功したら、メッセージを表示する (MatSnackBarModule)
      });
  }
}
