import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import store from '../../../../store/spendType';

@Component({
  selector: 'app-fixed-spend-table',
  templateUrl: './fixed-spend-table.component.html',
  styleUrls: ['./fixed-spend-table.component.scss'],
})
export class FixedSpendTableComponent implements OnChanges  {
  displayedColumns: string[] = ['category', 'memo', 'amount'];
  dataSource  = new MatTableDataSource();
  storeObj    = store;

  @Input() fixedSpendList;
  @ViewChild(MatSort) sort: MatSort;
  @Output() openBottomSheetEvent = new EventEmitter();

  constructor() { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.fixedSpendList);
    this.dataSource.sort = this.sort;
  }

  openBottomSheet(spend): void {
    this.openBottomSheetEvent.emit(spend);
  }
}
