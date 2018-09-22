import { Component } from '@angular/core';
import { SpendService } from '../../../../service/spend.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss']
})
export class ShowCategoryComponent {
  totalAmount: Number = 0;
  categorySum: any = [];

  constructor(private spendService: SpendService) {
    this.getPublicSpendList();
  }

  /**
   * getPublicSpendList
   * 支出リストを取得
   *
   * @param searchMonth
   */
  getPublicSpendList(searchMonth = null) {
    // 支出リストを取得
    const spendList = (searchMonth === null) ? this.spendService.getPublicSpendList() : this.spendService.getPublicSpendList(searchMonth);

    // カテゴリー別合計、総合計を計算
    this.computeSumByCategory(spendList);
  }

  /**
   * computeSumByCategory
   * カテゴリー別合計、総合計を計算
   *
   * @param spendList
   */
  computeSumByCategory(spendList) {
    spendList.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const json = element.payload.toJSON();
        json['$key'] = element.key;

        // カテゴリー別合計を計算
        if (typeof this.categorySum[json['category']] === 'undefined') { // 初期化
          this.categorySum[json['category']] = 0;
        }
        this.categorySum[json['category']] += json['amount'];

        // 支出総合計を計算
        this.totalAmount += json['amount'];
      });
    });
  }
}
