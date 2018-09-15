import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Spend } from '../model/spend';

// Service
import { AuthService } from '../core/auth.service';

import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class SpendService {
  private spendPublicListRef  = this.db.list<Spend>('public_spend', ref => ref.orderByChild('createDate'));
  private spendPrivateListRef = this.db.list<Spend>('private_spend/' + this.authService.uid, ref => ref.orderByChild('createDate'));

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService
  ) { }

  // Add Spend Data
  addSpend(spend: Spend, isPublic: Boolean) {
    if (isPublic) {
      return this.spendPublicListRef.push(spend);
    }

    return this.spendPrivateListRef.push(spend);
  }

  // TODO: get~SpendList()を１つの関数にまとめる
  // Get Public
  getPublicSpendList() {
    return this.spendPublicListRef;
  }

  // Get Private
  getPrivateSpendList(searchDate = null) {
    searchDate = (!searchDate) ? this.getSearchDate() : this.getSearchDate(searchDate);

    return this.db.list<Spend>('private_spend/' + this.authService.uid,
      ref => ref.orderByChild('createDate')
                .startAt(searchDate.startAt)
                .endAt(searchDate.endAt));
  }

  deleteSpend(deleteKey: any, isPublic: Boolean) {
    if (isPublic) {
      return this.db.list<Spend>('public_spend/' + deleteKey).remove();
    }
    return this.db.list<Spend>('private_spend/' + this.authService.uid + '/' + deleteKey).remove();
  }

  // TODO: 関数名を全体的に修正 - index(), add(), edit() delete()

  /**
   * editSpend
   * 支出データを編集
   *
   * @param editKey
   * @param spend
   * @param isPublic
   */
  editSpend(editKey: any, spend: Spend, isPublic: Boolean) {
    if (isPublic) {
      return this.db.list<Spend>('public_spend/').update(editKey, spend);
    }
    return this.db.list<Spend>('private_spend/' + this.authService.uid).update(editKey, spend);
  }

  /**
   * getSearchDate
   * 取得する検索期間をセットする
   * ただし、期間を指定していない場合は、現在の日付を基準にする
   *
   * @param searchDate
   */
  getSearchDate(searchDate = null) {
    if (!searchDate) {
      return {
        startAt: moment().startOf('month').toISOString(),
        endAt: moment().endOf('month').toISOString()
      };
    }

    return {
      startAt: moment(searchDate).startOf('month').toISOString(),
      endAt: moment(searchDate).endOf('month').toISOString()
    };
  }
}
