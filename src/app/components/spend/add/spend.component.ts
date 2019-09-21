import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SpendService } from '../../../service/spend.service';
import { AuthService } from '../../../core/auth.service';
import { Spend } from '../../../model/spend';
import { AutoCompleteMemo } from '../../../model/autoCompleteMemo';
import { AlertMessageComponent } from '../../common/alert-message/alert-message.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import store from '../../../store/spendType';
import * as Const from '../../../shared/data.service';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.scss'],
})
export class SpendComponent {
  spendForm: FormGroup;
  spend: Spend;
  tabs = [
    { icon: 'home', label: 'Public' },
    { icon: 'face', label: 'Private' },
  ];
  storeObj    = store;
  selected    = store.isPublic ? new FormControl(store.publicTapNum) : new FormControl(store.privateTapNum);
  categories  = store.isPublic ? Const.publicCategory : Const.privateCategory;

  // 入力補完
  autoCompleteMemoGroups: AutoCompleteMemo[] = store.isPublic ? Const.publicAutoCompleteMemo : Const.privateAutoCompleteMemo;
  autoCompleteMemoGroupOptions: Observable<AutoCompleteMemo[]>;

  get spendArray(): AbstractControl | null { return this.spendForm.get('spendArray'); }

  constructor(
    private fb: FormBuilder,
    private spendService: SpendService,
    public authService: AuthService,
    private router: Router,
    private alertMessageComponent: AlertMessageComponent
  ) {
    // Form初期化
    this.createSpendForm();
    this.setAutoCompleteMemoOptions();
    this.storeObj.setShowFooter();
  }

  /**
   * メモ入力補完
   */
  private setAutoCompleteMemoOptions() {
    this.autoCompleteMemoGroupOptions = this.spendArray.get([1]).get('memo').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          if (value) {
            return this.autoCompleteMemoGroups
              .map(group => ({letter: group.letter, names: this.spendService.autoCompleteFilter(group.names, value)}))
              .filter(group => group.names.length > 0);
          }
          return this.autoCompleteMemoGroups;
        })
      );
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
      ]),
    });
  }

  tabChanged = (tabChangeEvent: number): void => {
    this.createSpendForm();

    // Select PrivateTap
    if (tabChangeEvent === store.privateTapNum) {
      store.setPrivateSpendType();
      this.categories = Const.privateCategory;
      this.autoCompleteMemoGroups = Const.privateAutoCompleteMemo;
      this.setAutoCompleteMemoOptions();
      return;
    }

    // Select PublicTap
    store.setPublicSpendType();
    this.categories = Const.publicCategory;
    this.autoCompleteMemoGroups = Const.publicAutoCompleteMemo;
    this.setAutoCompleteMemoOptions();
  }

  save(spend, isContinueAdd = false, stepper = null) {
    this.spend = {
      uid: this.authService.uid,
      category: spend['spendArray']['0']['category'],
      createDate: spend['spendArray']['1']['date'].toISOString(),
      amount: spend['spendArray']['1']['amount'],
      memo: spend['spendArray']['1']['memo'],
    };

    this.spendService.addSpend(this.spend)
      .then(ref => {
        if (isContinueAdd) { // 続けて登録
          stepper.reset();
          this.createSpendForm(); // Form初期化
        } else { // 通常登録
          this.router.navigate(['/spend-list']);
        }

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
      this.setFocus();
    }, 1);
  }

  /**
   *「金額」にフォーカスを当てる
   */
  setFocus() {
    const targetElem = document.getElementById('amount-input');

    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem.focus();
      } else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }
}
