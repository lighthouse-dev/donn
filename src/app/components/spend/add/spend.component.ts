import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SpendService } from '../../../service/spend.service';
import { AuthService } from '../../../core/auth.service';
import { Spend } from '../../../model/spend';
import { AlertMessageComponent } from '../../common/alert-message/alert-message.component';
import * as Const from '../../../shared/data.service';

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
  tabs = [
    { icon: 'home', label: 'Public' },
    { icon: 'face', label: 'Private' }
  ];
  privateTapNum = 1;
  selected = new FormControl(this.privateTapNum);

  get spendArray(): AbstractControl | null { return this.spendForm.get('spendArray'); }

  constructor(
    private fb: FormBuilder,
    private spendService: SpendService,
    public authService: AuthService,
    private router: Router,
    private alertMessageComponent: AlertMessageComponent
  ) {
    this.createSpendForm();
  }

  createSpendForm() {
    this.spendForm = this.fb.group({
      spendArray: this.fb.array([
        this.fb.group({
          category: ['', Validators.required ],
        }),
        this.fb.group({
          date: [ new Date(), Validators.required ],
          amount: ['', [ Validators.required, Validators.min(1), Validators.max(9999999) ] ],
          memo: [''],
        }),
      ])
    });
  }

  tabChanged = (tabChangeEvent: number): void => {
    this.createSpendForm();

    // Select PrivateTap
    if (tabChangeEvent === this.privateTapNum) {
      this.isPublic = false;
      this.categories = Const.privateCategory;
      return;
    }

    // Select PublicTap
    this.isPublic = true;
    this.categories = Const.publicCategory;
  }

  save(spend) {
    this.spend = {
      uid: this.authService.uid,
      category: spend['spendArray']['0']['category'],
      createDate: spend['spendArray']['1']['date'].toISOString(),
      amount: spend['spendArray']['1']['amount'],
      memo: spend['spendArray']['1']['memo']
    };

    this.spendService.addSpend(this.spend, this.isPublic)
      .then(ref => {
        this.router.navigate(['/spend-list'], { queryParams: { isPublic: this.isPublic } });
        this.alertMessageComponent.openSnackBar('支出を入力しました 💰');
      });
  }

  /**
   * nextStep
   * カテゴリーを選択すると、次のステップに飛ばす
   * @param stepper
   */
  nextStep(stepper) {
    setTimeout(() => {
      stepper.next();
    }, 1);
  }
}
