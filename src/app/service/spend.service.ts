import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Spend } from '../model/spend';

// Service
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpendService {
  private spendListRef;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService
  ) { }

  // コレクション名を指定
  setDatabaseList(isPublic) {
    if (isPublic) {
      this.spendListRef = this.db.list<Spend>('public_spend');
      return;
    }
    this.spendListRef = this.db.list<Spend>('private_spend');
  }

  // 支出データー取得
  getSpendList(isPublic) {
    return this.spendListRef = this.db.list<Spend>('public_spend');
  }

  // 支出登録
  addSpend(spend: Spend, isPublic) {
    this.setDatabaseList(isPublic);
    return this.spendListRef.push(spend);
  }
}
