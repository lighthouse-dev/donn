import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

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

  get spendArray(): AbstractControl | null { return this.spendForm.get('spendArray'); }

  constructor(private fb: FormBuilder) {
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
    this.categories = this.isPublic ? Const.publicCategory : Const.privateCategory;
  }

  save(value) {
    console.log(value);
    // todo:: 成功したら、メッセージを表示する (MatSnackBarModule)
  }
}
