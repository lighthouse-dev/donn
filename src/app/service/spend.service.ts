import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Spend } from '../model/spend';

// Service
import { AuthService } from '../core/auth.service';

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

  // Get Public
  getPublicSpendList() {
    return this.spendPublicListRef;
  }

  // Get Private
  getPrivateSpendList() {
    return this.spendPrivateListRef;
  }

  deleteSpend(deleteKey: any, isPublic: Boolean) {
    if (isPublic) {
      return this.db.list<Spend>('public_spend/' + deleteKey).remove();
    }
    return this.db.list<Spend>('private_spend/' + this.authService.uid + '/' + deleteKey).remove();
  }

}
