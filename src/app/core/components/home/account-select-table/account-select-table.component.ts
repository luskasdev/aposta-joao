
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Account } from '../../../data/models/Account';

@Component({
  selector: 'account-select-table',
  templateUrl: './account-select-table.component.html',
  standalone: false,
  styleUrl: './account-select-table.component.scss'
})
export class AccountSelectTableComponent implements AfterViewInit, OnChanges{
  @Input() accounts: Account[] = []
  @Input() selectedAccount: Account | null = null;
  @Input() isLoading:boolean = false
  @Output() accountSelected = new EventEmitter<string>();
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource = new MatTableDataSource<Account>();
  displayedColumns = [
    "accountName",
    "amount",
    "currencyCode"
  ]

  offset = new Date().getTimezoneOffset();
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.accounts
  }

  accountRowClick(account: Account){
    console.log(account)
    this.accountSelected.emit(account.accountId)
  }
}
