import { Component, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { MatBottomSheet } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SpendService } from '../../../../service/spend.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Spend } from '../../../../model/spend';
// import { ShowSpendComponent } from '../../../spend/show/show-spend.component';

@Component({
  selector: 'app-spend-public-list',
  templateUrl: './spend-public-list.component.html',
  styleUrls: ['./spend-public-list.component.scss']
})
export class SpendPublicListComponent {
  displayedColumns: string[] = ['createDate', 'category', 'amount'];
  dataSource: MatTableDataSource<Spend>;
  spendList: Spend[];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private spendService: SpendService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
    const data = this.spendService.getPublicSpendList();

    data.snapshotChanges().subscribe(item => {
      this.spendList = [];
      this.resultsLength = item.length;

      item.forEach(element => {
        const json = element.payload.toJSON();
        json['$key'] = element.key;
        this.spendList.push(json as Spend);
        this.dataSource = new MatTableDataSource(this.spendList);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  // openSpendDialog(spend): void {
  //   const dialogRef = this.dialog.open(ShowSpendComponent, {
  //     data: {spend: spend, isPublic: true}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openBottomSheet(spend): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {spend: spend, isPublic: true}
    });
  }
}
