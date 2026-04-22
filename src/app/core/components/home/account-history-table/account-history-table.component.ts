
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountHistory } from '../../../data/models/AccountHistory';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'account-history-table',
  templateUrl: './account-history-table.component.html',
  standalone: false,
  styleUrl: './account-history-table.component.scss'
})
export class AccountHistoryTableComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() accountHistory: AccountHistory[] = []
  @Input() isLoading: boolean = false;
  offset = new Date().getTimezoneOffset();
  dataSource = new MatTableDataSource<AccountHistory>();
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = [
    "changeDate",
    "previousAmount",
    "newAmount",
    "transactionAmount",
    "transactionNotes"
  ]
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.accountHistory
  }
}
