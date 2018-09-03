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

  // Add Public
  addPublicSpend(spend: Spend) {
    return this.spendPublicListRef.push(spend);
  }

  // Add Private
  addPrivateSpend(spend: Spend) {
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

}
