import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Spend } from '../model/spend';
import store from '../store/spendType';
import * as Const from '../shared/data.service';

// Service
import { AuthService } from '../core/auth.service';

import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root',
})
export class SpendService {
  private spendPublicListRef  = this.db.list<Spend>(Const.dbList.public, ref => ref.orderByChild('createDate'));
  private spendPrivateListRef = this.db.list<Spend>(Const.dbList.private + this.authService.uid, ref => ref.orderByChild('createDate'));
  private fixedSpendListRef   = this.db.list<Spend>(Const.dbList.fixed, ref => ref.orderByChild('amount'));

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService
  ) { }

  /**
   * addSpend
   * 支出データを登録
   *
   * @param {Spend} spend
   * @returns
   * @memberof SpendService
   */
  addSpend(spend: Spend) {
    // Public
    if (store.isPublic) {
      return this.spendPublicListRef.push(spend);
    }

    // Private
    return this.spendPrivateListRef.push(spend);
  }

  addFixedSpend(fixedSpend: Spend) {
    return this.fixedSpendListRef.push(fixedSpend);
  }

  // TODO: get~SpendList()を１つの関数にまとめる
  // Get Public
  getPublicSpendList(searchDate = null) {
    searchDate = (!searchDate) ? this.getSearchDate() : this.getSearchDate(searchDate);

    return this.db.list<Spend>(Const.dbList.public,
      ref => ref.orderByChild('createDate')
                .startAt(searchDate.startAt)
                .endAt(searchDate.endAt));
  }

  // Get Private
  getPrivateSpendList(searchDate = null) {
    searchDate = (!searchDate) ? this.getSearchDate() : this.getSearchDate(searchDate);

    return this.db.list<Spend>(Const.dbList.private + this.authService.uid,
      ref => ref.orderByChild('createDate')
                .startAt(searchDate.startAt)
                .endAt(searchDate.endAt));
  }

  getFixedSpendList(searchDate = null) {
    return this.db.list<Spend>(Const.dbList.fixed, ref => ref.orderByChild('createDate'));
  }

  /**
   * getSpendList
   * 支出リストを取得
   *
   * @param searchDate 検索月
   */
  getSpendList(searchDate = null) {
    searchDate = (!searchDate) ? this.getSearchDate() : this.getSearchDate(searchDate);

    // Public
    if (store.isPublic) {
      return this.db.list<Spend>(Const.dbList.public,
        ref => ref.orderByChild('createDate')
                  .startAt(searchDate.startAt)
                  .endAt(searchDate.endAt));
    }

    // Private
    return this.db.list<Spend>(Const.dbList.private + this.authService.uid,
      ref => ref.orderByChild('createDate')
                .startAt(searchDate.startAt)
                .endAt(searchDate.endAt));
  }

  /**
   * deleteSpend
   * 支出データを削除
   *
   * @param {*} deleteKey
   * @returns
   * @memberof SpendService
   */
  deleteSpend(deleteKey: any) {
    if (store.isPublic) {
      return this.db.list<Spend>(Const.dbList.public + deleteKey).remove();
    }

    return this.db.list<Spend>(
      Const.dbList.private +
      this.authService.uid +
      Const.common.pathDevider +
      deleteKey
    ).remove();
  }

  /**
   * 固定支出削除
   * @param deleteKey
   */
  deleteFixedSpend(deleteKey: String) {
    return this.db.list<Spend>(Const.dbList.fixed + deleteKey).remove();
  }

  // TODO: 関数名を全体的に修正 - index(), add(), edit() delete()

  /**
   * editSpend
   * 支出データを編集
   *
   * @param editKey
   * @param spend
   */
  editSpend(editKey: any, spend: Spend) {
    if (store.isPublic) {
      return this.db.list<Spend>(Const.dbList.public).update(editKey, spend);
    }
    return this.db.list<Spend>(Const.dbList.private + this.authService.uid).update(editKey, spend);
  }

  /**
   * 固定支出編集
   *
   * @param editKey
   * @param spend
   */
  editFixedSpend(editKey: any, spend: Spend) {
    return this.db.list<Spend>(Const.dbList.fixed).update(editKey, spend);
  }

  /**
   * getSearchDate
   * 取得する検索期間をセットする
   * ただし、期間を指定していない場合は、現在の日付を基準にする
   *
   * @param searchDate
   */
  getSearchDate(searchDate = null) {
    if (searchDate) {
      return {
        startAt: moment(searchDate).startOf('month').date(25).subtract(1, 'month').toISOString(),
        endAt: moment(searchDate).endOf('month').date(24).toISOString(),
      };
    }

    if (moment().date() >= 25) {
      return {
        startAt: moment().startOf('month').date(25).toISOString(),
        endAt: moment().endOf('month').date(24).add(1, 'month').toISOString(),
      };
    }
    return {
      startAt: moment().startOf('month').date(25).subtract(1, 'month').toISOString(),
      endAt: moment().endOf('month').date(24).toISOString(),
    };
  }

  autoCompleteFilter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();
    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * 初期表示時に、選択する月を判定
   *  例：本日の日付が 9/25だとすると、10月に選択された状態で表示する
   */
  getInitSelectedMonth = () => {
    return moment().date() >= 25 ? moment().add(1, 'month') : moment();
  }
}
